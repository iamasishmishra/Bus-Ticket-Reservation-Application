import React from 'react'
import AdminDropDown from './AdminDropDown'
import '../Styles/AdminNavBar.css'
const AdminNavBar = () => {
  return (
    <div className="adminnavbar">

        <div className="logo">
            <h2><i><img src="https://cdn.icon-icons.com/icons2/1465/PNG/512/605bus_100552.png" alt="" /> BusMaster</i></h2>
        </div>

        <div className="dropdown">
            <AdminDropDown/>
        </div>
    </div>
  )
}

export default AdminNavBar