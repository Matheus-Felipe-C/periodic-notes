import { createNoteFromTemplate, openPeriodicNote, findIfNoteExists } from "./utils/noteTemplateService.js";

const plugin = {
  constants: {
    dailyNoteTemplate: "Daily Note Template UUID",
    weeklyNoteTemplate: "Weekly Note Template UUID",
    monthlyNoteTemplate: "Monthly Note Template UUID",
    quartelyNoteTemplate: "Quarterly Note Template UUID",
    yearlyNoteTemplate: "Annual Note Template UUID",
    tagsToExclude: "Tags to exclude"
  },

  appOption: {
    "Open daily note": async function (app) {
      return openPeriodicNote(app, plugin.constants.dailyNoteTemplate, app.settings[plugin.constants.tagsToExclude]);
    },

    "Open weekly note": async function (app) {
      return openPeriodicNote(app, plugin.constants.weeklyNoteTemplate, app.settings[plugin.constants.tagsToExclude]);
    },

    "Open monthly note": async function (app) {
      return openPeriodicNote(app, plugin.constants.monthlyNoteTemplate, app.settings[plugin.constants.tagsToExclude]);
    },

    "Open quartely note": async function (app) {
      return openPeriodicNote(app, plugin.constants.quartelyNoteTemplate, app.settings[plugin.constants.tagsToExclude]);
    },

    "Open yearly note": async function (app) {
      return openPeriodicNote(app, plugin.constants.yearlyNoteTemplate, app.settings[plugin.constants.tagsToExclude]);
    }
  },
};
export default plugin;
