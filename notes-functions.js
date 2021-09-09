//  read existing notes from local storage

const getSavedNotes = function () {
    const notesJSON = localStorage.getItem('notes')

    if (notesJSON !== null) {
        return JSON.parse(notesJSON)
    } else {
        return []
    }
}

//  Remove a note from the list 

const removeNote = function (id) {
    const noteIndex = notes.findIndex((note) => {
        return note.id === id;
    });
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1);
    }
};


// Generate the DOM structure for a note

const generateNote = function (note) {
    const noteEl = document.createElement('div');
    const noteButton = document.createElement('button');
    const noteText = document.createElement('span');

    // set up the remove note button
    noteButton.textContent = 'x'
    noteEl.appendChild(noteButton);
    noteButton.addEventListener('click', function() {
        removeNote(note.id);
        saveNotes();
        renderNotes(notes, filters);
    })

    // set up the note title text
    if (note.title.length > 0) {
        noteText.textContent = note.title;
    } else {
        noteText.textContent = "Unnamed note";
    };

    noteEl.appendChild(noteText);

    return noteEl;
}

// Save the notes to localStorage
const saveNotes = function (notes) {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Render application notes

const renderNotes = function (notes, filters) {
    
    const filteredNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    });

    document.querySelector('#notes').innerHTML = '';

    filteredNotes.forEach((note) => {
        const noteEl = generateNote(note);
        document.querySelector('#notes').appendChild(noteEl);
    });

}