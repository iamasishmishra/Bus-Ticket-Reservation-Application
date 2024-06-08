import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../Styles/EditBus.css'

const EditBus = () => {
    let [name, setname] = useState("")
    let [bus_number, setbus_number] = useState("")
    let [no_of_seats, setno_of_seats] = useState("")
    let [dod, setdod] = useState("")
    let [from_loc, setfrom_loc] = useState("")
    let [to_loc, setto_loc] = useState("")

    let params = useParams()

    useEffect(()=>{
        axios.get(`http://localhost:8080/api/buses/${params.id}`)
        .then((res)=>{
            console.log(res.data.data);
            setname(res.data.data.name);
            setbus_number(res.data.data.bus_number);
            setno_of_seats(res.data.data.no_of_seats);
            setdod(res.data.data.dod);
            setfrom_loc(res.data.data.from_loc)
            setto_loc(res.data.data.to_loc)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[params.id])

    let newbus = { name, bus_number, no_of_seats, dod, from_loc, to_loc }

    function editBus(e){
        e.preventDefault();
        axios.put(`http://localhost:8080/api/buses/${params.id}`, newbus)
            .then((res) => {
                console.log(res);
                alert("Bus Datails Edited.")
            })
            .catch((err) => {
                console.log(err);
                alert("Invalid Bus Datails. Check again.")
            })
    }

    return (
        <div className='editbus'>

            <form action='' onSubmit={editBus}>
                <label htmlFor="">
                    Name: <input type="text" placeholder='Enter Bus Name' required value={name} onChange={(e) => { setname(e.target.value) }} />
                </label>

                <label htmlFor="">
                    Bus No: <input type="text" placeholder='Enter Bus no' required value={bus_number} onChange={(e) => { setbus_number(e.target.value) }} />
                </label>

                <label htmlFor="">
                    No Of Sets: <input type="number" placeholder='Enter total Bus seats' required value={no_of_seats} onChange={(e) => { setno_of_seats(e.target.value) }} />
                </label>

                <label htmlFor="">
                    Date of Departure: <input type="date" placeholder='Enter the date of departure' required value={dod} onChange={(e) => { setdod(e.target.value) }} />
                </label>

                <label htmlFor="">
                    From Location: <input type="text" placeholder='Enter the location' required value={from_loc} onChange={(e) => { setfrom_loc(e.target.value) }} />
                </label>

                <label htmlFor="">
                    To Location: <input type="text" placeholder='Enter the location' required value={to_loc} onChange={(e) => { setto_loc(e.target.value) }} />
                </label>

                <button>Edit</button>

            </form>


        </div>
    )
}

export default EditBus