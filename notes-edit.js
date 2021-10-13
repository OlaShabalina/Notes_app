'use strict'

const noteTitle = document.querySelector('#note-title');
const noteBody = document.querySelector('#note-body');
const removeNoteButton = document.querySelector('#remove-note');
const lastEdited = document.querySelector('#last-edited');

const noteId = location.hash.substring(1);
let notes = getSavedNotes();

let note = notes.find((note) => note.id === noteId);

if (!note) {
    location.assign('/Notes_app/index')
}

noteTitle.value = note.title;
noteBody.value = note.body;
lastEdited.textContent = generateLastEdited(note.updatedAt);

noteTitle.addEventListener('input', (e) => {
    note.title = e.target.value;
    note.updatedAt = moment().valueOf();
    lastEdited.textContent = generateLastEdited(note.updatedAt);
    saveNotes(notes);
});

noteBody.addEventListener('input', (e) => {
    note.body = e.target.value;
    note.updatedAt = moment().valueOf();
    lastEdited.textContent = generateLastEdited(note.updatedAt);
    saveNotes(notes);
});

removeNoteButton.addEventListener('click', (e) => {
    removeNote(noteId);
    saveNotes(notes);
    location.assign('/Notes_app/index')
});

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue);
        note = notes.find((note) => note.id === noteId)
    };

    if (!note) {
        location.assign('/Notes_app/index');
    };

    noteTitle.value = note.title;
    noteBody.value = note.body;
})