import React, { useState } from 'react'
import axios from 'axios'
import '../../Styles/UserStyles/UserSignUp.css';

const UserSignUp = () => {

  let [name, setname] = useState("")
  let [phone, setphone] = useState("")
  let [age, setage] = useState("")
  let [gender, setgender] = useState("")
  let [email, setemail] = useState("")
  let [password, setpassword] = useState("")

  let data = {
    name, phone, age, gender, email, password
  }

  function createUser(e) {
    e.preventDefault()
    axios.post('http://localhost:8080/api/users', data )
      .then((res) => {
        alert('User Added Successfully verification mail send to registered email')
        console.log(res)
      })
      .catch((err) => {
        alert('Invalid Data')
        console.log(err);
      })
  }

  return (
    <div className='usersignup'>

      <form action="" onSubmit={createUser}>

        <label htmlFor="">Name:</label>
        <input type="text" placeholder='Enter your Name' required value={name} onChange={(e) => { setname(e.target.value) }} />

        <label htmlFor="">Phone:</label>
        <input type="tel" placeholder='Enter your Phone no' required value={phone} onChange={(e) => { setphone(e.target.value) }} />

        <label htmlFor="">Age:</label>
        <input type="number" placeholder='Enter your Age' required value={age} onChange={(e) => { setage(e.target.value) }} />

        <label htmlFor="">Gender:</label>
        <input type="text" placeholder='Enter your Gender' required value={gender} onChange={(e) => { setgender(e.target.value) }} />



        <label htmlFor="">Email:</label>
        <input type="email" placeholder='Enter your Email' required value={email} onChange={(e) => { setemail(e.target.value) }} />


        <label htmlFor="">Password:</label>
        <input type="password" placeholder='Enter your Password' required value={password} onChange={(e) => { setpassword(e.target.value) }} />

        <button type="submit" className='btn btn-primary'>Sign Up</button>

      </form>
    </div>
  )
}

export default UserSignUp