My Shelly project at my mother's



I am an electrician and started installing some things in my home using Shelly relays 2 years ago.
Then my mother came to her apartment with wishes. I had to write
a lot so that mother has proper documentation as a memory aid,
and everything can be read by her on the PC or smartphone and
was sometimes printed out on paper.


Now Shelly has many devices that generate different JSON results
to evaluate them locally, display them and generate links for further
actions. That's why there are currently 4 different pages for relays,
lights, rollos and inputs, which can be called up individually or
display everything in a frame page.
In planning, if there is time, I will also write this for the Generation2
devices, but mother currently only has two Plus1 and two i4.
In the i4 I primarily built scripts for lighting control, which I will
describe later.


First and foremost, the display on the local website is about the
most important things about the respective device, which first have
to be searched for in the Shelly app, which is difficult for my mother.
She also learns how to operate the buttons with the countless
switching commands.

All websites are customizable for your own projects, number of devices
and actions.
It is particularly important in the body area to enter your own IP for the
respective device, your own name for the device and also your own
room designation.
Also for devices with more than one channel, adjust the id of the
channel from 0 to ....
All devices to be displayed must have
"Allow Cross-Origin Resource Sharing" enabled (WebUI > "Internet & Security").

relays:
With the PlugS devices, only the switching status On or Off is visible
through colored symbols; the switching status is changed by clicking
on the symbol. In addition, the power in watts and the chip temperature
are displayed, as well as the elapsing time if a timer is active.
An addon with two temperature sensors is connected to a Shelly 1PM.
For reasons of space, I only put the chip temperature in the mouse title info.
A Shelly 1 serves as a sundial, which cannot display power measurement
or temperature, but can display the time. This Shelly is only intended to
provide the sunrise and sunset times in order to be able to work with
them in scenes of the Shelly app, of course it can also be used for scripts
without having to visit external servers.
When you click on the device name,
the local device website is opened everywhere (my mother doesn't use it).

lights:
Most lamps have now been switched to Shelly Duo, RGBW, Vintage.
So far, I only had a Dimmer2 with a simple light source in the network
for testing, it also supports all values of the LED light sources and can
therefore also be integrated with this website.
Here, too, the switching status can be changed with a mouse click or
with your finger on the smartphone on the symbol.
When switched on, the power is displayed in watts and the dimming level
in %.
However, a lot can still be switched with lamps.

- The color LEDs can switch between color mode and white mode in the
  extra toolbar.
- The active color is shown on the lamp and the background color of
  the power and dimming level display. Whether the color is displayed
  correctly in every browser is not guaranteed
  (Chrome in dark mode only does what it wants).
- The color can be changed to a random color by clicking on the power
  and dimming level display, but can also be adapted to specified colors
  in the script. In the white mode, the white temperature is changed in K.
- In color mode there is also a button for switching the defined effects.
- For all light sources, predefined dimming levels can be switched from
  the website and are also displayed graphically.
- All elements have a mouse info (title attribute).

rollers:
I was only able to write about blinds when I was on vacation with my
mother, because she has calibrated blinds with Shelly 2.5, I don't at home.
This means that the tests were only possible now that we were on vacation.
When you click on the symbol, the opposite direction of the previous
journey is always started or stopped during the journey.
The opening status in % is written in the symbol.
The arrows always start in the direction they are pointing.
They are changed to the pause symbol when driving and are inactive
when the end of the direction is reached (the arrow remains active in
the Shelly app & Shelly Control app).
A list of predefined favorites can be accessed between the arrows.
The icon also indicates the position.
The chip temperature of the Shelly 2.5 is also displayed;
when driving, the power in watts is displayed here.

The sum of the current power in watts is displayed for relays,
lights and rollers on each page, the maximum voltage in volts
of all registered devices only at relays and roller.
The legend below also shows the time when data will be retrieved
from the devices again.
In addition, it is also checked whether a new firmware is available
and if this is displayed in the mouse info, an update can be triggered
with a click.

inputs:
Unfortunately, only the i3 has the value "last_sequence", from which
the last pressed state can be read out over a longer period of time.
The relays also have "event", but the value is only retained for 5 seconds.
So this website is only interesting for the i3 and from the displayable
value I have expanded it so far that the main command is also displayed
as clickable.

Because these pages cannot call up any other local pages on the
smartphone, the scripts and the CSS style sheet are integrated into
the HTML page.
Everything is written up to here for the devices of the 1st generation,
I will tackle the 2nd generation soon in order to give these devices a
simple page as well.

Scripts in the Plus i4: (some of the originals can be found on https://github.com/shelly-tools/shelly-script-examples)

"led-color.js"
Each button that switches a lamp changes the switching status with
"single push" and sets to "color mode".
With "DoublePush" the color
is changed, "Longpush" advances one dimming level.
Since the Plus devices have supported "TriplePush", this switches on
the white mode.

"rollos.js"
I use a script on a button on the i4 to control one blind with "SinglePush"
and the second blind with "DoublePush".
The second blind is set in Shelly 2.5 so that all commands are passed on
to the third blind at the same time and this is therefore synchronous Thus,
the roller blind control is not only possible with the window button, but
also with the light button on the door.

"led-master-slave.js"
On an i4 I used the "TriplePush" to transfer all the colors and brightness
of the master spot light to the other LEDs.



"Roller-BLU-Button.js"
I just felt like putting a BLU button on my mother and
In addition to
three LEDs, I also installed a roller blind control for the SinglePush
in a Plus 1.

Further information will follow ... (takes a while, my vacation ends tomorrow)


Added in relays.htm, roller.htm and lights.htm 2023.08.18

Keyboard shortcut (accesskey) on the icon button, so the
Mouse does
not wander up to the icon, only if the accesskey is in the
mouse info
wants to be read.
Of course, this only works with a one-digit ID, which per device
is
awarded. With letters as id it should be noted that the
Browsers also
use letters in the menu, these have priority.
Note, the keyboard shortcuts are different depending on the browser:
IE, Edge, Chrome, Safari, Opera 15+: ALT + accesskey
Opera (1-14): SHIFT - ESC + accesskey
Firefox: ALT + SHIFT + accesskey
