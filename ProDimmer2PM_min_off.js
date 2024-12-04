// Script für Pro Dimmer 2PM um den Kanal auszuschalten, wenn unterhalb der minimalen
// Dimmhelligkeit gedimmt wird und das Leuchtmittel den Aus-Zustand nur vorgaukelt.
// Autor: Thomas Herfort

Shelly.call("Shelly.GetConfig", {}, function(result){
let Gain1 = result['light:0'].min_brightness_on_toggle;
let Gain2 = result['light:1'].min_brightness_on_toggle;
console.log("Minimum Ch0:", Gain1,"%", "Minimum Ch1:", Gain2,"%");
	Timer.set(15000, true, function() {
		Shelly.call("Light.GetStatus", {'id': 0}, function(respons1){
		let Helligkeit1 = respons1.brightness;
		let Ausgang1 = respons1.output;
		let Leistung1 = respons1.apower;
		console.log("Licht 1 Dimmung: ", Helligkeit1,"% Verbrauch: ", Leistung1, " Watt");
			if(Helligkeit1 < Gain1 && Ausgang1 === true) {
			console.log("Ausgang 1 ausgeschalten");
 			Shelly.call("Light.Set", {'id': 0, 'on': false});
			}
		});
		Shelly.call("Light.GetStatus", {'id': 1}, function(respons2){
		let Helligkeit2 = respons2.brightness;
		let Ausgang2 = respons2.output;
		let Leistung2 = respons2.apower;
		console.log("Licht 2 Dimmung: ", Helligkeit2,"% Verbrauch: ", Leistung2, " Watt");
			if(Helligkeit2 < Gain2 && Ausgang2 === true) {
			console.log("Ausgang 2 ausgeschalten");
 			Shelly.call("Light.Set", {'id': 1, 'on': false});
			}
		});
	});
});