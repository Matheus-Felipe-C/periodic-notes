export function processNoteTitle(noteTitle) {
  //Full Year
  noteTitle = noteTitle.replace(/{{YYYY}}/g, (/* @__PURE__ */ new Date()).getFullYear().toString());
  //Only last two digits of the year
  noteTitle = noteTitle.replace(/{{YY}}/g, (/* @__PURE__ */ new Date()).getFullYear().toString().slice(-2));
  //Full month
  noteTitle = noteTitle.replace(/{{MMM}}/g, (/* @__PURE__ */ new Date()).toLocaleString("default", { month: "long" }));
  //Month number + 0 pad if under 10
  noteTitle = noteTitle.replace(/{{MM}}/g, (/* @__PURE__ */ new Date()).getMonth().toString().padStart(2, "0"));
  //Month number without padding
  noteTitle = noteTitle.replace(/{{M}}/g, (/* @__PURE__ */ new Date()).getMonth().toString());
  //Day number + 0 pad if under 10
  noteTitle = noteTitle.replace(/{{DD}}/g, (/* @__PURE__ */ new Date()).getDate().toString().padStart(2, "0"));
  //Day number without padding
  noteTitle = noteTitle.replace(/{{D}}/g, (/* @__PURE__ */ new Date()).getDate().toString());
  //Quarter number
  noteTitle = noteTitle.replace(/{{[Q]}}/g, (/* @__PURE__ */ new Date()).getMonth() / 3 + 1).toString();
  
  return noteTitle;
}

// Verify if note with same name exists
export async function findIfNoteExists(app, noteTitle) {
  const processedNoteTitle = processNoteTitle(noteTitle);
  const existingNote = await app.findNote({ name: processedNoteTitle });
  if (existingNote) {
    console.log('Note with same name exists');
    console.log(existingNote);

    return existingNote.uuid;
  }
}

// Create new note with content from template
export async function createNoteFromTemplate(app, template) {
  const processedNoteTitle = processNoteTitle(template.name);
  const newNoteUuid = await app.createNote(processedNoteTitle, template.tags);
  const content = await app.getNoteContent({ uuid: template.uuid });

  await app.insertNoteContent({ uuid: newNoteUuid }, content);

  return newNoteUuid;
}