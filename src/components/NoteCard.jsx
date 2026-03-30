import { useState } from "react";
import NoteController from "./NoteController";
import ColorPicker from "./ColorPicker";
import { PASTEL_COLORS } from "../constants";

function NoteCard({ id, title, children, initialColor = PASTEL_COLORS[3], order, onDelete, handlePin, onUpdate }) {
    const [bgColor, setBgColor] = useState(initialColor);
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [currentTitle, setCurrentTitle] = useState(title);

    const updateTitle = (newTitle) => {
        setCurrentTitle(newTitle);
        onUpdate(id, { title: newTitle });
    };

    const updateColor = (color) => {
        setBgColor(color);
        onUpdate(id, { color });
    };

    return (
        <div className="note" style={{ backgroundColor: bgColor }}>
            <h3
                className='note-title'
                contentEditable={true}
                suppressContentEditableWarning={true}
                onBlur={(e) => {
                    const newTitle = e.target.innerText;
                    updateTitle(newTitle);
                }}
                style={{ outline: 'none', cursor: 'text' }}
            >{currentTitle}</h3>
            <div className="note-content">
                {children}
            </div>
            <div className='note-controllers'>
                {!isPickerOpen && (
                    <>
                        <NoteController
                            icon='fa-solid fa-thumbtack'
                            onClick={() => handlePin(id)}
                            initialColor={order === 0 ? initialColor : 'black'}
                        />
                        <NoteController icon='fa-solid fa-trash' onClick={() => onDelete(id)} />
                    </>
                )}
                <ColorPicker id={id} currentColor={bgColor} isOpen={isPickerOpen}
                    setIsOpen={setIsPickerOpen} onColorChange={updateColor} />
            </div>
        </div>
    );
}

export default NoteCard;