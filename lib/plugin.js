import { createNoteFromTemplate } from "./utils/processNoteTitle.js";
import { findIfNoteExists } from "./utils/processNoteTitle.js";

const plugin = {
  constants: {
    dailyNoteTemplate: "",
    weeklyNoteTemplate: "625d7b86-b0dc-11f0-a9f1-79905b0dfa73",
    monthlyNoteTemplate: "",
    quartelyNoteTemplate: "",
    yearlyNoteTemplate: "",
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
        const dailyTemplate = await app.findNote({ uuid: plugin.constants.dailyNoteTemplate });

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
        const newNoteUuid = await createNoteFromTemplate(app, dailyTemplate);
        app.navigate(`https://www.amplenote.com/notes/${newNoteUuid}`);
      }
    },

    "Open weekly note": async function (app) {
      let weeklyTemplate = await app.findNote({ uuid: plugin.constants.weeklyNoteTemplate });

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

      const newNoteUuid = await createNoteFromTemplate(app, weeklyTemplate);

      app.navigate(`https://www.amplenote.com/notes/${newNoteUuid}`);
    },

    "Open monthly note": async function (app) {
      let monthlyTemplate = await app.findNote({ uuid: plugin.constants.monthlyNoteTemplate });

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

      const newNoteUuid = await createNoteFromTemplate(app, monthlyTemplate);

      app.navigate(`https://www.amplenote.com/notes/${newNoteUuid}`);
    },

    "Open quartely note": async function (app) {
      let quartelyTemplate = await app.findNote({ uuid: plugin.constants.quartelyNoteTemplate });

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

      const newNoteUuid = await createNoteFromTemplate(app, quartelyTemplate);

      app.navigate(`https://www.amplenote.com/notes/${newNoteUuid}`);
    },

    "Open yearly note": async function (app) {
      let yearlyTemplate = await app.findNote({ uuid: plugin.constants.yearlyNoteTemplate });

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

      const newNoteUuid = await createNoteFromTemplate(app, yearlyTemplate);

      app.navigate(`https://www.amplenote.com/notes/${newNoteUuid}`);
    }
  },
};
export default plugin;
