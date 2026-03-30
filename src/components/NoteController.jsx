function NoteController({ icon, initialColor = 'black', onClick }) {
    return (
        <button className='note-controller'><i className={icon} style={{ color: initialColor }}
        onClick={onClick}
        ></i></button>
    );
}

export default NoteController;