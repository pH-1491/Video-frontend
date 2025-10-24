import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import VideoSection from "../components/VideoSection.jsx";
import VideoPlayer from "../components/VideoPlayer.jsx";

const Home = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);

    // If a video is selected, show the video player
    if (selectedVideo) {
        return (
            <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
                <Navbar />
                <VideoPlayer
                    video={selectedVideo}
                    onBack={() => setSelectedVideo(null)}
                />
            </div>
        );
    }

    // Otherwise, show the video section
    return (
        <>
            <Navbar />
            <VideoSection onVideoSelect={setSelectedVideo} />
        </>
    );
}

export default Home;