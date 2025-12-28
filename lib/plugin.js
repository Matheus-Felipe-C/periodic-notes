import { messageForNoteResult } from "./utils/noteTemplateMessages.js";
import { createNoteFromTemplate, openPeriodicNote, findIfNoteExists } from "./utils/noteTemplateService.js";

const plugin = {
  constants: {
    dailyNoteTemplate: "Daily Note Template UUID",
    weeklyNoteTemplate: "Weekly Note Template UUID",
    monthlyNoteTemplate: "Monthly Note Template UUID",
    quartelyNoteTemplate: "Quarterly Note Template UUID",
    yearlyNoteTemplate: "Yearly Note Template UUID",
    tagsToExclude: "Tags To Exclude"
  },

  appOption: {
    "Open daily note": async function (app) {
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

    "Open weekly note": async function (app) {
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

    "Open monthly note": async function (app) {
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

    "Open quartely note": async function (app) {
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

    "Open yearly note": async function (app) {
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
  },
};
export default plugin;
