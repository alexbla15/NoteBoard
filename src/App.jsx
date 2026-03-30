import { useState, useEffect, useMemo } from 'react'
import './App.css'
import SimpleNote from './components/SimpleNote';
import AddNote from './components/AddNote';
import ListCard from './components/ListCard';
import ImageCard from './components/ImageCard';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => a.order - b.order);
  }, [notes]);

  const handlePin = async (id) => {
    fetch(`http://localhost:5001/api/notes/pin/${id}`, { method: 'PUT' });

    const updatedNotes = notes.map(n => ({
      ...n,
      order: n.id === id ? 0 : n.order + 1
    }));
    setNotes(updatedNotes);
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`http://localhost:5001/api/notes/${id}`, { method: 'DELETE' });
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const renderNote = (note) => {
    const commonProps = {
      key: note.id,
      id: note.id,
      title: note.title,
      initialColor: note.color,
      order: note.order,
      handlePin,
      onDelete: deleteNote
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
      <AddNote onNoteAdded={(newNote) => setNotes([...notes, newNote])} />
      <div className="note-board">
        {sortedNotes.map(renderNote)}
      </div>
    </div>
  );
}

export default App
