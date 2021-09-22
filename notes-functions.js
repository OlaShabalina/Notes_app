'use strict'

//  read existing notes from local storage

const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes');
    try {
        return notesJSON ? JSON.parse(notesJSON) : [];
    } catch (err) {
        return [];
    }
}

//  Remove a note from the list 

const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id);
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1);
    }
};


// Generate the DOM structure for a note

const generateNote = (note) => {
    const noteEl = document.createElement('div');
    const noteButton = document.createElement('button');
    const noteText = document.createElement('span');
    const noteEditLink = document.createElement('a');

    // set up the remove note button
    noteButton.textContent = 'x'
    noteEl.appendChild(noteButton);
    noteButton.addEventListener('click', () => {
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

    // setting up link to edit page

    noteEditLink.setAttribute('href', `/edit.html#${note.id}`);
    noteEditLink.textContent = 'edit';
    noteEl.appendChild(noteEditLink);

    return noteEl;
}

// Save the notes to localStorage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}


//  Sorting notes by on of the filters
const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1;
            } else if (a.updatedAt < b.updatedAt) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1;
            } else if (a.createdAt < b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'alphabetical') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        })     
    } else {
        return notes;
    }
}


// Render application notes
const renderNotes = (notes, filters) => {

    notes = sortNotes(notes, filters.sortBy);
    
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));

    document.querySelector('#notes').innerHTML = '';

    filteredNotes.forEach((note) => {
        const noteEl = generateNote(note);
        document.querySelector('#notes').appendChild(noteEl);
    });

}

// Generate the last edited message 
const generateLastEdited = (timestamp) => {
    return  `Last edited: ${moment(timestamp).fromNow()}`;
};

