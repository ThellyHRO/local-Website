// Script für Pro Dimmer 1PM oder nur einem DimmKanal des Pro Dimmer 2PM (hier ID=0)
// um den Kanal auszuschalten, wenn unterhalb der minimalen Dimmhelligkeit gedimmt wird
// und das Leuchtmittel den Aus-Zustand nur vorgaukelt.
// Autor: Thomas Herfort

Shelly.call("Shelly.GetConfig", {}, function(result){
let Gain = result['light:0'].min_brightness_on_toggle;
console.log("Minimum: ", Gain,"%");
	Timer.set(15000, true, function() {
		Shelly.call("Light.GetStatus", {'id': 0}, function(response){
		let Helligkeit = response.brightness;
		let Ausgang = response.output;
		let Leistung = response.apower;
		console.log("Licht Dimmung: ", Helligkeit,"% Verbrauch: ", Leistung, " Watt");
			if(Helligkeit < Gain && Ausgang === true) {
			console.log("Ausgang ausgeschalten");
 			Shelly.call("Light.Set", {'id': 0, 'on': false});
			}
		});
	});
});