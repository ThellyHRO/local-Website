Mein Shelly-Projekt bei meiner Mutter

Ich bin Elektroinstallateur und hatte vor 2 Jahren begonnen,
mit Shelly-Relais einiges bei mir zu Hause zu installieren.
Dann kam auch meine Mutter mit Wünschen in ihrer Wohnung hinzu.
Damit Mutter eine ordentliche Dokumentation als Gedächtnisstütze hat,
musste ich viel schreiben und alles ist für sie am PC oder Smartphone
nachlesbar und wurde auch mal auf Papier ausgedruckt.

Nun hat Shelly viele Geräte, die unterschiedliche JSON-Ergebnisse
erzeugen, um diese lokal auszuwerten, anzuzeigen und Links für
weitere Aktionen zu erzeugen. Deshalb gibt es derzeit für Relaise,
Lichter, Rollos und Inputs 4 verschiedene Seiten, die einzeln aufrufbar
oder in einer Frame-Seite alles anzeigen.
In Planung, wenn Zeit ist, schreibe ich dies auch für die Generation2-
Geräte, aber Mutter hat derzeit erst zwei Plus1 und zwei i4.
In den i4 habe ich in erster Linie Scripte für Lichtsteuerung eingebaut,
die ich später beschreibe.

Also in erster Linie geht es mir bei der Anzeige auf der lokalen Webseite
um die wichtigsten Dinge des jeweiligen Gerätes, bei denen in der Shelly-
App erst umständlich gesucht werden muss, was meiner Mutter schwer fällt.
Ebenfalls lernt sie dabei auch die Bedienung der Taster mit den unzähligen Schaltbefehlen.

Alle Webseiten sind für eigene Projekte, Anzahl der Geräte und Aktionen anpassbar.
Wichtig ist insbesondere im body-Bereich die Angabe der eigenen IP für das
jeweilige Gerät, ein eigenen Namen für das Gerät und auch eine eigen
Raumbezeichnung einzutragen.
Auch bei Geräten mit mehr als einem Kanal, die id des Kanals von 0 bis ...
anzupassen.
Alle Geräte, die angezeigt werden sollen, müssen
"Allow Cross-Origin Resource Sharing" (WebUI > "Internet & Security") aktiviert haben.

relays:
Bei den PlugS-Geräten ist also nur der Schaltzustand An oder Aus durch
farbige Symbole sichtbar, mit Klick auf das Symbol wird der Schaltzustand
geändert. Zusätzlich wird die Leistung in Watt und die Chip-Temperatur
angezeigt sowie wenn ein Timer aktiv ist, die ablaufende Zeit.
An einem Shelly 1PM ist ein Addon mit zwei Temperatursensoren
angeschlossen, die Chip-Temperatur habe ich aus Platzgründen nur in
die Maus-Titel-Info gepackt.
Als Sonnenuhr dient ein Shelly 1, der keine Leistungsmessung oder
Temperatur anzeigen kann, aber die Uhrzeit. Dieser Shelly ist nur zur
Bereitstellung der Sonnenaufgang und Spnnenuntergangszeit gedacht,
um in Szenen der Shelly-App damit arbeiten zu können, natürlich auch für Scripte nutzbar, ohne fremde Server besuchen zu müssen.
Beim Klick auf den Gerätenamen wird überall die lokale Geräte-Webseite
geöffnet (nutzt meine Mutter nicht).

lights:
Die meisten Leuchtmittel sind nun auf Shelly Duo, RGBW, Vintage
umgestellt. Bisher nur zum Test hatte ich auch einen Dimmer2 mit
einfachem Leuchtmittel im Netzwerk, er unterstützt ja auch alle Werte
der LED-Leuchtmittel und ist deshalb auch mit dieser Webseite integrierbar.
Auch hier kann mit Mausklick oder auf dem Smartphone mit dem Finger
auf dem Symbol der Schaltzustand geändert werden. Wenn angeschalten,
wird die Leistung in Watt und die Dimmstufe in % angezeigt.
Mit Lampen ist jedoch noch vieles auch schaltbar.
- Die Color-LED können in der Extra-Schaltleiste zwischen Colormode
  und Weissmode umschalten.
- Die aktive Farbe wird auf dem Leuchtmittel und der Hintergrundfarbe
  der Leistungs- und Dimmstufen-Anzeige dargestellt. Ob in jedem
  Browser die Farbe richtig dargestellt wird, ist nicht garantiert
  (Chrome im Dunkelmodus macht nur, was er will).
- Die Farbe kann mit Klick auf die Leistungs- und Dimmstufen-Anzeige
  in eine zufällige Farbe geändert werde, aber auch im Script auf
  festgelegte Farben angepasst werden. Im Weissmodus wird die
  Weiss-Temperatur in K gewechselt.
- Im Colormodus erscheint auch eine Schaltfläche für die definierten
  Effekte zum umschalten.
- Bei allen Leuchtmitteln sind vordefinierte Dimmstufen von der
  Webseite schaltbar und wird auch graphisch dargestellt.
- Alle Elemente besitzen eine Maus-Info (title-Attribut).

rollers:
Jalousien konnte ich jetzt erst im Urlaub bei meiner Mutter schreiben,
da sie kalibrierte Rollos mit Shelly 2.5 hat, ich zu Hause nicht.
Somit waren auch die Tests jetzt im Urlaub erst möglich.
Bei Klick auf das Symbol wird immer die gegenläufige Richtung
der vorherigen Fahrt gestartet oder während der Fahrt gestoppt.
Den Öffnungszustand in % wird in das Symbol geschrieben.
Die Pfeile starten immer in der Richtung, wohin sie zeigen.
Sie werden bei Fahrt in das Pausensymbol geändert und sind inaktiv,
wenn das Richtungsende erreicht ist
 (in der Shelly-App & Shelly-Control-App bleibt der Pfeil aktiv).
Zwischen den Pfeilen kann eine Liste vordefinierter Favoriten
angefahren werden. Das Symbol zeigt auch die Position an.
Die Chip-Temperatur des Shelly 2.5 wird auch angezeigt,
bei Fahrt wird an dieser Stelle die Leistung in Watt angezeigt.

Die Summe der aktuellen Leistung in Watt wird bei relays,
lights und roller auf jeder Seite angezeigt, das Maximum an
Spannung in Volt aller eingetragenen Geräte nur bei relays und roller.
Ebenfalls in der Legende unten wird die Zeit angezeigt,
wann wieder Daten von den Geräten abgerufen werden.

Zusätzlich wird auch geprüft, ob eine neue Firmware vorhanden ist
und wenn diese in der Maus-Info angezeigt wird, kann per Klick
ein Update angestossen werden.

inputs:
Leider hat nur der i3 den Wert "last_sequence", aus dem doch
längere Zeit der letzte gedrückte Zustand auslesbar ist.
"event" haben auch die relays, aber der Wert bleibt nur 5 Sekunden erhalten.
Somit ist diese Webseite nur für den i3 interessant und aus dem
anzeigbaren Wert habe ich das soweit erweitert, dass auch der
Hauptbefehl anklickbar mit angezeigt wird.

Weil auf dem Smartphone diese Seiten keine anderen lokalen
Seiten aufrufen kann, sind die Scripte und das CSS-Stylesheet
in der HTML-Seite integriert.
Alles ist bis hierher für die Geräte der 1.Generation geschrieben,
die 2.Generation werde ich demnächst in Angriff nehmen,
um auch diesen Geräten eine einfache Seite zu geben.

Scripte im Plus i4: (sind im Ursprung teils auf https://github.com/shelly-tools/shelly-script-examples zu finden)

"led-color.js"
Jede Taste, die ein Leuchtmittel schaltet, ändert mit "SinglePush" den Schaltzustand und setzt auf "ColorModus".
Mit "DoublePush" wird die Farbe geändert, "Longpush" setzt eine Dimmstufe weiter.
Seit die Plus-Geräte den "TriplePush" unterstützen, schaltet dieser den WeissModus an.

"rollos.js"
Einen Script verwende ich an einer Taste am i4, um mit SinglePush"
ein Rollo zu steuern und mit "DoublePush" das zweite Rollo.
Das zweite Rollo ist so im Shelly 2.5 eingestellt, dass alle Befehle
gleichzeitig an das dritte Rollo weitergibt und dieses somit syncron mitläuft.
Somit ist die Rollosteuerung nicht nur am Fenstertaster möglich,
sondern auch am Lichttaster an der Tür.

"led-master-slave.js"
An einem i4 habe ich den "TriplePush" dazu verwendet, um alle
Farben und Helligkeit der Master-Spot-Leuchte auf die anderen LEDs zu übertragen.

"Roller-BLU-Button.js"
Mir war gerade so, meiner Mutter einen BLU-Button zu bestücken und
habe außer drei LEDs noch eine Rollosteuerung für den SinglePush
in einen Plus 1 eingebaut.

Weiteres folgt ... (dauert etwas, mein Urlaub endet morgen)


Hinzugefügt in relays.htm, roller.htm und lights.htm 2023.08.18

Tastaturkürzel (accesskey) auf der Symbolschaltfläche, somit muss die
Maus nicht bis zum Symbol wandern, nur wenn der accesskey in der
Mausinfo gelesen werden will.
Das funktioniert natürlich nur bei einstelliger id, welche pro Gerät
vergeben wird. Bei Buchstaben als id sollte beachtet werden, dass der
Browser ebenfalls Buchstaben im Menü verwendet, diese haben Vorrang.
Beachten Sie, die Tastaturkürzel unterscheiden sich je nach Browser:
IE, Edge, Chrome, Safari, Opera 15+: ALT + accesskey
Opera (1-14): SHIFT - ESC + accesskey
Firefox: ALT + SHIFT + accesskey
