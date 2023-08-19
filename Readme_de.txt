Mein Shelly-Projekt bei meiner Mutter

Ich bin Elektroinstallateur und hatte vor 2 Jahren begonnen,
mit Shelly-Relais einiges bei mir zu Hause zu installieren.
Dann kam auch meine Mutter mit W�nschen in ihrer Wohnung hinzu.
Damit Mutter eine ordentliche Dokumentation als Ged�chtnisst�tze hat,
musste ich viel schreiben und alles ist f�r sie am PC oder Smartphone
nachlesbar und wurde auch mal auf Papier ausgedruckt.

Nun hat Shelly viele Ger�te, die unterschiedliche JSON-Ergebnisse
erzeugen, um diese lokal auszuwerten, anzuzeigen und Links f�r
weitere Aktionen zu erzeugen. Deshalb gibt es derzeit f�r Relaise,
Lichter, Rollos und Inputs 4 verschiedene Seiten, die einzeln aufrufbar
oder in einer Frame-Seite alles anzeigen.
In Planung, wenn Zeit ist, schreibe ich dies auch f�r die Generation2-
Ger�te, aber Mutter hat derzeit erst zwei Plus1 und zwei i4.
In den i4 habe ich in erster Linie Scripte f�r Lichtsteuerung eingebaut,
die ich sp�ter beschreibe.

Also in erster Linie geht es mir bei der Anzeige auf der lokalen Webseite
um die wichtigsten Dinge des jeweiligen Ger�tes, bei denen in der Shelly-
App erst umst�ndlich gesucht werden muss, was meiner Mutter schwer f�llt.
Ebenfalls lernt sie dabei auch die Bedienung der Taster mit den unz�hligen Schaltbefehlen.

Alle Webseiten sind f�r eigene Projekte, Anzahl der Ger�te und Aktionen anpassbar.
Wichtig ist insbesondere im body-Bereich die Angabe der eigenen IP f�r das
jeweilige Ger�t, ein eigenen Namen f�r das Ger�t und auch eine eigen
Raumbezeichnung einzutragen.
Auch bei Ger�ten mit mehr als einem Kanal, die id des Kanals von 0 bis ...
anzupassen.
Alle Ger�te, die angezeigt werden sollen, m�ssen
"Allow Cross-Origin Resource Sharing" (WebUI > "Internet & Security") aktiviert haben.

relays:
Bei den PlugS-Ger�ten ist also nur der Schaltzustand An oder Aus durch
farbige Symbole sichtbar, mit Klick auf das Symbol wird der Schaltzustand
ge�ndert. Zus�tzlich wird die Leistung in Watt und die Chip-Temperatur
angezeigt sowie wenn ein Timer aktiv ist, die ablaufende Zeit.
An einem Shelly 1PM ist ein Addon mit zwei Temperatursensoren
angeschlossen, die Chip-Temperatur habe ich aus Platzgr�nden nur in
die Maus-Titel-Info gepackt.
Als Sonnenuhr dient ein Shelly 1, der keine Leistungsmessung oder
Temperatur anzeigen kann, aber die Uhrzeit. Dieser Shelly ist nur zur
Bereitstellung der Sonnenaufgang und Spnnenuntergangszeit gedacht,
um in Szenen der Shelly-App damit arbeiten zu k�nnen, nat�rlich auch f�r Scripte nutzbar, ohne fremde Server besuchen zu m�ssen.
Beim Klick auf den Ger�tenamen wird �berall die lokale Ger�te-Webseite
ge�ffnet (nutzt meine Mutter nicht).

lights:
Die meisten Leuchtmittel sind nun auf Shelly Duo, RGBW, Vintage
umgestellt. Bisher nur zum Test hatte ich auch einen Dimmer2 mit
einfachem Leuchtmittel im Netzwerk, er unterst�tzt ja auch alle Werte
der LED-Leuchtmittel und ist deshalb auch mit dieser Webseite integrierbar.
Auch hier kann mit Mausklick oder auf dem Smartphone mit dem Finger
auf dem Symbol der Schaltzustand ge�ndert werden. Wenn angeschalten,
wird die Leistung in Watt und die Dimmstufe in % angezeigt.
Mit Lampen ist jedoch noch vieles auch schaltbar.
- Die Color-LED k�nnen in der Extra-Schaltleiste zwischen Colormode
  und Weissmode umschalten.
- Die aktive Farbe wird auf dem Leuchtmittel und der Hintergrundfarbe
  der Leistungs- und Dimmstufen-Anzeige dargestellt. Ob in jedem
  Browser die Farbe richtig dargestellt wird, ist nicht garantiert
  (Chrome im Dunkelmodus macht nur, was er will).
- Die Farbe kann mit Klick auf die Leistungs- und Dimmstufen-Anzeige
  in eine zuf�llige Farbe ge�ndert werde, aber auch im Script auf
  festgelegte Farben angepasst werden. Im Weissmodus wird die
  Weiss-Temperatur in K gewechselt.
- Im Colormodus erscheint auch eine Schaltfl�che f�r die definierten
  Effekte zum umschalten.
- Bei allen Leuchtmitteln sind vordefinierte Dimmstufen von der
  Webseite schaltbar und wird auch graphisch dargestellt.
- Alle Elemente besitzen eine Maus-Info (title-Attribut).

rollers:
Jalousien konnte ich jetzt erst im Urlaub bei meiner Mutter schreiben,
da sie kalibrierte Rollos mit Shelly 2.5 hat, ich zu Hause nicht.
Somit waren auch die Tests jetzt im Urlaub erst m�glich.
Bei Klick auf das Symbol wird immer die gegenl�ufige Richtung
der vorherigen Fahrt gestartet oder w�hrend der Fahrt gestoppt.
Den �ffnungszustand in % wird in das Symbol geschrieben.
Die Pfeile starten immer in der Richtung, wohin sie zeigen.
Sie werden bei Fahrt in das Pausensymbol ge�ndert und sind inaktiv,
wenn das Richtungsende erreicht ist
 (in der Shelly-App & Shelly-Control-App bleibt der Pfeil aktiv).
Zwischen den Pfeilen kann eine Liste vordefinierter Favoriten
angefahren werden. Das Symbol zeigt auch die Position an.
Die Chip-Temperatur des Shelly 2.5 wird auch angezeigt,
bei Fahrt wird an dieser Stelle die Leistung in Watt angezeigt.

Die Summe der aktuellen Leistung in Watt wird bei relays,
lights und roller auf jeder Seite angezeigt, das Maximum an
Spannung in Volt aller eingetragenen Ger�te nur bei relays und roller.
Ebenfalls in der Legende unten wird die Zeit angezeigt,
wann wieder Daten von den Ger�ten abgerufen werden.

Zus�tzlich wird auch gepr�ft, ob eine neue Firmware vorhanden ist
und wenn diese in der Maus-Info angezeigt wird, kann per Klick
ein Update angestossen werden.

inputs:
Leider hat nur der i3 den Wert "last_sequence", aus dem doch
l�ngere Zeit der letzte gedr�ckte Zustand auslesbar ist.
"event" haben auch die relays, aber der Wert bleibt nur 5 Sekunden erhalten.
Somit ist diese Webseite nur f�r den i3 interessant und aus dem
anzeigbaren Wert habe ich das soweit erweitert, dass auch der
Hauptbefehl anklickbar mit angezeigt wird.

Weil auf dem Smartphone diese Seiten keine anderen lokalen
Seiten aufrufen kann, sind die Scripte und das CSS-Stylesheet
in der HTML-Seite integriert.
Alles ist bis hierher f�r die Ger�te der 1.Generation geschrieben,
die 2.Generation werde ich demn�chst in Angriff nehmen,
um auch diesen Ger�ten eine einfache Seite zu geben.

Scripte im Plus i4: (sind im Ursprung teils auf https://github.com/shelly-tools/shelly-script-examples zu finden)

"led-color.js"
Jede Taste, die ein Leuchtmittel schaltet, �ndert mit "SinglePush" den Schaltzustand und setzt auf "ColorModus".
Mit "DoublePush" wird die Farbe ge�ndert, "Longpush" setzt eine Dimmstufe weiter.
Seit die Plus-Ger�te den "TriplePush" unterst�tzen, schaltet dieser den WeissModus an.

"rollos.js"
Einen Script verwende ich an einer Taste am i4, um mit SinglePush"
ein Rollo zu steuern und mit "DoublePush" das zweite Rollo.
Das zweite Rollo ist so im Shelly 2.5 eingestellt, dass alle Befehle
gleichzeitig an das dritte Rollo weitergibt und dieses somit syncron mitl�uft.
Somit ist die Rollosteuerung nicht nur am Fenstertaster m�glich,
sondern auch am Lichttaster an der T�r.

"led-master-slave.js"
An einem i4 habe ich den "TriplePush" dazu verwendet, um alle
Farben und Helligkeit der Master-Spot-Leuchte auf die anderen LEDs zu �bertragen.

"Roller-BLU-Button.js"
Mir war gerade so, meiner Mutter einen BLU-Button zu best�cken und
habe au�er drei LEDs noch eine Rollosteuerung f�r den SinglePush
in einen Plus 1 eingebaut.

Weiteres folgt ... (dauert etwas, mein Urlaub endet morgen)


Hinzugef�gt in relays.htm, roller.htm und lights.htm 2023.08.18

Tastaturk�rzel (accesskey) auf der Symbolschaltfl�che, somit muss die
Maus nicht bis zum Symbol wandern, nur wenn der accesskey in der
Mausinfo gelesen werden will.
Das funktioniert nat�rlich nur bei einstelliger id, welche pro Ger�t
vergeben wird. Bei Buchstaben als id sollte beachtet werden, dass der
Browser ebenfalls Buchstaben im Men� verwendet, diese haben Vorrang.
Beachten Sie, die Tastaturk�rzel unterscheiden sich je nach Browser:
IE, Edge, Chrome, Safari, Opera 15+: ALT + accesskey
Opera (1-14): SHIFT - ESC + accesskey
Firefox: ALT + SHIFT + accesskey
