import { PASTEL_COLORS } from "../constants";

function ColorPicker({ id, onColorChange, currentColor, isOpen, setIsOpen }) {
    const updateColor = async (newColor) => {
        // 1. update the state
        onColorChange(newColor);
        setIsOpen(false);

        // 2. update the file
        try {
            await fetch(`http://localhost:5001/api/notes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ color: newColor })
            });
        } catch (error) {
            console.error("Failed to sync with server:", error);
        }
    };

    return (
        <div className="color-picker-inline">
            <button className="note-controller" onClick={() => setIsOpen(!isOpen)}>
                <i className={isOpen ? "fa-solid fa-xmark" : "fa-solid fa-palette"}
                    style={{ color: isOpen ? 'red' : currentColor }}></i>
            </button>

            {isOpen && (
                <div className="palette-inline">
                    {PASTEL_COLORS.map(color => (
                        <div className="palette-color"
                            key={color}
                            onClick={() => updateColor(color)}
                            style={{backgroundColor: color}}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ColorPicker;