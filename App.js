function App() {
  const [notes, setNotes] = React.useState([]);
  const [currentNote, setCurrentNote] = React.useState('');
  const [editingIndex, setEditingIndex] = React.useState(null);

  const addNote = () => {
    if (currentNote.trim()) {
      if (editingIndex !== null) {
        const updatedNotes = [...notes];
        updatedNotes[editingIndex] = currentNote;
        setNotes(updatedNotes);
        setEditingIndex(null);
      } else {
        setNotes([...notes, currentNote]);
      }
      setCurrentNote('');
    }
  };

  const editNote = (index) => {
    setCurrentNote(notes[index]);
    setEditingIndex(index);
  };

  const deleteNote = (index) => {
    const filteredNotes = notes.filter((_, i) => i !== index);
    setNotes(filteredNotes);
    if (editingIndex === index) {
      setCurrentNote('');
      setEditingIndex(null);
    }
  };

  return (
    <div className="container">
      <h1>📝 Simple Notepad</h1>
      
      <div className="input-section">
        <textarea
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          placeholder="Write your note here..."
          rows="4"
        />
        <button onClick={addNote} className="add-btn">
          {editingIndex !== null ? 'Update Note' : 'Add Note'}
        </button>
      </div>

      <div className="notes-section">
        <h2>Your Notes ({notes.length})</h2>
        {notes.length === 0 ? (
          <p className="empty-message">No notes yet. Add one above!</p>
        ) : (
          <div className="notes-list">
            {notes.map((note, index) => (
              <div key={index} className="note-card">
                <p>{note}</p>
                <div className="note-actions">
                  <button onClick={() => editNote(index)} className="edit-btn">
                    ✏️ Edit
                  </button>
                  <button onClick={() => deleteNote(index)} className="delete-btn">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App, null, null));