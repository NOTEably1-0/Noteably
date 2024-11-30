import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom'; // Add React Router's navigate hook
import './FolderApp.css'; // Import CSS for custom styles

function FolderApp() {
    const url = "http://localhost:8080/api/folders"; // Backend URL
    const navigate = useNavigate();  // Initialize navigate for routing

    const [data, setData] = useState({
        folderId: "",
        title: "",
        dashboardId: 1  // Default dashboard ID
    });
    const [folders, setFolders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [openDropdown, setOpenDropdown] = useState(null); // State to track which folder's dropdown is open
    const dropdownRef = useRef(null); // Reference to the dropdown container

    useEffect(() => {
        fetchFolders();
    }, []);

    useEffect(() => {
        // Close dropdown if clicked outside of the folder item
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null); // Close the dropdown if clicked outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside); // Listen for outside clicks

        return () => {
            document.removeEventListener('mousedown', handleClickOutside); // Clean up the event listener on unmount
        };
    }, []);

    const fetchFolders = async () => {
        try {
            const res = await Axios.get(`${url}/getAllFolders`);
            setFolders(res.data);
        } catch (error) {
            console.error("Error fetching folders:", error);
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            const postUrl = `${url}/postFolderRecord`;  // URL for creating a folder
            const putUrl = `${url}/putFolderDetails/${data.folderId}`; // URL for updating a folder

            if (data.folderId) {
                await Axios.put(putUrl, data, { headers: { 'Content-Type': 'application/json' } });
            } else {
                await Axios.post(postUrl, data, { headers: { 'Content-Type': 'application/json' } });
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
        setData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const editFolder = (folder) => {
        setData({ folderId: folder.folderId, title: folder.title, dashboardId: folder.dashboardId || 1 });
        setIsModalOpen(true);
    };

    const deleteFolder = async (id) => {
        try {
            await Axios.delete(`${url}/deleteFolder/${id}`);
            fetchFolders();
        } catch (error) {
            console.error("Error deleting folder:", error);
        }
    };

    const filteredFolders = folders.filter((folder) => folder.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const toggleDropdown = (folderId) => {
        setOpenDropdown((prevState) => (prevState === folderId ? null : folderId)); // Toggle dropdown
    };

    const openFolder = (folderId) => {
        navigate(`/noteApp/${folderId}`, { state: { folderId } });
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
                    <div key={folder.folderId} className="folder-item" onClick={() => openFolder(folder.folderId)}>
                        <img
                            src={`./ASSETS/folder-${['blue', 'green', 'orange', 'red', 'yellow'][index % 5]}.png`}
                            alt="Folder Icon"
                            className="folder-icon"
                        />
                        <div className="folder-title">
                            {folder.title}
                            <MoreVertIcon className="options-icon" onClick={() => toggleDropdown(folder.folderId)} />
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
                            <button type="submit">{data.folderId ? 'Update' : 'Create'}</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FolderApp;
