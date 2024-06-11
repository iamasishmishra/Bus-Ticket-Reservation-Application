import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/About.css';

const About = () => {
    return (
        <div className="about-us">
            <nav className="navbar">
                <ul>
                    <li><Link to="/" id='home'><b>Home</b></Link></li>
                    <li><Link to="/adminlogin" className='link'>Admin</Link></li>
                    <li><Link to="/userlogin" className='link'>User</Link></li>
                    <li><Link to="/about" className='link'>About</Link></li>
                    <li><Link to="/contact" className='link' id='contact'>Contact</Link></li>
                </ul>
            </nav>

            <div className="about-banner">
                <h1>About Us</h1>
            </div>
            <div className="about-content">
                <h2>Welcome to Our Bus Reservation System</h2>
                <p>
                    We are committed to providing a convenient and efficient bus reservation system. Our platform is designed to make your travel experience smooth and hassle-free.
                </p>
                <p>
                    Our mission is to revolutionize the way people book bus tickets by offering a seamless and user-friendly interface. We strive to offer the best customer service and ensure that our users have access to the most reliable and up-to-date information.
                </p>
                <p>
                    Our team is dedicated to continuously improving our services and technology to meet the evolving needs of our customers. Thank you for choosing us for your travel needs.
                </p>
            </div>
        </div>
    )
}

export default About