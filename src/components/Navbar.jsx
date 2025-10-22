import React, { useState } from 'react';
import { Search, Home, Settings, Bell, Upload, LogOut, X } from 'lucide-react';
import styles from '../styles/Navbar.module.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [userName, setUserName] = useState(null);
    const notifications = [
        {
            id: 1,
            title: 'Welcome to Nistle',
            text: 'Explore the new community',
            time: 'a second ago',
            unread: true,
        },

        {
            id: 3,
            title: 'System update',
            text: 'Your system has been updated successfully',
            time: '1 minute ago',
            unread: true
        },
        {
            id: 4,
            title: 'Task completed',
            text: 'Your report has been generated',
            time: '3 minutes ago',
            unread: false
        }
    ];

    const unreadCount = notifications.filter(n => n.unread).length;
    const navigate = useNavigate();

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            console.log('Searching for:', searchQuery);
            // search logic
        }
    };

    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === "dashboard" && userName) {
            navigate(`/dashboard/${encodeURIComponent(userName)}`);
        } else {
            navigate(`/${tab}`);
        }
    };

    const handleLogout = async () => {
        try {
            console.log("Logging out...");
            await axios.post(
                "http://localhost:8000/api/v1/users/logout",
                {},
                {
                    withCredentials: true,
                }
            );

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");


            navigate("/login");
            alert("Logged out successfully");

        } catch (error) {
            console.error("Logout failed:", error);
            alert("Error logging out, please try again!");
        }
    };

    const closeNotifications = () => {
        setShowNotifications(false);
    };


    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.content}>
                    {/* Left Section - Logo */}
                    <div className={styles.leftSection}>
                        <div className={styles.logo}>
                            Nistle
                        </div>
                    </div>

                    {/* Center Section - Search Bar */}
                    <div className={styles.searchContainer}>
                        <div className={styles.searchWrapper}>
                            <Search className={`${styles.searchIcon}`} size={16} />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                                className={styles.searchInput}
                            />
                        </div>
                    </div>

                    {/* Right Section - Navigation Buttons */}
                    <div className={styles.rightSection}>
                        {/* Dashboard Button */}
                        <button
                            onClick={() => handleTabClick('dashboard')}
                            className={activeTab === 'dashboard' ? styles.activeButton : styles.navButton}
                            title="Dashboard"
                        >
                            <Home size={20} />
                        </button>

                        {/* Publish Button */}
                        <button
                            onClick={() => handleTabClick('upload')}
                            className={activeTab === 'publish' ? styles.activeButton : styles.navButton}
                            title="Publish"
                        >
                            <Upload size={20} />
                        </button>

                        {/* Notifications Button */}
                        <div className="relative">
                            <button
                                onClick={handleNotificationClick}
                                className={styles.navButton}
                                title="Notifications"
                            >
                                <Bell size={20} />
                                {unreadCount > 0 && (
                                    <span className={styles.notificationDot}></span>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {showNotifications && (
                                <div className={styles.notificationPanel}>
                                    <div className={styles.notificationHeader}>
                                        <h3>Notifications</h3>
                                        <button
                                            className={styles.closeButton}
                                            onClick={closeNotifications}
                                            title="Close"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                    <div className={styles.notificationList}>
                                        {notifications.map((notification) => (
                                            <div key={notification.id} className={styles.notificationItem}>
                                                <div className={styles.notificationTitle}>
                                                    {notification.title}
                                                    {notification.unread && (
                                                        <span className={styles.unreadIndicator}></span>
                                                    )}
                                                </div>
                                                <div className={styles.notificationText}>
                                                    {notification.text}
                                                </div>
                                                <div className={styles.notificationTime}>
                                                    {notification.time}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.notificationFooter}>
                                        <button>View all notifications</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Settings Button */}
                        <button
                            onClick={() => handleTabClick('settings')}
                            className={activeTab === 'settings' ? styles.activeButton : styles.navButton}
                            title="Settings"
                        >
                            <Settings size={20} />
                        </button>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className={styles.logoutButton}
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay to close notifications when clicking outside */}
            {showNotifications && (
                <div
                    className={styles.overlay}
                    onClick={closeNotifications}
                ></div>
            )}
        </nav>
    );
};

export default Navbar;