const plugin = {
  constants: {
    weeklyNoteTitle: "Weekly Note W42",
  },

  appOption: {
    "Open weekly note": async function(app) {
      let weeklyNote = await app.findNote({ title: plugin.constants.weeklyNoteTitle });
      
      if (!weeklyNote) {
        console.log("No weekly note found, creating new one");
        weeklyNote = await createNote(app, plugin.constants.weeklyNoteTitle);
      }

      await app.navigate(`https://amplenote.com/notes/${weeklyNote.uuid}`);
    }
  },
};
export default plugin;
