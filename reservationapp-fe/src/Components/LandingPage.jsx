import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/LandingPage.css'
import landingbackground from '../Assets/Videos/landingbackground.mp4';

const LandingPage = () => {
    return (
        <div className="content">

            <nav className="navbar">
                <ul>
                    <li><Link to="/" id='home'><b>Home</b></Link></li>
                    <li><Link to="/adminlogin" className='link'>Admin</Link></li>
                    <li><Link to="/userlogin" className='link'>User</Link></li>
                    <li><Link to="/about" className='link'>About</Link></li>
                    <li><Link to="/contact" className='link' id='contact'>Contact</Link></li>
                </ul>
            
            </nav>



            <h1 className='heading'>Welcome To The Future Of Buses</h1>


            <div className='landingpage'>

                <video autoPlay muted loop id='background-video'>
                    <source src={landingbackground} type="video/mp4" />
                </video>



                <Link to="/adminlogin">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvjbwBwjCSMJPuJC4RYGoQxKh6wZAqaM6rNkQuHwHaF7joDPUAqXUldYlZ8KpFwXlwT-k&usqp=CAU" alt="" id='fstimg' />
                    <h2>Admin</h2>
                </Link>

                <Link to="/userlogin">
                    <img src="https://cdn-icons-png.flaticon.com/256/9720/9720121.png" alt="" id='sndimg' />
                    <h2>User</h2>
                </Link>
            </div>


        </div>
    )
}

export default LandingPage