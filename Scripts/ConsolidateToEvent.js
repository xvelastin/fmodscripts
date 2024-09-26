// Consolidates selected items to create a nested Event Instrument, maintaining timeline position data.

studio.menu.addMenuItem({
    name: 'Consolidate Sounds',

    execute: function()
    {
        var selectedInEditor = studio.window.editorSelection();

        // filter out anything that isn't a Sound        
        var selectedSounds = selectedInEditor.filter(function (obj) { return obj.isOfType("Sound"); });
        var selectedSound;
                
        // check validity
        if (selectedSounds.length === 0) {
            alert("Select at least one sound.");
            return;
        }
        
        // is it a sheet with a timeline or an action sheet?
        var isTimelineTypeSheet = selectedSounds[0].owner === null;
        if (isTimelineTypeSheet) {
            selectedSound = selectedSounds[0];
        } else {
            // is action sheet: select the MultiSound
            selectedSound = selectedSounds[0].owner;
        }

        studio.window.triggerAction(studio.window.actions.Copy);
        
        // get info
        var selectedSheet = selectedSound.parameter;
        var event = selectedSound.audioTrack.event;

        if (isTimelineTypeSheet) {
            // make new track for event
            var eventTrack = event.addGroupTrack("Nested Event");

            // calculate starting and end points for sounds
            var eventDuration = {start: selectedSounds[0].start, length: 0};
            for (var i = 0; i < selectedSounds.length; i++) {
                eventDuration.start = Math.min(eventDuration.start, selectedSounds[i].start);
                eventDuration.length = Math.max(eventDuration.length, selectedSounds[i].start + selectedSounds[i].length);
            }
            eventDuration.length -= eventDuration.start;

            // add event instrument
            var eventInstrument = eventTrack.addSound(selectedSheet, "EventSound", eventDuration.start, eventDuration.length);

            // get number of tracks in selected
            var tracksFromSelected = [];
            for (var i = 0; i < selectedSounds.length; i++) {
                if (tracksFromSelected.length === 0 || tracksFromSelected[tracksFromSelected.length - 1].id !== selectedSounds[i].audioTrack.id) {
                    tracksFromSelected.push(selectedSounds[i].audioTrack);
                }
            }
            // open the new nested event instance
            var eventInstrumentEvent = eventInstrument.event;
            eventInstrumentEvent.name = "_" + event.name;
            studio.window.navigateTo(eventInstrumentEvent);

            // create group tracks
            for (var i = 0; i < tracksFromSelected.length; i++) {
                var newTrack = eventInstrumentEvent.addGroupTrack(tracksFromSelected[i].mixerGroup.name);
                
                // copy volume
                newTrack.mixerGroup.effectChain.bus.volume = tracksFromSelected[i].mixerGroup.effectChain.bus.volume;
                // TODO : some way to easily copy all info from tracks inc. effects etc?
            }

            if (selectedSheet.isOfType("Timeline")) {
                selectedSheet.setCursorPosition(0);
            }
            else if (selectedSheet.isOfType("ParameterProxy")) {
                // replace timeline with parameter sheet
                studio.project.deleteObject(eventInstrumentEvent.timeline);
                eventInstrumentEvent.addGameParameter(selectedSheet.preset);
                eventInstrumentEvent.setCursorPosition(selectedSheet.preset, eventDuration.start);
            }

            studio.window.triggerAction(studio.window.actions.Paste);

        } else {
            // create new event and assign to original event
            var consolidatedEvent = studio.project.create("Event");
            consolidatedEvent.name =  "_" + event.name;
            consolidatedEvent.folder = event;
            var eventInstrument = studio.project.create("EventSound");
            eventInstrument.event = consolidatedEvent;
            eventInstrument.owner = selectedSheet.modules;

            studio.window.navigateTo(consolidatedEvent);

            // replace timeline with action sheet
            studio.project.deleteObject( consolidatedEvent.timeline)

            // add new action sheet
            var actionSheet = studio.project.create("ActionSheet");
            var actionSheetSound = studio.project.create("MultiSound");
            actionSheet.modules = actionSheetSound;
            consolidatedEvent.relationships.parameters.add(actionSheet);
            actionSheetSound.audioTrack = consolidatedEvent.masterTrack;
            actionSheetSound.playbackMode = selectedSound.playbackMode; // copy playback type     

            studio.window.triggerAction(studio.window.actions.Paste);
        }

        // go back to original event: clean up
        studio.window.navigateTo(event);
        for (var i = 0; i < selectedSounds.length; i++) {
            if (isTimelineTypeSheet) {
                if (selectedSounds[i].audioTrack.modules.length <= 1) {
                    // delete track if it's safe to do so
                    studio.project.deleteObject(selectedSounds[i].audioTrack);
                    continue;
                }
            }
            studio.project.deleteObject(selectedSounds[i]);
        }
    }
});