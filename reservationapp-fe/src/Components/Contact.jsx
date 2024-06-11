import React from 'react'
import { Link } from 'react-router-dom';
import '../Styles/Contact.css';
import { useState } from 'react';

const Contact = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        name: false,
        email: false,
        message: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {
            name: !formData.name,
            email: !formData.email,
            message: !formData.message
        };
        setErrors(newErrors);
        return !newErrors.name && !newErrors.email && !newErrors.message;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert('Message Sent');
            // Optionally, you can also clear the form here
            setFormData({
                name: '',
                email: '',
                message: ''
            });
        }
    };

    return (
        <div className="contact-us">
            <nav className="navbar">
                <ul>
                    <li><Link to="/" id='home'><b>Home</b></Link></li>
                    <li><Link to="/adminlogin" className='link'>Admin</Link></li>
                    <li><Link to="/userlogin" className='link'>User</Link></li>
                    <li><Link to="/about" className='link'>About</Link></li>
                    <li><Link to="/contact" className='link' id='contact'>Contact</Link></li>
                </ul>
            </nav>

            <div className="contact-banner">
                <h1>Contact Us</h1>
            </div>
            <div className="contact-content">
                <h2>We'd Love to Hear from You</h2>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        {errors.name && <span className="error">Name is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <span className="error">Email is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        {errors.message && <span className="error">Message is required</span>}
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Contact