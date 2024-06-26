/**
 * This script lets you use your Gen2 device as a gateway between Shelly BLU button1 and other Shelly devices (no matter Gen1 or Gen2)
 * by sending local requests by their local IP APIs.
 * 
 * What you should change before using it:
 * > bluButtonAddress -> You should put the mac address of your blu button here.
 *                          This script will help you find the mac address: https://github.com/ALLTERCO/shelly-script-examples/blob/main/ble-shelly-scanner.js
 * 
 * > actions -> You should put the urls here to be executed at the specified event. Urls that shoudl be called on single/short push 
 *              of the button, must be placed in the singlePush object. This applies to the double and triple push as well. Example below.
 * 
 * Limitations:
 * > At the moment there is a limit of 5 RPC calls at the same time and because of this, the script will execute every 3 urls with a 1 second delay.
 *      Limitations can be check here: https://shelly-api-docs.shelly.cloud/gen2/Scripts/ShellyScriptLanguageFeatures#resource-limits
 * 
 * > The order of the execution of the urls can't be guaranteed
 * 
 * Instead of a URL command, a roller blind control has been added to SinglePush. The IP must be adjusted to your own at each point.
 * 
 */

/** =============================== CHANGE HERE =============================== */
let ip = '192.168.178.78'; // 'localhost' during installation Shelly Plus 2PM Cover-Mode
let CONFIG = {
    bluButtonAddress: "5c:c7:c1:f7:18:9c", // KLEINBUCHSTABEN!
    actions: {
        singlePush: [
            "http://192.168.178.78/roller/0"
        ],
        doublePush: [
            "http://192.168.178.102/light/0?turn=toggle"
        ],
        triplePush: [
            "http://192.168.178.103/light/0?turn=toggle"
        ],
        longPush: [
            "http://192.168.178.104/light/0?turn=toggle"
        ]
    }
};
/** =============================== STOP CHANGING HERE =============================== */

let urlsPerCall = 4;
let urlsQueue = [];
let callsCounter = 0;

let ALLTERCO_MFD_ID_STR = "0ba9";
let BTHOME_SVC_ID_STR = "fcd2";

let uint8 = 0;
let int8 = 1;
let uint16 = 2;
let int16 = 3;
let uint24 = 4;
let int24 = 5;

let BTH = {};
BTH[0x00] = { n: "pid", t: uint8 };
BTH[0x01] = { n: "Battery", t: uint8, u: "%" };
BTH[0x05] = { n: "Illuminance", t: uint24, f: 0.01 };
BTH[0x1a] = { n: "Door", t: uint8 };
BTH[0x20] = { n: "Moisture", t: uint8 };
BTH[0x2d] = { n: "Window", t: uint8 };
BTH[0x3a] = { n: "Button", t: uint8 };

function getByteSize(type) {
    if (type === uint8 || type === int8) return 1;
    if (type === uint16 || type === int16) return 2;
    if (type === uint24 || type === int24) return 3;
    //impossible as advertisements are much smaller;
    return 255;
}

let BTHomeDecoder = {
    utoi: function (num, bitsz) {
        let mask = 1 << (bitsz - 1);
        return num & mask ? num - (1 << bitsz) : num;
    },
    getUInt8: function (buffer) {
        return buffer.at(0);
    },
    getInt8: function (buffer) {
        return this.utoi(this.getUInt8(buffer), 8);
    },
    getUInt16LE: function (buffer) {
        return 0xffff & ((buffer.at(1) << 8) | buffer.at(0));
    },
    getInt16LE: function (buffer) {
        return this.utoi(this.getUInt16LE(buffer), 16);
    },
    getUInt24LE: function (buffer) {
        return (
            0x00ffffff & ((buffer.at(2) << 16) | (buffer.at(1) << 8) | buffer.at(0))
        );
    },
    getInt24LE: function (buffer) {
        return this.utoi(this.getUInt24LE(buffer), 24);
    },
    getBufValue: function (type, buffer) {
        if (buffer.length < getByteSize(type)) return null;
        let res = null;
        if (type === uint8) res = this.getUInt8(buffer);
        if (type === int8) res = this.getInt8(buffer);
        if (type === uint16) res = this.getUInt16LE(buffer);
        if (type === int16) res = this.getInt16LE(buffer);
        if (type === uint24) res = this.getUInt24LE(buffer);
        if (type === int24) res = this.getInt24LE(buffer);
        return res;
    },
    unpack: function (buffer) {
        //beacons might not provide BTH service data
        if (typeof buffer !== "string" || buffer.length === 0) return null;
        let result = {};
        let _dib = buffer.at(0);
        result["encryption"] = _dib & 0x1 ? true : false;
        result["BTHome_version"] = _dib >> 5;
        if (result["BTHome_version"] !== 2) return null;
        //can not handle encrypted data
        if (result["encryption"]) return result;
        buffer = buffer.slice(1);

        let _bth;
        let _value;
        while (buffer.length > 0) {
            _bth = BTH[buffer.at(0)];
            if (typeof _bth === "undefined") {
                console.log("BTH: unknown type");
                break;
            }
            buffer = buffer.slice(1);
            _value = this.getBufValue(_bth.t, buffer);
            if (_value === null) break;
            if (typeof _bth.f !== "undefined") _value = _value * _bth.f;
            result[_bth.n] = _value;
            buffer = buffer.slice(getByteSize(_bth.t));
        }
        return result;
    },
};

 /**
 * Anpassung f�r Rollos im B�ro BLU-Button Red mit Einfachklick. by Thelly
 *  Dr�ckt man den Taster mit Einfachklick passiert folgendes:
 * - Sind die Jalousien geschlossen (last_direction closed) werden sie ge�ffnet
 * - Sind die Jalousien ge�ffnet (last_direction open) werden sie geschlossen
 * - Sind die Jalousien in Bewegung werden sie angehalten
 */

function getCurrentState(ip) {
    Shelly.call(
        "http.get", {
            url: 'http://' + ip + '/roller/0'
        },
        function (res, error_code, error_message, ud) {
            if (res.code === 200) {
                let st = JSON.parse(res.body);
                if (st.state === 'stop' && st.last_direction === 'close') {
                    controlShutter(ip, 'open');
                    print("open shutter");
                } else if (st.state === 'stop' && st.last_direction === 'open') {
                    controlShutter(ip, 'close');
                    print("close shutter");
                } else {
                    controlShutter(ip, 'stop');
                    print("stop shutter");
                }
            }
        },
        null
    );
};
function controlShutter(ip, command) {
    Shelly.call(
        "http.get", {
            url: 'http://' + ip + '/roller/0?go=' + command
        },
        function (response, error_code, error_message, ud) {
        },
        null
    );
};

function callQueue() {
  if(callsCounter < 6 - urlsPerCall) {
        for(let i = 0; i < urlsPerCall && i < urlsQueue.length; i++) {
            let url = urlsQueue.splice(0, 1)[0];
	if(url === "http://" + ip + "/roller/0") {
	getCurrentState(ip);
	}
              callsCounter++;
            Shelly.call("HTTP.GET", { 
                url: url, 
                timeout: 5
                }, 
                function(_, error_code, _, data) {
                    if(error_code !== 0) {
                        console.log("Calling", data.url, "failed", error_code);
                    }
                    else {
                        console.log("Calling", data.url, "successed");
                    }
                    callsCounter--;
                }, 
                { url: url }
            );
        }
    }

    //if there are more urls in the queue
    if(urlsQueue.length > 0) {
        Timer.set(
            1000, //the delay
            false, 
            function() {
                callQueue();
            }
        );
    }
}

let lastPacketId = 0x100;
function bleScanCallback(event, result) {
    //exit if the call is not for a received result
    if (event !== BLE.Scanner.SCAN_RESULT) {
        return;
    }

    //exit if the data is not coming from a Shelly Blu button1 and if the mac address doesn't match
    if (    typeof result.local_name === "undefined" || 
            typeof result.addr === "undefined" || 
            result.local_name.indexOf("SBBT") !== 0 || 
            result.addr !== CONFIG.bluButtonAddress
    ) {
        return;
    }

    let servData = result.service_data;

    //exit if service data is null/device is encrypted
    if(servData === null || typeof servData === "undefined" || typeof servData[BTHOME_SVC_ID_STR] === "undefined") {
        console.log("Can't handle encrypted devices");
        return;
    }

    let receivedData = BTHomeDecoder.unpack(servData[BTHOME_SVC_ID_STR]);

    //exit if unpacked data is null or the device is encrypted
    if(receivedData === null || typeof receivedData === "undefined" || receivedData["encryption"]) {
        console.log("Can't handle encrypted devices");
        return;
    }

    //exit if the event is duplicated
    if (lastPacketId === receivedData.pid) {
        return;
    }

    lastPacketId = receivedData["pid"];

    //getting and execuing the action
    let actionType = ["", "singlePush", "doublePush", "triplePush", "longPush"][receivedData["Button"]];

    let actionUrls = CONFIG.actions[actionType];

    //exit if the event doesn't exist in the config    
    if(typeof actionType === "undefined") {
        console.log("Unknown event type in the config");
        return;
    }

    //save all urls into the queue for the current event

    for(let i in actionUrls) {
        urlsQueue.push(actionUrls[i]);
    }

    callQueue();
}

function bleScan() {
    //check whether the bluethooth is enabled
    let bleConfig = Shelly.getComponentConfig("ble");

    //exit if the bluetooth is not enabled
    if(bleConfig.enable === false) {
        console.log("BLE is not enabled");
        return;
    }

    //start the scanner
    let bleScanner = BLE.Scanner.Start({
        duration_ms: BLE.Scanner.INFINITE_SCAN,
        active: true
    });

    //exist if the scanner can not be started
    if(bleScanner === false) {
        console.log("Error when starting the BLE scanner");
        return;
    }

    BLE.Scanner.Subscribe(bleScanCallback);
    console.log("BLE is successfully started");
}

function init() {
    //exit if there isn't a config
    if(typeof CONFIG === "undefined") {
        console.log("Can't read the config");
        return;
    }

    //exit if there isn't a blu button address
    if(typeof CONFIG.bluButtonAddress !== "string") {
        console.log("Error with the Shelly BLU button1's address");
        return;
    }
    
    //exit if there isn't action object
    if(typeof CONFIG.actions === "undefined") {
        console.log("Can't find the actions object in the config");
        return;
    }

    //start the ble scan
    bleScan();
}

//init the script
init();