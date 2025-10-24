import { useEffect, useState } from "react";
import "./Dashboard.css";
import WatchHistory from "../components/WatchHistory.jsx";

function Dashboard() {
    const [profile, setProfile] = useState(null);

    const currentUsername = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!currentUsername) return;

        const fetchProfile = async () => {
            const res = await fetch(
                `http://localhost:8000/api/v1/users/c/${currentUsername}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const json = await res.json();
            setProfile(json.data || json);
        };

        fetchProfile();
    }, [currentUsername, token]);

    console.log("Current username:", currentUsername);

    if (!profile) {
        return (
            <div className="loading-container">
                <p>Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-container">
                <div className="cover-section">
                    <img
                        src={profile.coverImage}
                        alt="cover"
                        className="cover-image"
                    />
                </div>

                <div className="profile-content">
                    <div className="profile-header">
                        <img
                            src={profile.avatar}
                            alt="avatar"
                            className="avatar-image"
                        />

                        <div className="profile-info">
                            <h2 className="full-name">{profile.fullName}</h2>
                            <p className="username">@{profile.userName}</p>
                            <p className="email">{profile.email}</p>
                        </div>

                        <div className="subscribe-section">
                            {profile.isSubscribed ? (
                                <button className="btn btn-unsubscribe">Unsubscribe</button>
                            ) : (
                                <button className="btn btn-subscribe">Subscribe</button>
                            )}
                        </div>
                    </div>

                    <div className="stats-section">
                        <div className="stat-item">
                            <span className="stat-number">{profile.subscribersCount}</span>
                            <span className="stat-label">Subscribers</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-number">{profile.channelsSubscribedToCount}</span>
                            <span className="stat-label">Following</span>
                        </div>
                    </div>
                </div>
            </div>
            <WatchHistory />
        </div>
    );
}

export default Dashboard;