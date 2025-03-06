import { useSelector } from "react-redux";
import { useUser } from "../Authentication/useUser"
import Button from "../ui/Button"

function UserInfo() {
    // const {user} = useUser();
    const {user} = useSelector((store) => store.cartStates);
    const {email, user_metadata: {fullName, phone}} = user;

    return (
        <div className="profile-card">
        <div className="profile-info-label">Profile Details</div>
        <table className="profile-infoTable">
            <tbody>
                <tr>
                    <td>Full Name</td>
                    <td>{fullName ? fullName : "-Please fill the details-"}</td>
                </tr>
                <tr>
                    <td>Email Id</td>
                    <td>{email ? email : "-Please fill the details-"}</td>
                </tr>
                <tr>
                    <td>Mobile Number</td>
                    <td>{phone ? phone : "-Please fill the details-"}</td>
                </tr>
                <tr>
                    <td>Gender</td>
                    <td>Male</td>
                </tr>
                {/* <tr>
                    <td>Alternate Mobile</td>
                    <td>Bhavesh Bafana</td>
                </tr>
                <tr>
                    <td>Date Of Birth</td>
                    <td>Bhavesh Bafana</td>
                </tr> */}
            </tbody>
        </table>
        <Button>Edit</Button>
        </div>
    )
}

export default UserInfo
