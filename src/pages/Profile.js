import UserInfo from "../components/Account/UserInfo"
import "../components/Account/account.css"

function Profile() {
    return (
        <div className="profile-page mobile-mainContent">
            <div className="profile-container">
                <UserInfo />
            </div>
        </div>
    )
}

export default Profile
