import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import '../Styles/ViewBus.css'
import { useNavigate } from 'react-router-dom'



const ViewBus = () => {
    let [bus, setbus] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8080/api/buses`)
            .then((res) => {
                console.log(res);
                setbus(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    function removeBus(id, bus_number ){
        axios.delete(`http://localhost:8080/api/buses/${id}`)
        .then((res)=>{
            console.log(res);
            alert(`Bus deleted with Bus number ${bus_number}`)
            // setbus(bus.filter(b => b.id !== id));
            
        })
        .catch((err)=>{
            console.log(err);
            alert("Error  Found While Deleting")
        })

        window.location.assign(`/adminhomepage/viewbus`)
    }

    let navigate = useNavigate()

    function editNavigate(id){
        navigate(`/adminhomepage/editbus/${id}`)
    }

    return (
        <div className='viewbuslist'>
            <h2>All Bus List</h2>
            <div className="maincontent">
                
                {bus.map((item) => {
                    return (
                        <div className="busdetails" key={item.bus_number}>
                            <div className="bus-info">
                                <span className="bus-name"><h6>Bus Name  
                                    </h6>{item.name}</span>
                                <span className="bus-seats">Total Seats: <b>{item.no_of_seats}</b></span>
                                <span className="bus-from">From: <b>{item.from_loc}</b>
                                </span>
                                <span className="bus-to">To: <b>{item.to_loc}</b></span>
                                <span className="bus-date">Departure Date& Time: <b>{item.dod}</b></span>
                                <span className='seat'>Available Seat: <b>{item.availableSeats}</b></span>
                                <span className='seat'>Cost Per 1 Seat: <b>{item.costPerSeat}</b></span>

                                <button className="bus-button" onClick={()=>{editNavigate(item.id)}}>Edit</button>
                                <button className="btn btn-danger" onClick={()=>{removeBus(item.id, item.bus_number)}}>Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}
export default ViewBus