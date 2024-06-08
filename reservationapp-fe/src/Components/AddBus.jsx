import React, { useState } from 'react'
import '../Styles/AddBus.css'
// import axios from 'axios'
import axios from 'axios'
// import addbusbg from '../Assets/Imges/addbusbgimg.jpg'

const AddBus = () => {
    let [name, setname] = useState("")
    let [bus_number, setbus_number] = useState("")
    let [no_of_seats, setno_of_seats] = useState("")
    let [costPerSeat, setcostPerSeat] = useState("")
    let [dod, setdod] = useState("")
    let [from_loc, setfrom_loc] = useState("")
    let [to_loc, setto_loc] = useState("")

    let busData = { name, bus_number, no_of_seats, dod, from_loc, to_loc, costPerSeat }

    let admin = JSON.parse(localStorage.getItem("Admin"))
    console.log(admin)
    console.log(typeof(admin));

    function addBusData(e) {
        e.preventDefault()
        axios.post(`http://localhost:8080/api/buses/${admin.id}`, busData)
            .then((res) => {
                console.log(res);
                alert("Bus Datails Saved.")
            })
            .catch((err) => {
                console.log(err);
                alert("Invalid Bus Datails. Check again.")
            })
    }

    return (

        <div className="allcontent">
            <div className='addbus'>

                <form action='' onSubmit={addBusData}>
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
                        Cost Per Seat: <input type="number" placeholder='Cost Per Seat' required value={costPerSeat} onChange={(e) => { setcostPerSeat(e.target.value) }} />
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

                    <button>Add Bus</button>

                </form>
            </div>
        </div>
    )
}

export default AddBus