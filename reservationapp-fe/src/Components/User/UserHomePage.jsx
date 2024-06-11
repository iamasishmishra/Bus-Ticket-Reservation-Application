import React from 'react'
import bgimg from '../../Assets/Imges/userbusbg.jpg'
import '../../Styles/UserStyles/UserHomePage.css'
import { Link } from 'react-router-dom'
import UserDropDown from './UserDropDown'

const UserHomePage = () => {
  return (
    <div className='userhomepage'>

      <nav className="navbar">
        <ul>
          <li><Link to="/userhomepage" id='home'><b>Home</b></Link></li>
          <li><Link to="/about" className='link'>About</Link></li>
          <li><Link to="/contact" className='link' id='contact'>Contact</Link></li>
        </ul>

        <div className="drop">
          <UserDropDown />
        </div>
      </nav>

      <div className="bgimg">
        <img src={bgimg} alt="" />
      </div>
    </div>
  )
}

export default UserHomePage