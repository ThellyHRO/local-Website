// Script für Pro Dimmer 2PM um den Kanal auszuschalten, wenn unterhalb der minimalen
// Dimmhelligkeit gedimmt wird und das Leuchtmittel den Aus-Zustand nur vorgaukelt.
// Autor: Thomas Herfort

Shelly.call("Shelly.GetConfig", {}, function(result){
let Gain1 = result['light:0'].min_brightness_on_toggle;
let Gain2 = result['light:1'].min_brightness_on_toggle;
console.log("Minimum Ch0:", Gain1,"%", "Minimum Ch1:", Gain2,"%");
	Timer.set(15000, true, function() {
		Shelly.call("Shelly.GetStatus", {}, function(response){
		let Helligkeit1 = response['light:0'].brightness;
		let Ausgang1 = response['light:0'].output;
		let Leistung1 = response['light:0'].apower;
		let Helligkeit2 = response['light:1'].brightness;
		let Ausgang2 = response['light:1'].output;
		let Leistung2 = response['light:1'].apower;
		console.log("Licht 1 Dimmung: ", Helligkeit1,"% Verbrauch: ", Leistung1, " Watt");
		console.log("Licht 2 Dimmung: ", Helligkeit2,"% Verbrauch: ", Leistung2, " Watt");
			if(Helligkeit1 < Gain1 && Ausgang1 === true) {
 			Shelly.call("Light.Set", {'id': 0, 'on': false});
			console.log("Ausgang 1 ausgeschalten");
			}
			if(Helligkeit2 < Gain2 && Ausgang2 === true) {
 			Shelly.call("Light.Set", {'id': 1, 'on': false});
			console.log("Ausgang 2 ausgeschalten");
			}
		});
	});
});