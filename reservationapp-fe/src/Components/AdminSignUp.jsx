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
          alert('Admin Added Successfully')
          console.log(res)
      })
      .catch( (err)=>{
          alert('Invalid Data')
          console.log(err);
      })
  }

  return (
    <div className='adminsignup'>

        <form action="" onSubmit={createAdmin}>
            <label htmlFor="">Name:</label>
            <input type="text" placeholder='Enter your Name' required value={name} onChange={(e)=>{setname(e.target.value)}}/>


            <label htmlFor="">Email:</label>
            <input type="email" placeholder='Enter your Email' required  value={email} onChange={(e)=>{setemail(e.target.value)}}/>


            <label htmlFor="">Phone:</label>
            <input type="tel" placeholder='Enter your Phone no' required  value={phone} onChange={(e)=>{setphone(e.target.value)}}/>


            <label htmlFor="">Gst Number:</label>
            <input type="text" placeholder='Enter your Gst Number' required  value={gst_number} onChange={(e)=>{setgst_number(e.target.value)}}/>


            <label htmlFor="">Travels Name:</label>
            <input type="text" placeholder='Enter your Travels Name' required value={travels_name} onChange={(e)=>{settravels_name(e.target.value)}}/>


            <label htmlFor="">Password:</label>
            <input type="password" placeholder='Enter your Password' required  value={password} onChange={(e)=>{setpassword(e.target.value)}}/ >

            <button type="submit" className='btn btn-primary'>Sign Up</button>

        </form>
    </div>
  )
}


export default AdminSignUp