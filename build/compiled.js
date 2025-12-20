(() => {
  // lib/utils/noteTemplateMessages.js
  function messageForNoteResult(result) {
    if (result.ok) return null;
    switch (result.reason) {
      case "MISSING_TEMPLATE_UUID":
        return "This note command is not configured. Please select a template in settings.";
      case "TEMPLATE_NOT_FOUND":
        return "The template note could not be found. It may have been deleted.";
      case "TEMPLATE_LOOKUP_FAILED":
        return "Could not access your notes. Please try again later.";
      case "NOTE_LOOKUP_FAILED":
        return "Something went wrong while searching for existing notes.";
      case "NOTE_CREATION_FAILED":
        return "The note could not be created. Please check your permissions.";
      default:
        return "An unknown error occurred.";
    }
  }

  // lib/utils/noteTemplateService.js
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
  async function openPeriodicNote(app, templateSettingKey, tagsToExclude = []) {
    const template = await app.findNote({ uuid: app.settings[templateSettingKey] });
    if (!template) {
      return { ok: false, reason: "TEMPLATE_NOT_FOUND" };
    }
    try {
      const existingNoteUuid = await findIfNoteExists(app, template.name);
      if (existingNoteUuid) {
        app.navigate(`https://www.amplenote.com/notes/${existingNoteUuid}`);
        return { ok: true, action: "NAVIGATED_EXISTING" };
      }
    } catch (err) {
      console.error("Error while looking for existing note:", err);
      return { ok: false, reason: "NOTE_LOOKUP_FAILED", error: err };
    }
    const newNoteUuid = await createNoteFromTemplate(app, template, tagsToExclude);
    app.navigate(`https://www.amplenote.com/notes/${newNoteUuid}`);
    return { ok: true, action: "CREATED_NEW", uuid: newNoteUuid };
  }

  // lib/plugin.js
  var plugin = {
    constants: {
      dailyNoteTemplate: "dailyNoteTemplate",
      weeklyNoteTemplate: "weeklyNoteTemplate",
      monthlyNoteTemplate: "monthlyNoteTemplate",
      quartelyNoteTemplate: "quartelyNoteTemplate",
      yearlyNoteTemplate: "yearlyNoteTemplate",
      tagsToExclude: "tagsToExclude"
    },
    appOption: {
      "Open daily note": async function(app) {
        const templateUuid = app.settings[plugin.constants.dailyNoteTemplate];
        if (!templateUuid) {
          app.alert("Daily note template is not configured. Please select a template in plugin settings.");
          return;
        }
        const result = await openPeriodicNote({
          app,
          templateUuid,
          tagsToExclude: app.settings[plugin.constants.tagsToExclude]
        });
        const message = messageForNoteResult(result);
        if (message) {
          app.alert(message);
        }
      },
      "Open weekly note": async function(app) {
        const templateUuid = app.settings[plugin.constants.weeklyNoteTemplate];
        if (!templateUuid) {
          app.alert("Weekly note template is not configured. Please select a template in plugin settings.");
          return;
        }
        const result = await openPeriodicNote({
          app,
          templateUuid,
          tagsToExclude: app.settings[plugin.constants.tagsToExclude]
        });
        const message = messageForNoteResult(result);
        if (message) {
          app.alert(message);
        }
      },
      "Open monthly note": async function(app) {
        const templateUuid = app.settings[plugin.constants.monthlyNoteTemplate];
        if (!templateUuid) {
          app.alert("Monthly note template is not configured. Please select a template in plugin settings.");
          return;
        }
        const result = await openPeriodicNote({
          app,
          templateUuid,
          tagsToExclude: app.settings[plugin.constants.tagsToExclude]
        });
        const message = messageForNoteResult(result);
        if (message) {
          app.alert(message);
        }
      },
      "Open quartely note": async function(app) {
        const templateUuid = app.settings[plugin.constants.quartelyNoteTemplate];
        if (!templateUuid) {
          app.alert("Quartely note template is not configured. Please select a template in plugin settings.");
          return;
        }
        const result = await openPeriodicNote({
          app,
          templateUuid,
          tagsToExclude: app.settings[plugin.constants.tagsToExclude]
        });
        const message = messageForNoteResult(result);
        if (message) {
          app.alert(message);
        }
      },
      "Open yearly note": async function(app) {
        const templateUuid = app.settings[plugin.constants.yearlyNoteTemplate];
        if (!templateUuid) {
          app.alert("Yearly note template is not configured. Please select a template in plugin settings.");
          return;
        }
        const result = await openPeriodicNote({
          app,
          templateUuid,
          tagsToExclude: app.settings[plugin.constants.tagsToExclude]
        });
        const message = messageForNoteResult(result);
        if (message) {
          app.alert(message);
        }
      }
    }
  };
  var plugin_default = plugin;
  return plugin_default;
})()
