import { useState } from "react";

function AddNote({ onNoteAdded }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('simple'); // ברירת מחדל

  const noteTypes = [
    { id: 'simple', icon: 'fa-regular fa-file-lines', label: 'Text' },
    { id: 'list', icon: 'fa-solid fa-list-ul', label: 'List' },
    { id: 'image', icon: 'fa-regular fa-image', label: 'Image' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newNote = { 
      title, 
      type, 
      content: type === 'simple' ? 'Click to edit...' : '',
      items: type === 'list' ? ['New item'] : undefined,
      imageUrl: type === 'image' ? 'https://picsum.photos' : undefined
    };

    onNoteAdded(newNote);
    setTitle(''); 
  };

  return (
    <div className="add-note-container">
      <form className="add-note-form" onSubmit={handleSubmit}>
        <input 
          className="add-note-input"
          type="text" 
          placeholder="Take a note..." 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        
        <div className="type-selector">
          {noteTypes.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`type-btn ${type === t.id ? 'active' : ''}`}
              onClick={() => setType(t.id)}
              title={t.label}
            >
              <i className={t.icon}></i>
            </button>
          ))}
        </div>

        <button className="submit-note-btn" type="submit">
          <i className="fa-solid fa-plus"></i>
        </button>
      </form>
    </div>
  );
}

export default AddNote;