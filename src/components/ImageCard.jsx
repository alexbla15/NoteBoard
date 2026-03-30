import { useState } from "react";
import NoteCard from "./NoteCard";
import { PASTEL_COLORS } from "../constants";

function ImageCard({ id, title, url, initialColor = PASTEL_COLORS[2], order, onDelete, handlePin}) {
    const [currentUrl, setCurrentUrl] = useState(url);
    const [isEditing, setIsEditing] = useState(false);
    const [tempUrl, setTempUrl] = useState(url);

    const saveUrl = async () => {
        setCurrentUrl(tempUrl);
        setIsEditing(false);

        try {
            await fetch(`http://localhost:5001/api/notes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageUrl: tempUrl })
            });
        } catch (err) {
            console.error("Failed to update image:", err);
        }
    };

    return (
        <NoteCard id={id} title={title} order={order} initialColor={initialColor} onDelete={onDelete} handlePin={handlePin}>
            <div className="image-card-body">
                {isEditing ? (
                    <div className="url-edit-mode">
                        <input
                            type="text"
                            value={tempUrl}
                            onChange={(e) => setTempUrl(e.target.value)}
                            placeholder="Paste image URL..."
                            autoFocus
                        />
                        <button onClick={saveUrl}><i className="fa-solid fa-check"></i></button>
                    </div>
                ) : (
                    <div className="image-display-mode" onClick={() => setIsEditing(true)}>
                        <img src={currentUrl} alt={title} className="note-image" />
                        <div className="image-overlay"><i className="fa-solid fa-pen"></i> Edit URL</div>
                    </div>
                )}
            </div>
        </NoteCard>
    );
}

export default ImageCard;