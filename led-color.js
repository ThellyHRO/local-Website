 /**
 * Erweitert von Thelly © Thomas Herfort für Mehrfachtaster,
 * Funktioniert jetzt auch, wenn die Leuchte vorher irgendwie in den WeissModus geschalten wurde, es gibt ja ein dimmbares Weiss in allen Farben auch im ColorModus.
 * Dreifachklick hinzugefügt, schaltet in Weissmodus ab Firmware 0.13
 */
let REMOTE = {
    ip: '192.168.178.105',
};
let colorsequence = [
   '?turn=on&red=208&green=208&blue=208', // silber
   '?turn=on&red=0&green=0&blue=128', // darkblue
   '?turn=on&red=0&green=0&blue=255', // blue
   '?turn=on&red=128&green=0&blue=0', // darkred
   '?turn=on&red=255&green=0&blue=0', // red
   '?turn=on&red=0&green=128&blue=0', // darkgreen
   '?turn=on&red=0&green=255&blue=0', // green
   '?turn=on&red=0&green=128&blue=128', // cyan
   '?turn=on&red=128&green=100&blue=0', // gold
   '?turn=on&red=128&green=0&blue=128', // purple
   '?turn=on&red=255&green=255&blue=255', // weiss
];
let dimsequence = [
   '?gain=75', // 75%
   '?gain=50', // 50%
   '?gain=25', // 25%
   '?gain=7', // 4% Minimum bei oben aufgelisteten DunkelFarben
   '?gain=100', // 100%
];
let colorposition = 0;
let dimpos = 0;
Shelly.addEventHandler(
	function (event, user_data) {
//	input:0 ist Kanal 0 = Taste 1, Taste 4 also Kanal 3...(also in nächster Zeile den Button benennen)
	if (event.component === "input:3") {
	if (typeof event.info.event !== 'undefined') {
	if (event.info.event === 'double_push') {
		setRGBW(REMOTE.ip, colorposition);
		colorposition++;
		dimpos = 0;
		if (colorsequence.length === colorposition) {
		colorposition = 0;
		}
	} else if (event.info.event === 'single_push'){
		toggleRGBW(REMOTE.ip);
	} else if (event.info.event === 'triple_push'){
		whitemodeRGBW(REMOTE.ip);
	} else if (event.info.event === 'long_push') {
		dimRGBW(REMOTE.ip, dimpos);
		dimpos++;
		if (dimsequence.length === dimpos) {
			dimpos = 0;
		};
	} else {
		return true;
	}
        } else {
		return true;
	}
    }
    },
);
function setRGBW(ip, colorposition) {
	Shelly.call(
	"http.get", {
	url: 'http://' + ip + '/light/0' + colorsequence[colorposition]
	},
	function (response, error_code, error_message, ud) {
		print(colorsequence[colorposition]);
	},
	null
	);
	Shelly.call(
	"http.get", {
	url: 'http://' + ip + '/settings?mode=color'
	}
);
};
function dimRGBW(ip, dimpos) {
	Shelly.call(
	"http.get", {
	url: 'http://' + ip + '/light/0' + dimsequence[dimpos]
	},
	function (response, error_code, error_message, ud) {
		print(dimsequence[dimpos]);
	},
	null
	);
);
};
function whitemodeRGBW(ip) {
	Shelly.call(
	"http.get", {url: 'http://' + ip + '/settings?mode=white'}
	);
};
function toggleRGBW(ip) {
	Shelly.call(
	"http.get", {
	url: 'http://' + ip + '/light/0?turn=toggle'
	},
	function (response, error_code, error_message, ud) {
	},
	null
	);
	Shelly.call(
	"http.get", {
	url: 'http://' + ip + '/settings?mode=color'
	}
);
}