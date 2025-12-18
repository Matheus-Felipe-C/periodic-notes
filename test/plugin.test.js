import { jest } from "@jest/globals";
import { mockAppWithContent, mockPlugin } from "./test-helpers.js";

let processNoteTitle;
await jest.unstable_mockModule("../lib/utils/processNoteTitle.js", () => ({
  findIfNoteExists: jest.fn(),
  createNoteFromTemplate: jest.fn(),
}));

const { default: plugin } = await import("../lib/plugin.js");
processNoteTitle = await import("../lib/utils/noteTemplateService.js");
const { createNoteFromTemplate, findIfNoteExists } = processNoteTitle;

// --------------------------------------------------------------------------------------
const NOTE_CASES = [
  {
    label: "Daily",
    command: "Open daily note",
    templateName: "Daily Note",
    newUuid: "new-daily-uuid",
  },
  {
    label: "Weekly",
    command: "Open weekly note",
    templateName: "Weekly Note",
    newUuid: "new-weekly-uuid",
  },
  {
    label: "Monthly",
    command: "Open monthly note",
    templateName: "Monthly Note",
    newUuid: "new-monthly-uuid",
  },
];

// --------------------------------------------------------------------------------------

describe("Amplenote plugin - note creation", () => {
  let plugin;

  beforeEach(() => {
    plugin = mockPlugin();
    jest.clearAllMocks();
  });

  describe.each(NOTE_CASES)(
    "$label note",
    ({ command, templateName, newUuid }) => {

      it("navigates to existing note if it already exists", async () => {
        const { app } = mockAppWithContent("");

        app.findNote.mockResolvedValue({
          uuid: "template-uuid",
          name: templateName,
        });

        findIfNoteExists.mockResolvedValue("existing-note-uuid");

        await plugin.appOption[command](app);

        expect(app.navigate).toHaveBeenCalledWith(
          "https://www.amplenote.com/notes/existing-note-uuid"
        );
      });

      it("creates and navigates to a new note when none exists", async () => {
        const { app } = mockAppWithContent("");

        app.findNote.mockResolvedValue({
          uuid: "template-uuid",
          name: templateName,
        });

        findIfNoteExists.mockResolvedValue(null);
        createNoteFromTemplate.mockResolvedValue(newUuid);

        await plugin.appOption[command](app);

        expect(createNoteFromTemplate).toHaveBeenCalled();
        expect(app.navigate).toHaveBeenCalledWith(
          `https://www.amplenote.com/notes/${newUuid}`
        );
      });
    }
  );
});
