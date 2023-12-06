# FMOD Scripts

Dumping/sharing ground for FMOD scripts.


## Events

[`Convert Timeline To Action`](/ConvertTimelineToAction.js): Manhandles a Timeline Sheet on an Event to an Action Sheet if you'd rather handle oneshots that way. (reverse script is on its way)

[`Create Markers and Events From Clips`](/CreateMarkersAndEventsFromClips.js): Get the selected sounds on an event timeline, duplicates them to individual events, and places matching destination markers at their positions on the original timeline. Used to create callbacks out of FMOD Studio. See [here](https://youtu.be/UZTcb2QK96o?list=PLQJDasr_1Y2XeduT7dT-bJlIxXxHNYmJR) for an example usage.


## Mixing
[`Fader To Gain`](/FaderToGain.js): Sets the level of the track through a new 'Gain' Effect rather than through the fader. Useful for the mixing stage when you want to use the faders for balancing/snapshots.

## File Management

[`Rename Events XXX`](/RenameEventsXXX.js): Batch renames selected events with a given prefix and a suffix of three digits (eg. prefix_666).

## Other
[`What Is This?`](/WhatIsThis.js): Prints information about the selected objects to the console to help when developing scripts.

