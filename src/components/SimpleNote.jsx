import { useState } from "react";
import NoteCard from "./NoteCard";
import { PASTEL_COLORS } from "../constants";

function SimpleNote({ id, title, text, initialColor = PASTEL_COLORS[0], order, onDelete, handlePin, onUpdate }) {
    const [content, setContent] = useState(text);

    const updateContent = (newContent) => {
        setContent(newContent);
        onUpdate(id, { content: newContent });
    };

    return (
        <NoteCard id={id} title={title} order={order} initialColor={initialColor} onDelete={onDelete} handlePin={handlePin} onUpdate={onUpdate}>
            <p 
                className="note-text"
                contentEditable={true}
                suppressContentEditableWarning={true}
                onBlur={(e) => {
                    const newContent = e.target.innerText;
                    updateContent(newContent);
                }}
                style={{ 
                    outline: 'none', 
                    cursor: 'text',
                    minHeight: '50px' 
                }}
            >
                {content}
            </p>
        </NoteCard>
    );
}

export default SimpleNote;
