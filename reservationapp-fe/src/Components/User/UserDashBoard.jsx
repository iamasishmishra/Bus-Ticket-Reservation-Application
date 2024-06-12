import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../../Styles/UserStyles/UserDashBoard.css';

const UserDashBoard = () => {

    let [from_loc, setfrom_loc] = useState("")
    let [to_loc, setto_loc] = useState("")
    let [dod, setdod] = useState("")

    let [buses, setbuses] = useState([])

    function searchBus(e) {
        e.preventDefault();
        axios.get(`http://localhost:8080/api/buses/find?from_loc=${from_loc}&to_loc=${to_loc}&dod=${dod}`)
            .then((res) => {
                console.log(res.data.data);
                setbuses(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    let navigate = useNavigate()

    function editNavigate(id) {
        navigate(`/userhomepage/bookbus/${id}`)
    }


    const buttonStyle = {
        '--clr': '#39FF14'
      };

    return (
        <div className='usersearchbus'>

            <form action="" onSubmit={searchBus} id='form'>

                <label htmlFor="" className='label'> From:
                    <input type="text" required value={from_loc} onChange={(e) => { setfrom_loc(e.target.value) }} placeholder='From loc' className='input' />
                </label>

                <label htmlFor="" className='label'> To:
                    <input type="text" required value={to_loc} onChange={(e) => { setto_loc(e.target.value) }} placeholder='To loc' className='input' />
                </label>

                <label htmlFor="" className='label'>
                    <input type="date" required value={dod} onChange={(e) => { setdod(e.target.value) }} placeholder='Enter the journey Date' />
                </label>

                <button className='usbtn'   style={buttonStyle}><span>Search</span><i></i></button>
            </form>


            {buses.map((item) => {
                return (
                    <div className="userbuslist">
                        <h4>Bus Name: <b>{item.name}</b></h4>
                        <p>Seats: {item.no_of_seats}</p>
                        <p>From: <b>{item.from_loc}</b></p>
                        <p>To: <b>{item.to_loc}</b></p>
                        <p>Date and Time: {item.dod}</p>
                        <p>Bus No: {item.bus_number}</p>
                        <p className='userseats'>Available Seats: <b>{item.availableSeats}</b></p>
                        <p className='userseats'>Cost per 1 Seat: <b>&#x20B9; {item.costPerSeat}</b></p>
                        <button className='userbtnseat' onClick={() => { editNavigate(item.id) }}>Book Seat</button>
                    </div>
                )
            })}

        </div>
    )
}

export default UserDashBoard