// Converts the Timeline on the selected Event to an Action Sheet

studio.menu.addMenuItem({
  name: "Convert To Action Event",

  execute: function () {
    var sel = studio.window.browserCurrent(); // currently only works for one event at a time

    if (!sel.isOfExactType("Event")) return;
    
    var event = sel;

    // add new action sheet
    var actionSheet = studio.project.create("ActionSheet");
    var actionSheetSound = studio.project.create("MultiSound");
    actionSheet.modules = actionSheetSound;
    event.relationships.parameters.add(actionSheet);
    actionSheetSound.audioTrack = event.masterTrack;
    actionSheetSound.playbackMode = 1; // set to concurrent playback

    // get each instrument/track
    var timeline = event.timeline;
    var timelineModules = [];
    for (var i = 0; i < timeline.modules.length; i++) {
      var moduleIndex = timeline.modules[i];
      timelineModules.push(moduleIndex);
    }
    print(event.name + ": found " + timeline.modules.length + " modules from timeline.");

    timelineModules.forEach(function (origin, index) {
      // copy and paste
      studio.window.navigateTo(origin);
      Copy();
      studio.window.navigateTo(actionSheetSound);
      Paste();

      // combine track volume from timeline to new instrument volume
      var originTrackVolume = origin.audioTrack.mixerGroup.volume;
      actionSheetSound.sounds[index].volume += originTrackVolume;
    });

    // remove timeline sheet
    studio.project.deleteObject(timeline);
  },
});

function print(message) {
  studio.system.print("\n" + message + "\n");
}

function Copy() {
  studio.window.triggerAction(studio.window.actions.Copy);
}
function Paste() {
  studio.window.triggerAction(studio.window.actions.Paste);
}
