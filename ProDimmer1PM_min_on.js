// Script für Pro Dimmer 1PM oder nur einem DimmKanal des Pro Dimmer 2PM (hier ID=0)
// um den Kanal nur bis zur minimalen Dimmhelligkeit herunterzudimmen ohne Auszuschalten.
// Sollte auch im Dimmer Gen.3 nützlich sein.
// Autor: Thomas Herfort

Shelly.call("Shelly.GetConfig", {}, function(result){
let Gain = result['light:0'].min_brightness_on_toggle;
console.log("Minimum: ", Gain,"%");
	Timer.set(1000, true, function() {
		Shelly.call("Light.GetStatus", {'id': 0}, function(response){
		let Helligkeit = response.brightness;
		let Ausgang = response.output;
		let Leistung = response.apower;
		console.log("Licht Dimmung: ", Helligkeit,"% Verbrauch: ", Leistung, " Watt");
			if(Helligkeit < Gain && Ausgang === true) {
			Shelly.call("Light.DimStop", {'id': 0});
 			Shelly.call("Light.Set", {'id': 0, 'on': true, 'brightness': Gain}); // Dim channel only to the minimum dimming brightness without switching off
			console.log("Minimale Dimmstufe erreicht");
			}
		});
	});
});