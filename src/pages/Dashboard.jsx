import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
    const { userName } = useParams();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`http://localhost:8000/api/v1/users/c/${userName}`);
                const data = await res.json();
                setProfile(data.data);
            } catch (err) {
                console.error("Error fetching profile", err);
            }
        };
        fetchProfile();
    }, [userName]);

    if (!profile) return <p>Loading...</p>;

    return (
        <div>
            <img src={profile.coverImage} alt="cover" width="100%" />
            <img src={profile.avatar} alt="avatar" style={{ width: "100px", borderRadius: "50%" }} />
            <h2>{profile.fullName}</h2>
            <p>@{profile.userName}</p>
            <p>{profile.subscribersCount} Subscribers</p>
            <p>{profile.channelsSubscribedToCount} Following</p>
            <p>Email: {profile.email}</p>
            {profile.isSubscribed ? (
                <button>Unsubscribe</button>
            ) : (
                <button>Subscribe</button>
            )}
        </div>
    );
}

export default Dashboard;
