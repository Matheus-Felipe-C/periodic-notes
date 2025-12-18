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
      return openPeriodicNote({
        app, 
        templateUuid: app.settings[plugin.constants.dailyNoteTemplate], 
        tagsToExclude: app.settings[plugin.constants.tagsToExclude]
      });
    },

    "Open weekly note": async function (app) {
      return openPeriodicNote({
        app, 
        templateUuid: app.settings[plugin.constants.weeklyNoteTemplate], 
        tagsToExclude: app.settings[plugin.constants.tagsToExclude]
      });
    },

    "Open monthly note": async function (app) {
      return openPeriodicNote({
        app, 
        templateUuid: app.settings[plugin.constants.monthlyNoteTemplate], 
        tagsToExclude: app.settings[plugin.constants.tagsToExclude]
      });
    },

    "Open quartely note": async function (app) {
      return openPeriodicNote({
        app, 
        templateUuid: app.settings[plugin.constants.quartelyNoteTemplate], 
        tagsToExclude: app.settings[plugin.constants.tagsToExclude]
      });
    },

    "Open yearly note": async function (app) {
      return openPeriodicNote({
        app, 
        templateUuid: app.settings[plugin.constants.yearlyNoteTemplate], 
        tagsToExclude: app.settings[plugin.constants.tagsToExclude]
      });
    }
  },
};
export default plugin;
