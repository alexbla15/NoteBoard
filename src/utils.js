// Utility functions for localStorage operations

const NOTES_KEY = 'notes';

export const loadNotes = () => {
    try {
        const notes = localStorage.getItem(NOTES_KEY);
        return notes ? JSON.parse(notes) : [];
    } catch (error) {
        console.error('Error loading notes from localStorage:', error);
        return [];
    }
};

export const saveNotes = (notes) => {
    try {
        localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    } catch (error) {
        console.error('Error saving notes to localStorage:', error);
    }
};

export const addNote = (notes, newNote) => {
    const maxOrder = notes.length > 0 ? Math.max(...notes.map(n => n.order || 0)) : -1;
    const noteWithId = {
        ...newNote,
        id: Date.now().toString(),
        order: maxOrder + 1
    };
    const updatedNotes = [...notes, noteWithId];
    saveNotes(updatedNotes);
    return updatedNotes;
};

export const updateNote = (notes, id, updates) => {
    const updatedNotes = notes.map(note =>
        note.id === id ? { ...note, ...updates } : note
    );
    saveNotes(updatedNotes);
    return updatedNotes;
};

export const deleteNote = (notes, id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    saveNotes(updatedNotes);
    return updatedNotes;
};

export const pinNote = (notes, id) => {
    const updatedNotes = notes.map(note => ({
        ...note,
        order: note.id === id ? 0 : note.order + 1
    })).sort((a, b) => a.order - b.order);
    saveNotes(updatedNotes);
    return updatedNotes;
};