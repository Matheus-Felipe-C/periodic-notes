(() => {
  // lib/arbitrary-plugin-module.js
  async function proofImportIsPossible() {
    console.log("As you can see, code is being run that originated from a different file than the base plugin.js file \u2728");
    return true;
  }

  // lib/plugin.js
  var plugin = {
    // --------------------------------------------------------------------------------------
    constants: {},
    // --------------------------------------------------------------------------
    // https://www.amplenote.com/help/developing_amplenote_plugins#insertText
    insertText: {},
    // --------------------------------------------------------------------------
    // https://www.amplenote.com/help/developing_amplenote_plugins#noteOption
    noteOption: {
      "Baby's first Note Option command": {
        check: async function(app, noteUUID) {
          const noteContent = await app.getNoteContent({ uuid: noteUUID });
          const proof = proofImportIsPossible();
          return /cool/i.test(noteContent.toLowerCase());
        },
        run: async function(app, noteUUID) {
          await app.alert("You clicked the Baby's first Note Option command in a COOL note!");
          console.debug("Special message to the DevTools console");
        }
      }
    },
    // --------------------------------------------------------------------------
    // https://www.amplenote.com/help/developing_amplenote_plugins#replaceText
    replaceText: {}
    // There are several other entry points available, check them out here: https://www.amplenote.com/help/developing_amplenote_plugins#Actions
    // You can delete any of the insertText/noteOptions/replaceText keys if you don't need them
  };
  var plugin_default = plugin;
})();
