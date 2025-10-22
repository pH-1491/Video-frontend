import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Profile() {
    const { userName } = useParams();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // get token from localStorage or context
                const token = localStorage.getItem("accessToken");

                const res = await fetch(`/api/v1/users/c/${userName}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                setProfile(data.data);
            } catch (err) {
                console.error("Error fetching profile", err);
            }
        };

        fetchProfile();
    }, [userName]);

    if (!profile) return <p>Please login to see your profile :)</p>;

    return (
        <div>
            <img src={profile.coverImage} alt="cover" width="100%" />
            <img src={profile.avatar} alt="avatar" width="100" />
            <h2>{profile.fullName}</h2>
            <p>@{profile.userName}</p>
            <p>{profile.subscribersCount} Subscribers</p>
            <p>{profile.channelsSubscribedToCount} Following</p>
        </div>
    );
}

export default Profile;
