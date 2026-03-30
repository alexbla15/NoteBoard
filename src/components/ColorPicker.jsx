import { PASTEL_COLORS } from "../constants";

function ColorPicker({ id, onColorChange, currentColor, isOpen, setIsOpen }) {
    const updateColor = (newColor) => {
        // 1. update the state
        onColorChange(newColor);
        setIsOpen(false);
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