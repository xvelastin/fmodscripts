# FMOD Scripts

Dumping/sharing ground for my more-or-less good to go FMOD scripts.

## FMOD Studio Project

Fork/download the whole repo and run `fmodscripts-public.fspro` (FMOD v2.03.01). I've added some example Events there so you can try out some of the scripts below. I've tested them a fair bit, but if you do try them out, let me know if you find any errors or weird behaviour - I might not have considered all workflows or use cases.


## Events

[`Create Markers and Events From Clips`](Scripts/CreateMarkersAndEventsFromClips.js): Get the selected sounds on an event timeline, duplicates them to individual events, and places matching destination markers at their positions on the original timeline. Used to create callbacks out of FMOD Studio. See [here](https://youtu.be/UZTcb2QK96o?list=PLQJDasr_1Y2XeduT7dT-bJlIxXxHNYmJR) for an example usage.

[`Consolidate Sounds`](Scripts/ConsolidateToEvent.js): Consolidates the selected items to create a nested Event Instrument, maintaining timeline position data and track volumes.

[`Convert Timeline To Action`](Scripts/ConvertTimelineToAction.js): Manhandles a Timeline Sheet on an Event to an Action Sheet if you'd rather handle oneshots that way. (reverse script is on its way)


## Mixing
[`Fader To Gain`](Scripts/FaderToGain.js): Sets the level of the track through a new 'Gain' Effect rather than through the fader. Useful for the mixing stage when you want to use the faders for balancing/snapshots.

## File Management

[`Rename Events XXX`](Scripts/RenameEventsXXX.js): Batch renames selected events with a given prefix and a suffix of three digits (eg. prefix_666).

## Development
[`What Is This?`](Scripts/WhatIsThis.js): Prints information about the selected objects to the console to help when developing scripts.

