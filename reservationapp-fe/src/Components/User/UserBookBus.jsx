import React from 'react'
import '../../Styles/UserStyles/UserBookBus.css'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const UserBookBus = () => {
    let params = useParams()
    let [bus, setbus] = useState({
        name: '',
        from_loc: '',
        to_loc: '',
        dod: '',
        no_of_seats: '',
        bus_number: '',
        availableSeats: '',
        costPerSeat: ''
    })

    const [selectedSeats, setSelectedSeats] = useState(1);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/buses/${params.id}`)
            .then((res) => {
                console.log(res.data);
                if (res.data && res.data.data) {
                    setbus(res.data.data);
                    setTotalCost(res.data.data.costPerSeat);
                } else {
                    console.log('Data not found or incorrect format:', res.data);
                }
            })
            .catch((err) => {
                console.log('Error fetching bus data:', err);
            });
    }, [params.id]);

    let seats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const handleSeatChange = (e) => {
        const seats = parseInt(e.target.value);
        setSelectedSeats(seats);
        setTotalCost(bus.costPerSeat * seats);
    };

    return (
        <div className='card'>
            <div className="card-content">
                <h3>Bus Name: <span> {bus.name}</span></h3>
                <p><strong>From:</strong> <span>{bus.from_loc}</span></p>
                <p><strong>To:</strong> <span>{bus.to_loc}</span></p>
                <p><strong>Date:</strong> <span>{bus.dod}</span></p>
                <p><strong>Total Seats:</strong> <span>{bus.no_of_seats}</span></p>
                <p><strong>Available Seats:</strong> <span>{bus.availableSeats}</span></p>
                
                <p><strong>No Of Seats:</strong>
                    <select value={selectedSeats} onChange={handleSeatChange}>
                        {seats.map((seat, index) => (
                            <option key={index} value={seat}>{seat}</option>
                        ))}
                    </select>
                </p>
                <p><strong>Bus No:</strong> <span>{bus.dod}</span></p> <br /> 

                <p><strong>Total Cost:</strong> <span className='cost' id='costValue'>&#x20B9;{totalCost}</span></p>

                <button className='userbookbusbtn'><p>Book Seat</p></button>
            </div>
        </div>
    )
}

export default UserBookBus