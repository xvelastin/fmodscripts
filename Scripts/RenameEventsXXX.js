// Batch renames selected events with a given prefix and a suffix of three digits (eg. prefix_666).

studio.menu.addMenuItem({
    name: 'Rename Events XXX',
    isEnabled: function () {
        var events = studio.window.browserSelection();
        return events.length > 0;
    },

    execute: function () {

        var browserSelection = studio.window.browserSelection();

        var eventNamePrefix = studio.system.getText("Event Name Prefix", "");

        if (eventNamePrefix == null) return;

        for (i = 0; i < browserSelection.length; i++) {
            if (browserSelection[i].isOfExactType("Event") === true)
            {
                var xxx = ('00'+i).slice(-3);
                browserSelection[i].name = eventNamePrefix + xxx;
            }
        }
    }
});