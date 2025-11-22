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
  async function findIfNoteExists(app, noteTitle) {
    const processedNoteTitle = processNoteTitle(noteTitle);
    const existingNote = await app.findNote({ name: processedNoteTitle });
    if (existingNote) {
      console.log("Note with same name exists");
      console.log(existingNote);
      return existingNote.uuid;
    }
  }
  async function createNoteFromTemplate(app, template, tagsToExclude) {
    const processedNoteTitle = processNoteTitle(template.name);
    const filteredTags = (template.tags || []).filter(
      (tag) => !tagsToExclude.includes(tag)
    );
    const newNoteUuid = await app.createNote(
      processedNoteTitle,
      filteredTags
    );
    const content = await app.getNoteContent({ uuid: template.uuid });
    await app.insertNoteContent({ uuid: newNoteUuid }, content);
    return newNoteUuid;
  }

  // lib/plugin.js
  var plugin = {
    constants: {
      dailyNoteTemplate: "Daily Note Template UUID",
      weeklyNoteTemplate: "Weekly Note Template UUID",
      monthlyNoteTemplate: "Monthly Note Template UUID",
      quartelyNoteTemplate: "Quarterly Note Template UUID",
      yearlyNoteTemplate: "Annual Note Template UUID",
      tagsToExclude: "Tags to exclude"
    },
    appOption: {
      "Open daily note": {
        async check(app) {
          let dailyTemplate = await app.findNote({ uuid: plugin.constants.dailyNoteTemplate });
          if (!dailyTemplate) {
            console.warn("No template found for daily note");
            return false;
          }
          const existingNoteUuid = await findIfNoteExists(app, dailyTemplate.name);
          if (existingNoteUuid) {
            return "Open Daily Note";
          } else {
            return "Create Daily Note";
          }
        },
        async run(app) {
          const dailyTemplate = await app.findNote({ uuid: app.settings[plugin.constants.dailyNoteTemplate] });
          if (!dailyTemplate) {
            console.error("No template found for daily note");
            return;
          }
          const existingNoteUuid = await findIfNoteExists(app, dailyTemplate.name);
          if (existingNoteUuid) {
            app.navigate(`https://www.amplenote.com/notes/${existingNoteUuid}`);
            return;
          }
          const newNoteUuid = await createNoteFromTemplate(app, dailyTemplate, app.settings["Tags to exclude"]);
          app.navigate(`https://www.amplenote.com/notes/${newNoteUuid}`);
        }
      },
      "Open weekly note": async function(app) {
        let weeklyTemplate = await app.findNote({ uuid: app.settings[plugin.constants.weeklyNoteTemplate] });
        if (!weeklyTemplate) {
          console.error("No template found for weekly note");
          return;
        }
        console.log("Weekly note template:");
        console.log(weeklyTemplate);
        const existingNoteUuid = await findIfNoteExists(app, weeklyTemplate.name);
        if (existingNoteUuid) {
          app.navigate(`https://www.amplenote.com/notes/${existingNoteUuid}`);
          return;
        }
        const newNoteUuid = await createNoteFromTemplate(app, weeklyTemplate, app.settings[plugin.constants.tagsToExclude]);
        app.navigate(`https://www.amplenote.com/notes/${newNoteUuid}`);
      },
      "Open monthly note": async function(app) {
        let monthlyTemplate = await app.findNote({ uuid: app.settings[plugin.constants.monthlyNoteTemplate] });
        if (!monthlyTemplate) {
          console.error("No template found for monthly note");
          return;
        }
        console.log("Monthly note template:");
        console.log(monthlyTemplate);
        const existingNoteUuid = await findIfNoteExists(app, monthlyTemplate.name);
        if (existingNoteUuid) {
          app.navigate(`https://www.amplenote.com/notes/${existingNoteUuid}`);
          return;
        }
        const newNoteUuid = await createNoteFromTemplate(app, monthlyTemplate, app.settings[plugin.constants.tagsToExclude]);
        app.navigate(`https://www.amplenote.com/notes/${newNoteUuid}`);
      },
      "Open quartely note": async function(app) {
        let quartelyTemplate = await app.findNote({ uuid: app.settings[plugin.constants.quartelyNoteTemplate] });
        if (!quartelyTemplate) {
          console.error("No template found for quartely note");
          return;
        }
        console.log("Quartely note template:");
        console.log(quartelyTemplate);
        const existingNoteUuid = await findIfNoteExists(app, quartelyTemplate.name);
        if (existingNoteUuid) {
          app.navigate(`https://www.amplenote.com/notes/${existingNoteUuid}`);
          return;
        }
        const newNoteUuid = await createNoteFromTemplate(app, quartelyTemplate, app.settings[plugin.constants.tagsToExclude]);
        app.navigate(`https://www.amplenote.com/notes/${newNoteUuid}`);
      },
      "Open yearly note": async function(app) {
        let yearlyTemplate = await app.findNote({ uuid: app.settings[plugin.constants.yearlyNoteTemplate] });
        if (!yearlyTemplate) {
          console.error("No template found for yearly note");
          return;
        }
        console.log("Yearly note template:");
        console.log(yearlyTemplate);
        const existingNoteUuid = await findIfNoteExists(app, yearlyTemplate.name);
        if (existingNoteUuid) {
          app.navigate(`https://www.amplenote.com/notes/${existingNoteUuid}`);
          return;
        }
        const newNoteUuid = await createNoteFromTemplate(app, yearlyTemplate, app.settings[plugin.constants.tagsToExclude]);
        app.navigate(`https://www.amplenote.com/notes/${newNoteUuid}`);
      }
    }
  };
  var plugin_default = plugin;
  return plugin_default;
})()
