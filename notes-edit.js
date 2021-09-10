const noteTitle = document.querySelector('#note-title');
const noteBody = document.querySelector('#note-body');
const removeNoteButton = document.querySelector('#remove-note');

const noteId = location.hash.substring(1);
const notes = getSavedNotes();

const note = notes.find((note) => {
    return note.id === noteId;
});

if (note === undefined) {
    location.assign('/index.html')
}

noteTitle.value = note.title;
noteBody.value = note.body;

noteTitle.addEventListener('input', (e) => {
    note.title = e.target.value;
    saveNotes(notes);
});

noteBody.addEventListener('input', (e) => {
    note.body = e.target.value;
    saveNotes(notes);
});

removeNoteButton.addEventListener('click', (e) => {
    removeNote(noteId);
    saveNotes(notes);
    location.assign('/index.html')
});
