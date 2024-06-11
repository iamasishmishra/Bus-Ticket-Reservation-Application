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

  function verifyUser(e) {
    e.preventDefault()
    axios.post(`http://localhost:8080/api/users/verify-by-email-and-password?email=${email}&password=${password}`)
      .then((res) => {
        console.log(res.data.data);
        navigate('/userhomepage')
        alert("Login Successful")
      })
      .catch((err) => {
        console.log(err);
        alert("Invalid Email id or password")
      })

  }

  return (
    <div className='userloginpage'>

      <div className="gif">
        <img src={logingif} alt="" />
      </div>


      <form onSubmit={verifyUser} action="">

        <label htmlFor="">Email</label>
        <input type="email" placeholder='Email' required value={email} onChange={(e) => { setemail(e.target.value) }} />

        <label htmlFor="">Password</label>
        <input type="password" placeholder='Password' required value={password} onChange={(e) => { setpassword(e.target.value) }} />

        <button className='btn btn-primary'>Login</button>

        <p>New User? <Link to="/usersignup">Register here</Link></p>

        <p><Link to="/usersignup">forgot password?</Link></p>
      </form>

    </div>
  )
}

export default UserLoginPage