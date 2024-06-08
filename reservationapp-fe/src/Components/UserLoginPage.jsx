import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../Styles/UserStyles/UserLoginPage.css'
import logingif from '../Assets/Videos/userlogingif.gif';

const UserLoginPage = () => {
  let [email, setemail] = useState("")
  let [password, setpassword] = useState("")

  let navigate = useNavigate()

  function verify(e) {
    e.preventDefault()
    axios.post(`http://localhost:8080/api/admins/verify-by-email?email=${email}&password=${password}`)
      .then((res) => {
        navigate('/userhomepage')
        alert("Login Successful")
      })
      .catch((err) => {
        alert("Invalid Email id or password")
      })

  }

  return (
    <div className='userloginpage'>

      <div className="gif">
        <img src={logingif} alt="" />
      </div>


      <form onSubmit={verify} action="">

        <label htmlFor="">Email</label>
        <input type="email" placeholder='Email' required value={email} onChange={(e) => { setemail(e.target.value) }} />

        <label htmlFor="">Password</label>
        <input type="password" placeholder='Password' required value={password} onChange={(e) => { setpassword(e.target.value) }} />

        <button className='btn btn-primary'>Login</button>

        <p>New User? <Link to="/usersignup">Register here</Link></p>

      </form>

    </div>
  )
}

export default UserLoginPage