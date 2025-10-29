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
        console.log("Weekly note template:");
        console.log(weeklyTemplate);
        const newNoteUuid = await app.createNote(weeklyTemplate.name, weeklyTemplate.tags);
        const content = await app.getNoteContent({ uuid: weeklyTemplate.uuid });
        console.log("Content:");
        console.log(content);
        await app.insertNoteContent({ uuid: newNoteUuid }, content);
        app.navigate(`https://www.amplenote.com/notes/${newNoteUuid}`);
      }
    }
  };
  var plugin_default = plugin;
  return plugin_default;
})()
