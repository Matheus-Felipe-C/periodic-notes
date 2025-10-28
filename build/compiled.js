(() => {
  // lib/plugin.js
  var plugin = {
    constants: {
      weeklyNoteTemplate: "625d7b86-b0dc-11f0-a9f1-79905b0dfa73"
    },
    appOption: {
      "Open weekly note": async function(app) {
        let weeklyTemplate = await app.findNote({ uuid: plugin.constants.weeklyNoteTemplate });
        if (!weeklyTemplate) {
          console.error("No template found for weekly note");
          return;
        }
        const newWeeklyNote = await app.createNote(weeklyTemplate.title, weeklyTemplate.tags);
        app.navigate(`https://amplenote.com/notes/${newWeeklyNote.uuid}`);
      }
    }
  };
  var plugin_default = plugin;
})();
