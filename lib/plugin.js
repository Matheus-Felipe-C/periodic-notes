import { createNoteFromTemplate } from "./utils/processNoteTitle.js";
import { processNoteTitle, findIfNoteExists } from "./utils/processNoteTitle.js";

const plugin = {
  constants: {
    weeklyNoteTemplate: "625d7b86-b0dc-11f0-a9f1-79905b0dfa73",
  },

  appOption: {
    "Open weekly note": async function(app) {
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

  },
};
export default plugin;
