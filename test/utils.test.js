import { jest } from "@jest/globals";

import * as service from "../lib/utils/noteTemplateService.js";
import { messageForNoteResult } from "../lib/utils/noteTemplateMessages.js";

describe("noteTemplateMessages", () => {
  it("returns null when ok", () => {
    expect(messageForNoteResult({ ok: true })).toBeNull();
  });

  it("returns specific messages for known reasons and a default for unknown", () => {
    expect(messageForNoteResult({ ok: false, reason: "MISSING_TEMPLATE_UUID" })).toMatch(/not configured/);
    expect(messageForNoteResult({ ok: false, reason: "TEMPLATE_NOT_FOUND" })).toMatch(/could not be found/);
    expect(messageForNoteResult({ ok: false, reason: "TEMPLATE_LOOKUP_FAILED" })).toMatch(/Could not access/);
    expect(messageForNoteResult({ ok: false, reason: "NOTE_LOOKUP_FAILED" })).toMatch(/searching for existing notes/);
    expect(messageForNoteResult({ ok: false, reason: "NOTE_CREATION_FAILED" })).toMatch(/could not be created/);
    expect(messageForNoteResult({ ok: false, reason: "SOMETHING_ELSE" })).toMatch(/unknown error/);
  });
});

describe("noteTemplateService", () => {
  describe("processNoteTitle", () => {
    it("replaces all tokens with date values", () => {
      const now = new Date();
      const input = "{{YYYY}}-{{YY}}-{{MMM}}-{{MM}}-{{M}}-{{DD}}-{{D}}-{{Q}}";

      const out = service.processNoteTitle(input);

      const yyyy = now.getFullYear().toString();
      const yy = yyyy.slice(-2);
      const mmm = now.toLocaleString("default", { month: "long" });
      const mm = now.getMonth().toString().padStart(2, "0");
      const m = now.getMonth().toString();
      const dd = now.getDate().toString().padStart(2, "0");
      const d = now.getDate().toString();
      const q = (now.getMonth() / 3 + 1).toString();

      expect(out).toContain(yyyy);
      expect(out).toContain(yy);
      expect(out).toContain(mmm);
      expect(out).toContain(mm);
      expect(out).toContain(m);
      expect(out).toContain(dd);
      expect(out).toContain(d);
      expect(out).toContain(q);
    });
  });

  describe("findIfNoteExists", () => {
    it("returns uuid when app.findNote finds a matching name", async () => {
      const app = {
        findNote: jest.fn(async ({ name }) => {
          // simulate match only when name equals processed title
          if (name === service.processNoteTitle("My-{{YYYY}}")) {
            return { uuid: "existing-uuid" };
          }
          return null;
        }),
      };

      const uuid = await service.findIfNoteExists(app, "My-{{YYYY}}");
      expect(uuid).toBe("existing-uuid");
    });

    it("returns undefined when no existing note", async () => {
      const app = { findNote: jest.fn(async () => null) };
      const uuid = await service.findIfNoteExists(app, "NoMatch-{{YYYY}}");
      expect(uuid).toBeUndefined();
    });
  });

  describe("createNoteFromTemplate", () => {
    it("creates a note with filtered tags and copies content", async () => {
      const template = { name: "T-{{YYYY}}", uuid: "tmpl-uuid", tags: ["a", "b", "c"] };

      const app = {
        createNote: jest.fn(async (title, tags) => {
          expect(title).toBe(service.processNoteTitle(template.name));
          // 'b' will be filtered out
          expect(tags).toEqual(["a", "c"]);
          return "new-uuid";
        }),
        getNoteContent: jest.fn(async ({ uuid }) => {
          expect(uuid).toBe(template.uuid);
          return "<content>";
        }),
        insertNoteContent: jest.fn(async ({ uuid }, content) => {
          expect(uuid).toBe("new-uuid");
          expect(content).toBe("<content>");
        }),
      };

      const newUuid = await service.createNoteFromTemplate(app, template, ["b"]);
      expect(newUuid).toBe("new-uuid");
      expect(app.createNote).toHaveBeenCalled();
      expect(app.getNoteContent).toHaveBeenCalled();
      expect(app.insertNoteContent).toHaveBeenCalled();
    });
  });

  describe("openPeriodicNote", () => {
    it("returns TEMPLATE_NOT_FOUND when template missing", async () => {
      const app = { settings: { myKey: "missing-uuid" }, findNote: jest.fn(async () => null) };
      const res = await service.openPeriodicNote(app, "myKey");
      expect(res).toEqual({ ok: false, reason: "TEMPLATE_NOT_FOUND" });
    });

    it("navigates to existing note when found", async () => {
      const template = { uuid: "tmpl-uuid", name: "T" };
      const app = {
        settings: { key: "tmpl-uuid" },
        findNote: jest.fn(async (query) => {
          if (query.uuid) return template; // template lookup
          if (query.name === service.processNoteTitle(template.name)) return { uuid: "existing-uuid" }; // existing note lookup
          return null;
        }),
        navigate: jest.fn(),
      };

      const res = await service.openPeriodicNote(app, "key");

      expect(res).toEqual({ ok: true, action: "NAVIGATED_EXISTING" });
      expect(app.navigate).toHaveBeenCalledWith("https://www.amplenote.com/notes/existing-uuid");
    });

    it("returns NOTE_LOOKUP_FAILED when findIfNoteExists throws", async () => {
      const template = { uuid: "tmpl-uuid", name: "T" };
      const app = {
        settings: { key: "tmpl-uuid" },
        findNote: jest.fn(async (query) => {
          if (query.uuid) return template;
          // simulate error when looking up by name
          if (query.name) throw new Error("boom");
          return null;
        }),
      };

      const res = await service.openPeriodicNote(app, "key");

      expect(res.ok).toBe(false);
      expect(res.reason).toBe("NOTE_LOOKUP_FAILED");
      expect(res.error).toBeInstanceOf(Error);
    });

    it("creates a new note when none exists", async () => {
      const template = { uuid: "tmpl-uuid", name: "T", tags: ["a"] };
      const app = {
        settings: { key: "tmpl-uuid" },
        findNote: jest.fn(async (query) => {
          if (query.uuid) return template; // template lookup
          return null; // no existing note
        }),
        createNote: jest.fn(async (title, tags) => "new-uuid"),
        getNoteContent: jest.fn(async () => "content"),
        insertNoteContent: jest.fn(async () => {}),
        navigate: jest.fn(),
      };

      const res = await service.openPeriodicNote(app, "key", ["x"]);

      expect(res).toEqual({ ok: true, action: "CREATED_NEW", uuid: "new-uuid" });
      expect(app.navigate).toHaveBeenCalledWith("https://www.amplenote.com/notes/new-uuid");
      expect(app.createNote).toHaveBeenCalled();
      expect(app.getNoteContent).toHaveBeenCalled();
      expect(app.insertNoteContent).toHaveBeenCalled();
    });
  });
});
