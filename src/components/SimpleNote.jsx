import { useState } from "react";
import NoteCard from "./NoteCard";
import { PASTEL_COLORS } from "../constants";

function SimpleNote({ id, title, text, initialColor = PASTEL_COLORS[0], order, onDelete, handlePin }) {
    const [content, setContent] = useState(text);

    const updateContentOnServer = async (newContent) => {
        try {
            await fetch(`http://localhost:5001/api/notes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newContent }) // שים לב שהשרת שלך מצפה ל-content
            });
        } catch (err) {
            console.error("Failed to update content:", err);
        }
    };

    return (
        <NoteCard id={id} title={title} order={order} initialColor={initialColor} onDelete={onDelete} handlePin={handlePin}>
            <p 
                className="note-text"
                contentEditable={true}
                suppressContentEditableWarning={true}
                onBlur={(e) => {
                    const newContent = e.target.innerText;
                    setContent(newContent);
                    updateContentOnServer(newContent);
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
