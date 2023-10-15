 /**
 * Gleichsetzung der Kanäle im RGBW2 WeissModus, Script in einem Gen.2-Gerät unterbringen
 */
// IP des Shelly RGBW2
let ip = "192.168.178.150";
function getCurrentState(ip) {
  Shelly.call("HTTP.GET", {url: 'http://' + ip + '/white/0'}, function(result) {
    let data = JSON.parse(result.body);
    let command = "brightness=" + data.brightness + "&transition=" + data.transition;
    KanalAnpassung1(ip, command);
    KanalAnpassung2(ip, command);
    KanalAnpassung3(ip, command);
    });
};
function KanalAnpassung1(ip, command){Shelly.call("http.get", {url: 'http://' + ip + '/white/1?' + command});};
function KanalAnpassung2(ip, command){Shelly.call("http.get", {url: 'http://' + ip + '/white/2?' + command});};
function KanalAnpassung3(ip, command){Shelly.call("http.get", {url: 'http://' + ip + '/white/3?' + command});};
Timer.set(1000, true, function(){getCurrentState(ip);});