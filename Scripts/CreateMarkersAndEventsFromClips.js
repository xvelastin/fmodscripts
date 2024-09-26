// Get the selected sounds on an event timeline, duplicates them to individual events, and places matching destination markers at their positions on the original timeline. Used to create callbacks out of FMOD Studio.  

studio.menu.addMenuItem({
    name: 'Clip Positions to Markers and Events',
    isEnabled: () => studio.window.editorSelection() && studio.window.editorSelection().length > 0,
    execute: function () {
        // get clips
        var firstSelected = studio.window.editorSelection()[0];
        var clips = [];        
        if (firstSelected.isOfType("Sound")) {
            clips = studio.window.editorSelection();
        } else if (firstSelected.isOfType("GroupTrack")) {
            var selection = studio.window.editorSelection()
            for (var i = 0; i < selection.length; i++) {
                var selectedTrackModules = selection[i].modules;
                clips.push(...selectedTrackModules);
            }
        } else {
            alert("Select either a Track or Sound");
            return;
        }
        
        // user enters prefix for destination markers + events        
        var eventNamePrefix = studio.system.getText("Event Name Prefix (optional)", "");
        if (eventNamePrefix === null) // return if user escapes
            return;

        var event = clips[0].audioTrack.event;
        var markerTrack = event.addMarkerTrack();

        // sort clips according to position on track: fixes selection weirdness
        clips.sort((a, b) => a.properties.start.value - b.properties.start.value);

        for (var i = 0; i < clips.length; i++) {
            var clip = clips[i];
            var audio = clip.audioFile;
            var ev = studio.project.create("Event");
            ev.name = eventNamePrefix + i;
            ev.folder = event;

            var track = ev.addGroupTrack('Audio Track');

            var inst = track.addSound(ev.timeline, 'SingleSound', 0, clip.length);
            inst.audioFile = audio;

            // Add markers
            var position = clip.properties.start.value;
            markerTrack.addNamedMarker(ev.name, position);
        }
    }
});