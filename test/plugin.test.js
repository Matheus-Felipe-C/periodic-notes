import { jest } from "@jest/globals";

jest.resetModules();

// 1️⃣ Register mocks FIRST
jest.unstable_mockModule("../lib/utils/noteTemplateService.js", () => ({
  openPeriodicNote: jest.fn(),
  createNoteFromTemplate: jest.fn(),
  findIfNoteExists: jest.fn(),
}));

jest.unstable_mockModule("../lib/utils/noteTemplateMessages.js", () => ({
  messageForNoteResult: jest.fn(),
}));

// 2️⃣ Import mocked modules
const { openPeriodicNote } = await import(
  "../lib/utils/noteTemplateService.js"
);
const { messageForNoteResult } = await import(
  "../lib/utils/noteTemplateMessages.js"
);

// 3️⃣ Import plugin AFTER mocks
const plugin = (await import("../lib/plugin.js")).default;

const { mockAppWithContent, mockPlugin } = await import(
  "./test-helpers.js"
);

describe("plugin main file", () => {
  let app;
  let pluginInstance;

  const noteCases = [
    { optionName: "Open daily note", constantKey: "dailyNoteTemplate", templateUuid: "daily-template-uuid" },
    { optionName: "Open weekly note", constantKey: "weeklyNoteTemplate", templateUuid: "weekly-template-uuid" },
    { optionName: "Open monthly note", constantKey: "monthlyNoteTemplate", templateUuid: "monthly-template-uuid" },
    { optionName: "Open quartely note", constantKey: "quartelyNoteTemplate", templateUuid: "quartely-template-uuid" },
    { optionName: "Open yearly note", constantKey: "yearlyNoteTemplate", templateUuid: "yearly-template-uuid" },
  ];

  noteCases.forEach(({ optionName, constantKey, templateUuid }) => {
    describe(`plugin main file - ${optionName}`, () => {
      beforeEach(() => {
        ({ app } = mockAppWithContent());
        pluginInstance = mockPlugin(plugin, app);

        jest.resetAllMocks();

        app.settings = {
          [plugin.constants[constantKey]]: templateUuid,
          [plugin.constants.tagsToExclude]: ["archive"],
        };
      });

      it("Navigates when service succeeds", async () => {
        openPeriodicNote.mockImplementation(async ({ app }) => {
          app.navigate("https://www.amplenote.com/notes/note-uuid");
          return { ok: true, uuid: "note-uuid" };
        });

        await pluginInstance.appOption[optionName](app);

        expect(openPeriodicNote).toHaveBeenCalledWith({
          app,
          templateUuid: app.settings[plugin.constants[constantKey]],
          tagsToExclude: app.settings[plugin.constants.tagsToExclude],
        });

        expect(app.navigate).toHaveBeenCalledWith(
          "https://www.amplenote.com/notes/note-uuid"
        );

        expect(app.alert).not.toHaveBeenCalled();
      });

      it("Alerts when template is missing", async () => {
        openPeriodicNote.mockImplementation(async () => {
          return { ok: false, error: "TEMPLATE_NOT_FOUND" };
        });

        messageForNoteResult.mockReturnValue("The template note could not be found. It may have been deleted.");

        await pluginInstance.appOption[optionName](app);

        expect(openPeriodicNote).toHaveBeenCalledWith({
          app,
          templateUuid: app.settings[plugin.constants[constantKey]],
          tagsToExclude: app.settings[plugin.constants.tagsToExclude],
        });

        expect(messageForNoteResult).toHaveBeenCalledWith({
          ok: false,
          error: "TEMPLATE_NOT_FOUND",
        });

        expect(app.alert).toHaveBeenCalledWith("The template note could not be found. It may have been deleted.");
      });
    });
  });
});
