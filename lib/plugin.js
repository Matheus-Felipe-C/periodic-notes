const plugin = {
  constants: {
    weeklyNoteTitle: "Weekly Note W42",
  },

  appOption: {
    "Open weekly note": async function(app) {
      const weeklyNote = await app.findNote({ title: plugin.constants.weeklyNoteTitle });
      
      if (weeklyNote) {
        await app.navigate(`https://amplenote.com/notes/${weeklyNote.uuid}`);
      } else {
        await app.alert("No weekly note found");
        console.error("No weekly note found");
        console.error("Weekly note title: ", plugin.constants.weeklyNoteTitle);
      }
    }
  },
};
export default plugin;
