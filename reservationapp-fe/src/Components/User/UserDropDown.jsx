import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../../Styles/UserStyles/UserDropDown.css';

const UserDropDown = () => {
    function handleLogout() {
        alert('You have been logged out.');
        window.location.href = '/';
    }

    return (
        <div>
            <DropdownButton id="dropdown-basic-button" title="Account">
                <Dropdown.Item href="/userhomepage/viewbus">Bus List</Dropdown.Item>
                <Dropdown.Item href="/userhomepage/editprofile">Edit Profile</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
            </DropdownButton>
        </div>
    )
}

export default UserDropDown