/**
 * @copyright shelly-tools contributors
 * @license   GNU Affero General Public License (https://www.gnu.org/licenses/agpl-3.0.de.html)
 * @authors   https://github.com/ThellyHRO/local-Website/graphs/contributors
 *
 * This script is intended to remote control a Shelly RGBW2 and emulates the locally connected button.
 * short_press = on/off toggle, double_press = on with 100% brightness, long_press cylce between dimming and brightening.
 */

// CONFIG START
let CONFIG = {
ip: '192.168.178.150', // IP address
input: 2, // ID from the push button: 0 for Shelly Plus 1 / Plus 1 PM or 0,1,2 or 3 for the Shelly I4.
channel: 0, // Channel for ColorMode: 0 or 0,1,2 or 3 for White-Channel
modus: 'white', // for WhiteMode: 'white' or ColorMode: 'color'
type: 'brightness', // for WhiteMode: brightness' or ColorMode: 'gain'
};
let dimsequence = [
   '=100&white=255', // 100% &white= optional
   '=75', // 75%
   '=50&white=128', // 50%
   '=25', // 25%
   '=1&white=0', // 1% & WhiteChannel in ColorMode = optional 0-255
   '=25', // 25%
   '=50', // 50%
   '=75', // 75%
];
// CONFIG END 

let dimpos = 0;
function dimRGBW(ip, dimpos) {
	Shelly.call("http.get", {
	url: 'http://' + CONFIG.ip + '/' + CONFIG.modus + '/' + CONFIG.channel + '?' + CONFIG.type + dimsequence[dimpos]
	},
	function (response, error_code, error_message, ud) {
	},
	null
	);
};
// add an evenHandler for button type input and various push events
Shelly.addEventHandler(
  function (event, user_data) {
    if (typeof event.info.event !== 'undefined') {
	if (event.info.event === 'single_push' && event.info.id === CONFIG.input) {
		Shelly.call("http.get", {
		url: 'http://' + CONFIG.ip + '/' + CONFIG.modus + '/' + CONFIG.channel + '?turn=toggle'
		},
		function (response, error_code, error_message, ud) { },
		null
		);
	} else if (event.info.event === 'double_push' && event.info.id === CONFIG.input) {
		Shelly.call("http.get", {
		url: 'http://' + CONFIG.ip + '/' + CONFIG.modus + '/' + CONFIG.channel + '?turn=on&' + CONFIG.type + '=100'
		},
		function (response, error_code, error_message, ud) { },
		null
		);
	} else if (event.info.event === 'triple_push' && event.info.id === CONFIG.input) {
		Shelly.call("http.get", {
		url: 'http://' + CONFIG.ip + '/' + CONFIG.modus + '/' + CONFIG.channel + '?turn=on&' + CONFIG.type + '=10'
		},
		function (response, error_code, error_message, ud) { },
		null
		);
	} else if (event.info.event === 'long_push' && event.info.id === CONFIG.input) {
		dimRGBW(CONFIG.ip, dimpos);
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
  },
);