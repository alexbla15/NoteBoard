import { useState } from "react";
import NoteCard from "./NoteCard";
import { PASTEL_COLORS } from "../constants";

function ListCard({ id, title, items: initialItems = [], initialColor = PASTEL_COLORS[1], order, onDelete, handlePin, onUpdate }) {
    const [list, setList] = useState(initialItems);
    const [newItem, setNewItem] = useState('');

    const updateItems = (newList) => {
        setList(newList);
        onUpdate(id, { items: newList });
    };

    const addItem = () => {
        if (!newItem.trim()) return;
        const newList = [...list, newItem];
        updateItems(newList);
        setNewItem('');
    };

    const deleteItem = (indexToDelete) => {
        const newList = list.filter((_, index) => index !== indexToDelete);
        updateItems(newList);
    };
    
    return (
        <NoteCard id={id} title={title}  order={order} initialColor={initialColor} onDelete={onDelete} handlePin={handlePin} onUpdate={onUpdate}>
            <div className="list-container">
                {list.map((item, index) => (
                    <div key={index} className="list-row">
                        <span className="list-bullet">•</span>
                        <span className="list-text">{item}</span>
                        <button className="delete-item-btn" onClick={() => deleteItem(index)}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                ))}

                <div className="add-item-field">
                    <input
                        type="text"
                        placeholder="Add item..."
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addItem()}
                    />
                    <button onClick={addItem}><i className="fa-solid fa-plus"></i></button>
                </div>
            </div>
        </NoteCard>
    );
}

export default ListCard;