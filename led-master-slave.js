 /**
 * Adaptation for spot light colors in the bathroom i4 button button 3 with triple click.
 * If you press the button with a triple click, the following happens:
 * The other spot(s) adopt the colors and brightness of the main light
 */

// CONFIG
let ip = "192.168.178.100"; // Master-LED Shelly BulbRGBW
let ip1 = "192.168.178.101"; // Anzupassende LEDs
let ip2 = "192.168.178.102";
let ip3 = "192.168.178.103";
let ip4 = "192.168.178.104";
let input = 2;
let btnevent = "triple_push";
// ENDCONFIG

Shelly.addEventHandler(
    function (event, user_data) {
     if (typeof event.info.event !== "undefined") {
        if (event.info.id === input && event.info.event === btnevent) {
        getCurrentState(ip);
        } else {
        return true;
        }
    } else {
    return true;
    }
},
);

function getCurrentState(ip) {
    Shelly.call("HTTP.GET", {url: 'http://' + ip + '/light/0'}, function(result) {
    let data = JSON.parse(result.body);
    let MLED = [ data.ison, data.timer_duration, data.mode, data.red, data.green, data.blue, data.white, data.gain, data.temp, data.brightness, data.effect, data.transition ];
    let MIson = MLED[0];    //alle Shelly-Leuchtmittel
    let MTimer = MLED[1];    //alle Shelly-Leuchtmittel
    let MBrightness = MLED[9];    //alle Shelly-Leuchtmittel
    let MTransition = MLED[11];    //alle Shelly-Leuchtmittel
    let MMode = MLED[2];    //nur in Color-Leuchtmittel
    let MRed = MLED[3];    //nur in Color-Leuchtmittel
    let MGreen = MLED[4];    //nur in Color-Leuchtmittel
    let MBlue = MLED[5];    //nur in Color-Leuchtmittel
    let MGain = MLED[7];    //nur in Color-Leuchtmittel
    let MEffect = MLED[10];    //nur in Color-Leuchtmittel
    let MWhite = MLED[6];    //nicht in Vintage
    let MTemp = MLED[8];    //nicht in Vintage    
    let command = "red=" + MRed + "&green=" + MGreen + "&blue=" + MBlue + "&white=" + MWhite + "&gain=" + MGain + "&temp=" + MTemp + "&brightness=" +  MBrightness + "&transition=" + MTransition;
//    let command = "red=" + MLED[3] + "&green=" + MLED[4] + "&blue=" + MLED[5] + "&white=" + MLED[6] + "&gain=" + MLED[7] + "&temp=" + MLED[8] + "&brightness=" +  MLED[9] + "&transition=" + MLED[11];
    });
    FarbAnpassung(ip1, command);
    FarbAnpassung(ip2, command);
    FarbAnpassung(ip3, command);
    FarbAnpassung(ip4, command);
    });
};

function FarbAnpassung(ip1, command){
Shelly.call("http.get", {url: 'http://' + ip1 + '/light/0?' + command});
};
function FarbAnpassung(ip2, command){
Shelly.call("http.get", {url: 'http://' + ip2 + '/light/0?' + command});
};
function FarbAnpassung(ip3, command){
Shelly.call("http.get", {url: 'http://' + ip3 + '/light/0?' + command});
};
function FarbAnpassung(ip4, command){
Shelly.call("http.get", {url: 'http://' + ip4 + '/light/0?' + command});
};