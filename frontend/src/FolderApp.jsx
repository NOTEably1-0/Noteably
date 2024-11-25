import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import MoreVertIcon from '@mui/icons-material/MoreVert';
<<<<<<< HEAD:frontend/src/FolderApp.jsx
import { useNavigate } from 'react-router-dom';
import './FolderApp.css';
=======
import { useNavigate } from 'react-router-dom';  // Add React Router's navigate hook
import './FolderApp.css'; // Import CSS for custom styles
>>>>>>> parent of c4fd8db (Merge branch 'main' of https://github.com/NOTEably1-0/Noteably):frontend/noteably/src/FolderApp.jsx

function FolderApp() {
    const url = "http://localhost:8080/api/folders";
    const navigate = useNavigate();

    const [data, setData] = useState({
        folderId: "",
        title: "",
        dashboardId: 1
    });
    const [folders, setFolders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        fetchFolders();
    }, [navigate]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchFolders = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await Axios.get(`${url}/getAllFolders`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setFolders(res.data);
        } catch (error) {
            console.error("Error fetching folders:", error);
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };

            if (data.folderId) {
                await Axios.put(`${url}/putFolderDetails/${data.folderId}`, data, { headers });
            } else {
                await Axios.post(`${url}/postFolderRecord`, data, { headers });
            }

            setData({ folderId: "", title: "", dashboardId: 1 });
            setIsModalOpen(false);
            fetchFolders();
        } catch (error) {
            console.error("Error details:", error.response?.data || error.message);
            alert("Failed to create/update folder.");
        }
    };

    const handle = (e) => {
        const { id, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const editFolder = (folder) => {
        setData({ 
            folderId: folder.folderId, 
            title: folder.title, 
            dashboardId: folder.dashboardId || 1 
        });
        setIsModalOpen(true);
        setOpenDropdown(null);
    };

    const deleteFolder = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await Axios.delete(`${url}/deleteFolder/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchFolders();
            setOpenDropdown(null);
        } catch (error) {
            console.error("Error deleting folder:", error);
        }
    };

    const filteredFolders = folders.filter(folder => 
        folder.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const toggleDropdown = (e, folderId) => {
        e.stopPropagation();
        setOpenDropdown(prevState => prevState === folderId ? null : folderId);
    };

    const openFolder = (folderId) => {
<<<<<<< HEAD:frontend/src/FolderApp.jsx
        navigate(`/noteApp/${folderId}`);
=======
        navigate(`/noteApp/${folderId}`); // Use navigate to go to NoteApp page with folderId as a parameter
>>>>>>> parent of c4fd8db (Merge branch 'main' of https://github.com/NOTEably1-0/Noteably):frontend/noteably/src/FolderApp.jsx
    };

    return (
        <div 
            className="folder-app"
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/polkadot.png'})` }}
        >
            <div className="top-section">
                <input
                    type="text"
                    placeholder="Look for a folder"
                    className="search-bar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={() => setIsModalOpen(true)} className="add-btn">+</button>
            </div>

            <div className="folder-grid">
                {filteredFolders.map((folder, index) => (
                    <div 
                        key={folder.folderId} 
                        className="folder-item"
                        onClick={() => openFolder(folder.folderId)}
                    >
                        <img
                            src={`/folder-${['blue', 'green', 'orange', 'red', 'yellow'][index % 5]}.png`}
                            alt="Folder Icon"
                            className="folder-icon"
                        />
                        <div className="folder-title">
                            {folder.title}
                            <MoreVertIcon 
                                className="options-icon" 
                                onClick={(e) => toggleDropdown(e, folder.folderId)} 
                            />
                        </div>
                        {openDropdown === folder.folderId && (
                            <div ref={dropdownRef} className="options-dropdown">
                                <button onClick={() => editFolder(folder)}>Rename</button>
                                <button onClick={() => deleteFolder(folder.folderId)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <form onSubmit={submit}>
                            <input
                                type="hidden"
                                id="folderId"
                                value={data.folderId}
                            />
                            <input
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={handle}
                                placeholder="Enter folder title"
                                required
                            />
                            <button type="submit">
                                {data.folderId ? 'Update' : 'Create'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FolderApp;
