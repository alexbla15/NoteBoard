import { useState, useEffect, useMemo } from 'react'
import './App.css'
import SimpleNote from './components/SimpleNote';
import AddNote from './components/AddNote';
import ListCard from './components/ListCard';
import ImageCard from './components/ImageCard';
import { loadNotes, addNote, updateNote, deleteNote, pinNote } from './utils';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadedNotes = loadNotes();
    setNotes(loadedNotes);
  }, []);

  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => a.order - b.order);
  }, [notes]);

  const handlePin = (id) => {
    const updatedNotes = pinNote(notes, id);
    setNotes(updatedNotes);
  };

  const handleDelete = (id) => {
    const updatedNotes = deleteNote(notes, id);
    setNotes(updatedNotes);
  };

  const handleAddNote = (newNote) => {
    const updatedNotes = addNote(notes, newNote);
    setNotes(updatedNotes);
  };

  const handleUpdateNote = (id, updates) => {
    const updatedNotes = updateNote(notes, id, updates);
    setNotes(updatedNotes);
  };

  const renderNote = (note) => {
    const commonProps = {
      key: note.id,
      id: note.id,
      title: note.title,
      initialColor: note.color,
      order: note.order,
      handlePin,
      onDelete: handleDelete,
      onUpdate: handleUpdateNote
    };

    switch (note.type) {
      case 'simple': return <SimpleNote {...commonProps} text={note.content} />;
      case 'list': return <ListCard {...commonProps} items={note.items} />;
      case 'image': return <ImageCard {...commonProps} url={note.imageUrl} />;
      default: return null;
    }
  };

  return (
    <div className="container">
      <AddNote onNoteAdded={handleAddNote} />
      <div className="note-board">
        {sortedNotes.map(renderNote)}
      </div>
    </div>
  );
}

export default App
