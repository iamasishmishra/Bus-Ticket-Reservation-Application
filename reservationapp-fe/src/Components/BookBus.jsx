import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import '../Styles/BookBus.css';

const BookBus = () => {
    let params = useParams()
    let [bus, setbus] = useState({
        name: '',
        from_loc: '',
        to_loc: '',
        dod: '',
        no_of_seats: '',
        bus_number: '',
        availableSeats: 0,
        costPerSeat: 0
    })

    useEffect(()=>{
        axios.get(`http://localhost:8080/api/buses/${params.id}`)
        .then((res)=>{
            console.log(res.data);
            console.log(res.data.data);
            setbus(res.data.data)
        })
        .catch((err)=>{
            console.log(err);

        })
    },[params.id])

    let seats = [1,2,3,4,5,6,7,8,9,10]

  return (
    <div className='displaybus'>
        <h3>Bus Name: {bus.name}</h3>
        <p>From: {bus.from_loc}</p>
        <p>To: {bus.to_loc} </p>
        <p>Date: {bus.dod}</p>
        <p>Seats: {bus.no_of_seats}</p>
        <p>Select No Of Seats: <b><select>
            {seats.map((seat)=>{
                return(
                    <option>{seat}</option>
                )
            })}
            </select></b></p>
        <p>Bus No: {bus.bus_number}</p>

        <button className='btnbook'><p>Book Seat</p></button>
    </div>
  )
}

export default BookBus