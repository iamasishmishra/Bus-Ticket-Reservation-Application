import '../Styles/AdminDashBoard.css'
import axios from 'axios'
import '../Styles/ViewBus.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AdminDashBoard = () => {

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
    navigate(`/adminhomepage/bookbus/${id}`)
  }

  return (
    <div className='admindashboard'>

      <div className="middle">

        <form action="" onSubmit={searchBus}>
          
          <label htmlFor="">
          <input type="text" required value={from_loc} onChange={(e) => { setfrom_loc(e.target.value) }} placeholder='From loc' className='input' />
          </label>
          
          <label htmlFor="">
          <input type="text" required value={to_loc} onChange={(e) => { setto_loc(e.target.value) }} placeholder='To loc' className='input' />
          </label>

          <input type="date" required value={dod} onChange={(e) => { setdod(e.target.value) }} placeholder='Enter the journey Date' />

          <button className='botton'>Search</button>
        </form>

        {buses.map((item) => {
          return (
            <div className="buslist">
              <h4>Bus Name: <b>{item.name}</b></h4>
              <p>Seats: {item.no_of_seats}</p>
              <p>From: <b>{item.from_loc}</b></p>
              <p>To: <b>{item.to_loc}</b></p>
              <p>Date and Time: {item.dod}</p>
              <p>Bus No: {item.bus_number}</p>
              <p className='seats'>Available Seats: <b>{item.availableSeats}</b></p>
              <p className='seats'>Cost per 1 Seat: <b>&#x20B9; {item.costPerSeat}</b></p>
              <button className='btnseat' onClick={() => { editNavigate(item.id) }}>Book Seat</button>
            </div>
          )
        })}

      </div>

    </div>
  )
}
