import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const AdminDropDown = () => {
    function handleLogout() {
        alert('You have been logged out.');
        window.location.href = '/';
    }
    return (
        <div>
            <DropdownButton id="dropdown-basic-button" title="Account">
                <Dropdown.Item href="/adminhomepage/addbus">Add Bus</Dropdown.Item>
                <Dropdown.Item href="/adminhomepage/viewbus">Bus List</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Edit Profile</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
            </DropdownButton>
        </div>
    )
}
export default AdminDropDown