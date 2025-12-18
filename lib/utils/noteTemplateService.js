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
export async function createNoteFromTemplate(app, template, tagsToExclude) {
  const processedNoteTitle = processNoteTitle(template.name);

  //Filter out excluded tags
  const filteredTags = (template.tags || []).filter(
    tag => !tagsToExclude.includes(tag)
  );

  //Create note with filtered tags
  const newNoteUuid = await app.createNote(
    processedNoteTitle, 
    filteredTags
  );

  //Copy content from template note
  const content = await app.getNoteContent({ uuid: template.uuid });
  await app.insertNoteContent({ uuid: newNoteUuid }, content);

  return newNoteUuid;
}

export async function openPeriodicNote(app, templateSettingKey, tagsToExclude = []) {
  const template = await app.findNote({ uuid: app.settings[templateSettingKey] });

  if (!template) {
    console.error(`No template found for setting key: ${templateSettingKey}`);
    return;
  }

  const existingNoteUuid = await findIfNoteExists(app, template.name);

  if (existingNoteUuid) {
    app.navigate(`https://www.amplenote.com/notes/${existingNoteUuid}`);
    return;
  }
  
  const newNoteUuid = await createNoteFromTemplate(app, template, tagsToExclude);

  app.navigate(`https://www.amplenote.com/notes/${newNoteUuid}`);
}