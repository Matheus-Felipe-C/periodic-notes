import { createNoteFromTemplate } from "./utils/processNoteTitle.js";
import { findIfNoteExists } from "./utils/processNoteTitle.js";

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
       const dailyTemplate = await app.findNote({ uuid: app.settings[plugin.constants.dailyNoteTemplate] });

        if (!dailyTemplate) {
          console.error("No template found for daily note");
          return;
        }

        const existingNoteUuid = await findIfNoteExists(app, dailyTemplate.name);

        //Second check to ensure that the note does exist
        if (existingNoteUuid) {
          app.navigate(`https://www.amplenote.com/notes/${existingNoteUuid}`);
          return;
        }

        //If it doesn't, create a new note
        const newNoteUuid = await createNoteFromTemplate(app, dailyTemplate, app.settings["Tags to exclude"]);
        app.navigate(`https://www.amplenote.com/notes/${newNoteUuid}`);
    },

    "Open weekly note": async function (app) {
      let weeklyTemplate = await app.findNote({ uuid: app.settings[plugin.constants.weeklyNoteTemplate] });

      if (!weeklyTemplate) {
        console.error("No template found for weekly note");
        return;
      }

      console.log('Weekly note template:');
      console.log(weeklyTemplate);

      const existingNoteUuid = await findIfNoteExists(app, weeklyTemplate.name);

      if (existingNoteUuid) {
        app.navigate(`https://www.amplenote.com/notes/${existingNoteUuid}`);
        return;
      }

      const newNoteUuid = await createNoteFromTemplate(app, weeklyTemplate, app.settings[plugin.constants.tagsToExclude] );

      app.navigate(`https://www.amplenote.com/notes/${newNoteUuid}`);
    },

    "Open monthly note": async function (app) {
      let monthlyTemplate = await app.findNote({ uuid: app.settings[plugin.constants.monthlyNoteTemplate] });

      if (!monthlyTemplate) {
        console.error("No template found for monthly note");
        return;
      }

      console.log('Monthly note template:');
      console.log(monthlyTemplate);

      const existingNoteUuid = await findIfNoteExists(app, monthlyTemplate.name);

      if (existingNoteUuid) {
        app.navigate(`https://www.amplenote.com/notes/${existingNoteUuid}`);
        return;
      }

      const newNoteUuid = await createNoteFromTemplate(app, monthlyTemplate, app.settings[plugin.constants.tagsToExclude]);

      app.navigate(`https://www.amplenote.com/notes/${newNoteUuid}`);
    },

    "Open quartely note": async function (app) {
      let quartelyTemplate = await app.findNote({ uuid: app.settings[plugin.constants.quartelyNoteTemplate] });

      if (!quartelyTemplate) {
        console.error("No template found for quartely note");
        return;
      }

      console.log('Quartely note template:');
      console.log(quartelyTemplate);

      const existingNoteUuid = await findIfNoteExists(app, quartelyTemplate.name);

      if (existingNoteUuid) {
        app.navigate(`https://www.amplenote.com/notes/${existingNoteUuid}`);
        return;
      }

      const newNoteUuid = await createNoteFromTemplate(app, quartelyTemplate, app.settings[plugin.constants.tagsToExclude]);

      app.navigate(`https://www.amplenote.com/notes/${newNoteUuid}`);
    },

    "Open yearly note": async function (app) {
      let yearlyTemplate = await app.findNote({ uuid: app.settings[plugin.constants.yearlyNoteTemplate] });

      if (!yearlyTemplate) {
        console.error("No template found for yearly note");
        return;
      }

      console.log('Yearly note template:');
      console.log(yearlyTemplate);

      const existingNoteUuid = await findIfNoteExists(app, yearlyTemplate.name);

      if (existingNoteUuid) {
        app.navigate(`https://www.amplenote.com/notes/${existingNoteUuid}`);
        return;
      }

      const newNoteUuid = await createNoteFromTemplate(app, yearlyTemplate, app.settings[plugin.constants.tagsToExclude]);

      app.navigate(`https://www.amplenote.com/notes/${newNoteUuid}`);
    }
  },
};
export default plugin;
