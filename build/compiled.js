(() => {
  // lib/utils/processNoteTitle.js
  function processNoteTitle(noteTitle) {
    noteTitle = noteTitle.replace(/{{YYYY}}/g, (/* @__PURE__ */ new Date()).getFullYear().toString());
    noteTitle = noteTitle.replace(/{{YY}}/g, (/* @__PURE__ */ new Date()).getFullYear().toString().slice(-2));
    noteTitle = noteTitle.replace(/{{MMM}}/g, (/* @__PURE__ */ new Date()).toLocaleString("default", { month: "long" }));
    noteTitle = noteTitle.replace(/{{MM}}/g, (/* @__PURE__ */ new Date()).getMonth().toString().padStart(2, "0"));
    noteTitle = noteTitle.replace(/{{M}}/g, (/* @__PURE__ */ new Date()).getMonth().toString());
    noteTitle = noteTitle.replace(/{{DD}}/g, (/* @__PURE__ */ new Date()).getDate().toString().padStart(2, "0"));
    noteTitle = noteTitle.replace(/{{D}}/g, (/* @__PURE__ */ new Date()).getDate().toString());
    noteTitle = noteTitle.replace(/{{[Q]}}/g, (/* @__PURE__ */ new Date()).getMonth() / 3 + 1).toString();
    return noteTitle;
  }

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
        const processedNoteTitle = processNoteTitle(weeklyTemplate.name);
        const existingNote = await app.findNote({ name: processedNoteTitle });
        if (existingNote) {
          console.log("Note with same name exists");
          console.log(existingNote);
          app.navigate(`https://www.amplenote.com/notes/${existingNote.uuid}`);
          return;
        }
        const newNoteUuid = await app.createNote(weeklyTemplate.name, weeklyTemplate.tags);
        const content = await app.getNoteContent({ uuid: weeklyTemplate.uuid });
        await app.insertNoteContent({ uuid: newNoteUuid }, content);
        app.navigate(`https://www.amplenote.com/notes/${newNoteUuid}`);
      }
    }
  };
  var plugin_default = plugin;
})();
