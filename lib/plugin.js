import { messageForNoteResult } from "./utils/noteTemplateMessages.js";
import { createNoteFromTemplate, openPeriodicNote, findIfNoteExists } from "./utils/noteTemplateService.js";

const plugin = {
  constants: {
    dailyNoteTemplate: "dailyNoteTemplate",
    weeklyNoteTemplate: "weeklyNoteTemplate",
    monthlyNoteTemplate: "monthlyNoteTemplate",
    quartelyNoteTemplate: "quartelyNoteTemplate",
    yearlyNoteTemplate: "yearlyNoteTemplate",
    tagsToExclude: "tagsToExclude"
  },

  appOption: {
    "Open daily note": async function (app) {
      const result = await openPeriodicNote({
        app, 
        templateUuid: app.settings[plugin.constants.dailyNoteTemplate], 
        tagsToExclude: app.settings[plugin.constants.tagsToExclude]
      });

      const message = messageForNoteResult(result);

      if (message) {
        app.alert(message);
      }
    },

    "Open weekly note": async function (app) {
      const result = await openPeriodicNote({
        app, 
        templateUuid: app.settings[plugin.constants.weeklyNoteTemplate], 
        tagsToExclude: app.settings[plugin.constants.tagsToExclude]
      });

      const message = messageForNoteResult(result);

      if (message) {
        app.alert(message);
      }
    },

    "Open monthly note": async function (app) {
      const result = await openPeriodicNote({
        app, 
        templateUuid: app.settings[plugin.constants.monthlyNoteTemplate], 
        tagsToExclude: app.settings[plugin.constants.tagsToExclude]
      });

      const message = messageForNoteResult(result);

      if (message) {
        app.alert(message);
      }
    },

    "Open quartely note": async function (app) {
      const result = await openPeriodicNote({
        app, 
        templateUuid: app.settings[plugin.constants.quartelyNoteTemplate], 
        tagsToExclude: app.settings[plugin.constants.tagsToExclude]
      });

      const message = messageForNoteResult(result);

      if (message) {
        app.alert(message);
      }
    },

    "Open yearly note": async function (app) {
      const result = await openPeriodicNote({
        app, 
        templateUuid: app.settings[plugin.constants.yearlyNoteTemplate], 
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
