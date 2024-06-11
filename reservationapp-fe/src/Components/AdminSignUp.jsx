import React, { useState } from 'react'
import '../Styles/AdminSignUp.css'
import axios from 'axios'

const AdminSignUp = () => {

    let [name, setname] = useState("")
    let [email, setemail] = useState("")
    let [phone, setphone] = useState("")
    let [gst_number, setgst_number] = useState("")
    let [travels_name, settravels_name] = useState("")
    let [password, setpassword] = useState("")

    let data = {
      name, email, phone, gst_number, travels_name, password
  }

  function createAdmin(e) {
      
      e.preventDefault()
      axios.post('http://localhost:8080/api/admins', data)
      .then( (res)=>{
          alert('Admin Added Successfully check your email to activate your account')
          console.log(res)
      })
      .catch( (err)=>{
          alert('Invalid Data')
          console.log(err);
      })
  }

  return (
    <div className='adminsignup'>

        <form action="" onSubmit={createAdmin} className='form'>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" placeholder='Enter your Name' required value={name} onChange={(e) => setname(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder='Enter your Email' required value={email} onChange={(e) => setemail(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" placeholder='Enter your Phone no' required value={phone} onChange={(e) => setphone(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="gst_number">Gst Number:</label>
          <input type="text" id="gst_number" placeholder='Enter your Gst Number' required value={gst_number} onChange={(e) => setgst_number(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="travels_name">Travels Name:</label>
          <input type="text" id="travels_name" placeholder='Enter your Travels Name' required value={travels_name} onChange={(e) => settravels_name(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder='Enter your Password' required value={password} onChange={(e) => setpassword(e.target.value)} />
        </div>

        <button type="submit" className='btn btn-primary'>Sign Up</button>

        </form>
    </div>
  )
}


export default AdminSignUp