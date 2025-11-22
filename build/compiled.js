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
  async function findIfNoteExists(app2, noteTitle) {
    const processedNoteTitle = processNoteTitle(noteTitle);
    const existingNote = await app2.findNote({ name: processedNoteTitle });
    if (existingNote) {
      console.log("Note with same name exists");
      console.log(existingNote);
      return existingNote.uuid;
    }
  }
  async function createNoteFromTemplate(app2, template, tagsToExclude) {
    const processedNoteTitle = processNoteTitle(template.name);
    const filteredTags = (template.tags || []).filter(
      (tag) => !tagsToExclude.includes(tag)
    );
    const newNoteUuid = await app2.createNote(
      processedNoteTitle,
      filteredTags
    );
    const content = await app2.getNoteContent({ uuid: template.uuid });
    await app2.insertNoteContent({ uuid: newNoteUuid }, content);
    return newNoteUuid;
  }

  // lib/plugin.js
  var plugin = {
    constants: {
      dailyNoteTemplate: app.settings["Daily Note Template UUID"],
      weeklyNoteTemplate: app.settings["Weekly Note Template UUID"],
      monthlyNoteTemplate: app.settings["Monthly Note Template UUID"],
      quartelyNoteTemplate: app.settings["Quarterly Note Template UUID"],
      yearlyNoteTemplate: app.settings["Annual Note Template UUID"],
      tagsToExclude: app.settings["Tags to exclude"]
    },
    appOption: {
      "Open daily note": {
        async check(app2) {
          let dailyTemplate = await app2.findNote({ uuid: plugin.constants.dailyNoteTemplate });
          if (!dailyTemplate) {
            console.warn("No template found for daily note");
            return false;
          }
          const existingNoteUuid = await findIfNoteExists(app2, dailyTemplate.name);
          if (existingNoteUuid) {
            return "Open Daily Note";
          } else {
            return "Create Daily Note";
          }
        },
        async run(app2) {
          const dailyTemplate = await app2.findNote({ uuid: plugin.constants.dailyNoteTemplate });
          if (!dailyTemplate) {
            console.error("No template found for daily note");
            return;
          }
          const existingNoteUuid = await findIfNoteExists(app2, dailyTemplate.name);
          if (existingNoteUuid) {
            app2.navigate(`https://www.amplenote.com/notes/${existingNoteUuid}`);
            return;
          }
          const newNoteUuid = await createNoteFromTemplate(app2, dailyTemplate);
          app2.navigate(`https://www.amplenote.com/notes/${newNoteUuid}`);
        }
      },
      "Open weekly note": async function(app2) {
        let weeklyTemplate = await app2.findNote({ uuid: plugin.constants.weeklyNoteTemplate });
        if (!weeklyTemplate) {
          console.error("No template found for weekly note");
          return;
        }
        console.log("Weekly note template:");
        console.log(weeklyTemplate);
        const existingNoteUuid = await findIfNoteExists(app2, weeklyTemplate.name);
        if (existingNoteUuid) {
          app2.navigate(`https://www.amplenote.com/notes/${existingNoteUuid}`);
          return;
        }
        const newNoteUuid = await createNoteFromTemplate(app2, weeklyTemplate, plugin.constants.tagsToExclude);
        app2.navigate(`https://www.amplenote.com/notes/${newNoteUuid}`);
      },
      "Open monthly note": async function(app2) {
        let monthlyTemplate = await app2.findNote({ uuid: plugin.constants.monthlyNoteTemplate });
        if (!monthlyTemplate) {
          console.error("No template found for monthly note");
          return;
        }
        console.log("Monthly note template:");
        console.log(monthlyTemplate);
        const existingNoteUuid = await findIfNoteExists(app2, monthlyTemplate.name);
        if (existingNoteUuid) {
          app2.navigate(`https://www.amplenote.com/notes/${existingNoteUuid}`);
          return;
        }
        const newNoteUuid = await createNoteFromTemplate(app2, monthlyTemplate, plugin.constants.tagsToExclude);
        app2.navigate(`https://www.amplenote.com/notes/${newNoteUuid}`);
      },
      "Open quartely note": async function(app2) {
        let quartelyTemplate = await app2.findNote({ uuid: plugin.constants.quartelyNoteTemplate });
        if (!quartelyTemplate) {
          console.error("No template found for quartely note");
          return;
        }
        console.log("Quartely note template:");
        console.log(quartelyTemplate);
        const existingNoteUuid = await findIfNoteExists(app2, quartelyTemplate.name);
        if (existingNoteUuid) {
          app2.navigate(`https://www.amplenote.com/notes/${existingNoteUuid}`);
          return;
        }
        const newNoteUuid = await createNoteFromTemplate(app2, quartelyTemplate, plugin.constants.tagsToExclude);
        app2.navigate(`https://www.amplenote.com/notes/${newNoteUuid}`);
      },
      "Open yearly note": async function(app2) {
        let yearlyTemplate = await app2.findNote({ uuid: plugin.constants.yearlyNoteTemplate });
        if (!yearlyTemplate) {
          console.error("No template found for yearly note");
          return;
        }
        console.log("Yearly note template:");
        console.log(yearlyTemplate);
        const existingNoteUuid = await findIfNoteExists(app2, yearlyTemplate.name);
        if (existingNoteUuid) {
          app2.navigate(`https://www.amplenote.com/notes/${existingNoteUuid}`);
          return;
        }
        const newNoteUuid = await createNoteFromTemplate(app2, yearlyTemplate, plugin.constants.tagsToExclude);
        app2.navigate(`https://www.amplenote.com/notes/${newNoteUuid}`);
      }
    }
  };
  var plugin_default = plugin;
  return plugin_default;
})()
