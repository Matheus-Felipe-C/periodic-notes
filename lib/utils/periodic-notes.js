export async function createNote(app, noteTitle) {
    const note = await app.createNote({ title: noteTitle });
    return note;
}