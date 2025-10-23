import { useState } from "react";
import { ChevronDown, User, Lock, Image, Mail } from "lucide-react";
import UpdateProfileImg from "../components/UpdateProfileImg.jsx";
import UpdatePassword from "../components/UpdatePassword.jsx";
import UpdateCoverImage from "../components/UpdateCoverImage.jsx";
import UpdateEmail from "../components/UpdateEmail.jsx";
import "./Settings.css";

const Settings = () => {
    const [activeSection, setActiveSection] = useState(null);

    const settingsOptions = [
        {
            id: "profile",
            label: "Update Profile Image",
            icon: User,
            component: UpdateProfileImg
        },
        {
            id: "password",
            label: "Update Password",
            icon: Lock,
            component: UpdatePassword
        },
        {
            id: "cover",
            label: "Update Cover Image",
            icon: Image,
            component: UpdateCoverImage
        },
        {
            id: "email",
            label: "Update Email",
            icon: Mail,
            component: UpdateEmail
        }
    ];

    const toggleSection = (id) => {
        setActiveSection(activeSection === id ? null : id);
    };

    return (
        <div className="settings-container">
            <div className="settings-wrapper">
                <h1 className="settings-title">Settings</h1>

                <div className="settings-list">
                    {settingsOptions.map((option) => {
                        const Icon = option.icon;
                        const Component = option.component;
                        const isActive = activeSection === option.id;

                        return (
                            <div key={option.id} className="settings-item">
                                <button
                                    onClick={() => toggleSection(option.id)}
                                    className="settings-button"
                                >
                                    <div className="settings-button-content">
                                        <Icon className="settings-icon" />
                                        <span className="settings-label">{option.label}</span>
                                    </div>
                                    <ChevronDown
                                        className={`settings-chevron ${isActive ? "active" : ""}`}
                                    />
                                </button>

                                <div className={`settings-dropdown ${isActive ? "active" : ""}`}>
                                    <div className="settings-dropdown-content">
                                        <Component />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Settings;