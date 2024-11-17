import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Settings.css';
import { useNavigate } from 'react-router-dom';

function SettingsPage() {
    const [student, setStudent] = useState({
        name: '',
        course: '',
        contactNumber: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [notifications, setNotifications] = useState({
        newNote: true,
        noteUpdates: true,
        noteShared: true,
        emailNotification: true
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchStudentData();
    }, []);

    const fetchStudentData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/student/current', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data) {
                console.log(response.data);
                const studentData = response.data;
                setStudent(prevState => ({
                    ...prevState,
                    name: studentData.name || '',
                    course: studentData.course || '',
                    contactNumber: studentData.contactNumber || '',
                    email: studentData.email || ''
                }));
            }
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setStudent(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleNotificationChange = (id) => {
        setNotifications(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const handleSubmit = async () => {
        try {
            if (student.newPassword && student.newPassword !== student.confirmPassword) {
                alert("New passwords don't match!");
                return;
            }

            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/student/current', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const currentStudent = response.data;
            await axios.put(`http://localhost:8080/api/student/update/${currentStudent.id}`, 
                {
                    name: student.name,
                    course: student.course,
                    contactNumber: student.contactNumber,
                    email: student.email,
                    password: student.newPassword || undefined
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            alert('Settings updated successfully!');
            if (student.newPassword) {
                setStudent(prevState => ({
                    ...prevState,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                }));
            }
        } catch (error) {
            console.error('Error updating settings:', error);
            alert('Failed to update settings. Please try again.');
        }
    };

    const handleLogout = () => {
        localStorage.clear(); // Clear all items in localStorage
        navigate('/'); // Redirect to the login page
    };

    return (
        <div className="settings-container">
            <div className="settings-grid">
                <div className="settings-card">
                    <div className="card-header">
                        <h2>Edit Profile</h2>
                    </div>
                    <div className="card-content">
                        <div className="input-group">
                            <label htmlFor="name">Your Name</label>
                            <input
                                id="name"
                                type="text"
                                value={student.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="course">Course</label>
                            <input
                                id="course"
                                type="text"
                                value={student.course}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="contactNumber">Contact Number</label>
                            <input
                                id="contactNumber"
                                type="tel"
                                value={student.contactNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={student.email}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="settings-column">
                    <div className="settings-card">
                        <div className="card-header">
                            <h2>Change Password</h2>
                        </div>
                        <div className="card-content">
                            <div className="input-group">
                                <label htmlFor="currentPassword">Current Password</label>
                                <input
                                    id="currentPassword"
                                    type="password"
                                    value={student.currentPassword}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="newPassword">New Password</label>
                                <input
                                    id="newPassword"
                                    type="password"
                                    value={student.newPassword}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={student.confirmPassword}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="settings-card">
                        <div className="card-header">
                            <h2>Notifications</h2>
                        </div>
                        <div className="card-content">
                            <div className="notification-item">
                                <div className="notification-info">
                                    <label htmlFor="newNote">New Note Created</label>
                                    <p>You will be notified when a new note is created</p>
                                </div>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        id="newNote"
                                        checked={notifications.newNote}
                                        onChange={() => handleNotificationChange('newNote')}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <div className="notification-item">
                                <div className="notification-info">
                                    <label htmlFor="noteUpdates">Note Updates</label>
                                    <p>You will be notified when changes are made to your notes</p>
                                </div>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        id="noteUpdates"
                                        checked={notifications.noteUpdates}
                                        onChange={() => handleNotificationChange('noteUpdates')}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <div className="notification-item">
                                <div className="notification-info">
                                    <label htmlFor="noteShared">Note Shared</label>
                                    <p>You will be notified when a note is shared with you</p>
                                </div>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        id="noteShared"
                                        checked={notifications.noteShared}
                                        onChange={() => handleNotificationChange('noteShared')}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <div className="notification-item">
                                <div className="notification-info">
                                    <label htmlFor="emailNotification">Email Notification</label>
                                    <p>Turn on email notification to get updates through email</p>
                                </div>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        id="emailNotification"
                                        checked={notifications.emailNotification}
                                        onChange={() => handleNotificationChange('emailNotification')}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="settings-footer">
                <button className="save-button" onClick={handleSubmit}>
                    Save Changes
                </button>
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default SettingsPage;
