// Replaces Fader volume with a new Gain effect, for mixing stage.

studio.menu.addMenuItem({
    name: 'Fader to Gain',

    execute: function()
    {
        var effectChain;
        var gain;

        // if a specific fader is selected in deck, use that
        var selDeck = studio.window.deckCurrent();
        if (selDeck != null && selDeck.isOfExactType("MixerBusFader"))
        {
            effectChain = selDeck.owner;
            gain = effectChain.addEffect("GainEffect");
            gain.gain = effectChain.bus.volume;
            effectChain.bus.volume = 0;
            return;
        }

        // else try to find a fader on a selected track in the editor        
        var editorCurrent = studio.window.editorCurrent();
        if (editorCurrent != null && editorCurrent.isOfExactType("GroupTrack"))
        {
            effectChain = editorCurrent.mixerGroup.effectChain;
            gain = effectChain.addEffect("GainEffect");
            gain.gain = effectChain.bus.volume;
            effectChain.bus.volume = 0;
            return;
        }

        // else use the master track on the currently selected event in the browser
        var selectedInBrowser = studio.window.browserSelection();
        const allowableBrowserTypes = ["Event", "MixerInput", "MixerGroup", "MixerMaster", "MixerReturn"];

        selectedInBrowser.forEach(function(sel)
        {
            if (!IsOfAllowableBrowserType(sel)) {
                alert("Not implemented for selected type: " + sel.entity);
                return;
            }

            if (sel.isOfExactType("Event"))
            {
                effectChain = sel.masterTrack.mixerGroup.effectChain;
            }
            else if (sel.isOfExactType("MixerInput"))
            {
                effectChain = sel.event.masterTrack.mixerGroup.effectChain;
            }
            else if (sel.isOfExactType("MixerReturn") || sel.isOfExactType("MixerGroup") || sel.isOfExactType("MixerMaster"))
            {
                effectChain = sel.effectChain;
            }

            gain = effectChain.addEffect("GainEffect");
            gain.gain = effectChain.bus.volume;
            effectChain.bus.volume = 0;
        });

        function IsOfAllowableBrowserType(selected)
        {
            for (var i = 0; i < allowableBrowserTypes.length; i++)
            {
                if (selected.isOfExactType(allowableBrowserTypes[i])) return true;
            }
            return false;
        }
    }
});

function print(message)
{
    studio.system.print("\n" + message);
}