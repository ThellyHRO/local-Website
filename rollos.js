 /**
 * Anpassung für Rollos im Büro i4-Button Taste 3 mit Einfachklick,
 * (und mit Doppelklick hinzugefügt gleiche Taste anderes Rollo).
 *  Drückt man den Taster mit Einfachklick passiert folgendes:
 * - Sind die Jalousien geschlossen (last_direction closed) werden sie geöffnet
 * - Sind die Jalousien geöffnet (last_direction open) werden sie geschlossen
 * - Sind die Jalousien in Bewegung werden sie angehalten
 */

let CONFIG = {
    ip: '192.168.178.78',
    input: 2,
    btnevent: 'single_push'
};
let KOENIG = {
    ip: '192.168.178.73',
    input: 2,
    btnevent: 'double_push'
};
Shelly.addEventHandler(
    function (event, user_data) {
        //print(JSON.stringify(event));
       if (typeof event.info.event !== 'undefined') {
            if (event.info.id === CONFIG.input && event.info.event === 'single_push') {
                getCurrentState(CONFIG.ip);
            } else if (event.info.id === KOENIG.input && event.info.event === 'double_push') {
                getCurrentStaat(KOENIG.ip);
            } else {
                return true;
            }
        } else {
            return true;
        }
    },
);
function getCurrentState(ip) {
    Shelly.call(
        "http.get", {
            url: 'http://' + ip + '/roller/0'
        },
        function (res, error_code, error_message, ud) {
            if (res.code === 200) {
                let st = JSON.parse(res.body);
                if (st.state === 'stop' && st.last_direction === 'close') {
                    controlShutter(CONFIG.ip, 'open');
                    print("open shutter");
                } else if (st.state === 'stop' && st.last_direction === 'open') {
                    controlShutter(CONFIG.ip, 'close');
                    print("close shutter");
                } else {
                    controlShutter(CONFIG.ip, 'stop');
                    print("stop shutter");
                }
            }
        },
        null
    );
};
function getCurrentStaat(ip) {
    Shelly.call(
        "http.get", {
            url: 'http://' + ip + '/roller/0'
        },
        function (res, error_code, error_message, ud) {
            if (res.code === 200) {
                let st = JSON.parse(res.body);
                if (st.state === 'stop' && st.last_direction === 'close') {
                    controlShutter(KOENIG.ip, 'open');
                    print("open shutter");
                } else if (st.state === 'stop' && st.last_direction === 'open') {
                    controlShutter(KOENIG.ip, 'close');
                    print("close shutter");
                } else {
                    controlShutter(KOENIG.ip, 'stop');
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