import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './NoteApp.css'; 

function NoteApp() {
    const url = "http://localhost:8080/api/note";
    const [data, setData] = useState({
        title: "",
        date: new Date().toISOString().split('T')[0],
        note: ""
    });
    const [notes, setNotes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [showDropdown, setShowDropdown] = useState(null);
    
    const colors = ["#EF476F", "#F78C6B", "#FFD166", "#06D6A0", "#118AB2", "#073B4C"];

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await Axios.get(`${url}/getAllNotes`);
            setNotes(response.data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    const handleChange = (value) => {
        setData((prevData) => ({ ...prevData, note: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingNoteId) {
                await Axios.put(`${url}/putNoteDetails/${editingNoteId}`, data);
            } else {
                await Axios.post(`${url}/postnoterecord`, data);
            }
            await fetchNotes();
            resetForm();
            setShowForm(false);
        } catch (error) {
            console.error("Error saving note:", error);
            alert("Error saving note.");
        }
    };
    
    const resetForm = () => {
        setData({
            title: "",
            date: new Date().toISOString().split('T')[0],
            note: ""
        });
        setEditingNoteId(null);
    };

    const handleEdit = (note) => {
        setData({
            title: note.title,
            date: note.date.split('T')[0],
            note: note.note
        });
        setEditingNoteId(note.noteId);
        setShowForm(true);
        setShowDropdown(null);
    };

    const handleDelete = async (noteId) => {
        try {
            await Axios.delete(`${url}/deleteNoteDetails/${noteId}`);
            fetchNotes();
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    const handleDropdownToggle = (noteId) => {
        setShowDropdown(showDropdown === noteId ? null : noteId);
    };

    const toggleForm = () => {
        setShowForm(!showForm);
        resetForm();
    };

    return (
        <div className="app-content">
            <div className="folder-container">
                <div className="folder-header">
                    <button id="back-button" onClick={() => setShowForm(false)}>←</button>
                    <div className="folder-title">Folder 1</div>
                    <small className="note-count">{notes.length} notes</small>
                    <div className="folder-actions">
                        <button id="add-button" onClick={toggleForm}>+</button>
                        <button id="filter-button">🔍</button>
                    </div>
                </div>

                {showForm && (
                    <div className="form-container">
                        <form onSubmit={handleSubmit} className="note-form">
                            <div className="form-header">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Title"
                                    value={data.title}
                                    onChange={(e) => setData({ ...data, title: e.target.value })}
                                    required
                                    className="form-title"
                                />
                                <button type="submit" className="save-button">
                                    {editingNoteId ? "Save Changes" : "Save"}
                                </button>
                            </div>
                            <input
                                type="date"
                                name="date"
                                value={data.date}
                                onChange={(e) => setData({ ...data, date: e.target.value })}
                                required
                                className="form-date"
                            />
                            <ReactQuill
                                value={data.note}
                                onChange={handleChange}
                                placeholder="Write your notes here..."
                                theme="snow"
                                modules={{
                                    toolbar: [
                                        [{ 'font': [] }, { 'list': 'ordered' }, { 'list': 'bullet' }],
                                        ['bold', 'italic', 'underline'],
                                        [{ 'color': [] }, { 'background': [] }],
                                        [{ 'header': '1' }, { 'header': '2' }],
                                        ['link', 'image'],
                                    ],
                                }}
                            />
                        </form>
                    </div>
                )}

                <div className="notes-list">
                    {!showForm && notes.map((note, index) => (
                        <div 
                            className="note-card"
                            style={{ backgroundColor: colors[index % colors.length] }}
                            key={note.noteId}
                        >
                            <div>
                                <div className="note-title">{note.title}</div>
                                <div className="note-text">
                                    {new Date(note.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </div>
                                <div className="note-content" dangerouslySetInnerHTML={{ __html: note.note }} />
                            </div>
                            <div className="menu-icon" onClick={() => handleDropdownToggle(note.noteId)}>⋮</div>
                            {showDropdown === note.noteId && (
                                <div className="dropdown">
                                    <button onClick={() => handleEdit(note)}>Edit</button>
                                    <button onClick={() => handleDelete(note.noteId)}>Delete</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NoteApp;
