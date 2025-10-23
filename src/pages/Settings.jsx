import UpdateProfileImg from "../components/UpdateProfileImg.jsx";
import UpdatePassword from "../components/UpdatePassword.jsx";
import UpdateCoverImage from "../components/UpdateCoverImage.jsx";
import UpdateEmail from "../components/UpdateEmail.jsx";

const Settings = () => {
    return (
        <div>
            <UpdateProfileImg />
            <UpdatePassword />
            <UpdateCoverImage />
            <UpdateEmail />
        </div>
    )
}

export default Settings;