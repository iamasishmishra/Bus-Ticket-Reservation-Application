import React from 'react'
import '../../Styles/UserStyles/BookingConfirmation.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const BookingConfirmation = () => {
    const { bookingId, userId, selectedSeats } = useParams(); 
    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/bookings/${bookingId}/&{userId}/${selectedSeats}`)
            .then((res) => {
                setBookingDetails(res.data);
            })
            .catch((err) => {
                console.log('Error fetching booking details:', err);
            });
    }, [bookingId, userId, selectedSeats]);

    return (

        <div className='bookingconfirmation'>
            {bookingDetails ? (
                <div className="booking-details">
                    <h2>Booking Confirmation</h2>
                    {Object.entries(bookingDetails).map(([key, value]) => (
                        <p key={key}><strong>{formatKey(key)}:</strong> {value}</p>
                    ))}
                    <p><strong>Number of Seats Selected:</strong> {selectedSeats}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}


            <h1>hello</h1>
        </div>
    )
}

const formatKey = (key) => {
    return key.replace(/([A-Z])/g, ' $1')
              .replace(/^./, str => str.toUpperCase());
};

export default BookingConfirmation