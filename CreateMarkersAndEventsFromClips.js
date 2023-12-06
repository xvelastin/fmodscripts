// Get the selected sounds on an event timeline, duplicates them to individual events, and places matching destination markers at their positions on the original timeline. Used to create callbacks out of FMOD Studio.  

studio.menu.addMenuItem({
    name: 'Create Markers and Events from Clips',
    isEnabled: function () {
        var clips = studio.window.editorSelection();
        return clips.length > 0;
    },

    execute: function () {

        var eventNamePrefix = studio.system.getText("Event Name Prefix", "Hit_Level1_");
        var folder = studio.project.create('EventFolder');
        folder.name = eventNamePrefix;

        var clips = studio.window.editorSelection();
        var markerTrack = studio.window.browserCurrent().addMarkerTrack();

        for (var i = 0; i < clips.length; i++) {
            var clip = clips[i];
            var audio = clip.audioFile;
            var ev = studio.project.workspace.addEvent("aaa", false);

            var xxx = ('00'+i).slice(-3);
            ev.name = eventNamePrefix + xxx;
            ev.folder = folder;

            var track = ev.addGroupTrack('Audio Track');

            var inst = track.addSound(ev.timeline, 'SingleSound', 0, clip.length);
            inst.audioFile = audio;

            // Add markers
            var position = clip.properties.start.value;
            markerTrack.addNamedMarker(ev.name, position);
        }
    }
});