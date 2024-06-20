import React from 'react'
// import bgimg from '../../Assets/Imges/userbusbg.jpg'
import '../../Styles/UserStyles/UserHomePage.css'
import { Link } from 'react-router-dom'
import UserDropDown from './UserDropDown'
import UserDashBoard from './UserDashBoard'
import { Routes, Route } from 'react-router-dom'
import UserBookBus from './UserBookBus'
import BookingConfirmation from './BookingConfirmation'

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

        <Routes>
          <Route path='/' element={<UserDashBoard />} />
          <Route path='/userbookbus/:id' element={<UserBookBus/>}/>
          <Route path='/booking-confirmation/:ticketId' element={<BookingConfirmation />} />
        </Routes>
      
    </div>
  )
}

export default UserHomePage