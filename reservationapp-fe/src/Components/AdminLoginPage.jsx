import React, { useState } from 'react'
import '../Styles/AdminLoginPage.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import logingif from '../Assets/Videos/userlogingif.gif';

const AdminLoginPage = () => {

  let [email, setemail] = useState("")
  let [password, setpassword] = useState("")

  let navigate = useNavigate()

  function verify(e) {
    e.preventDefault()
    axios.post(`http://localhost:8080/api/admins/verify-by-email?email=${email}&password=${password}`)
      .then((res) => {
        navigate('/adminhomepage')
        alert("Login Successful")
        console.log(res.data.data);
        localStorage.setItem("Admin", JSON.stringify(res.data.data))
      })
      .catch((err) => {
        alert("Invalid Email id or password")
      })

  }


  return (
    <div className='adminloginpage'>

      <div className="gif">
        <img src={logingif} alt="" />
      </div>

      <form onSubmit={verify} action="">

        <label htmlFor="">Email</label>
        <input type="email" placeholder='Email' required value={email} onChange={(e) => { setemail(e.target.value) }} />

        <label htmlFor="">Password</label>
        <input type="password" placeholder='Password' required value={password} onChange={(e) => { setpassword(e.target.value) }} />

        <button className='btn btn-primary'>Login</button>

        <p>New Admin? <Link to="/adminsignup">Register here</Link>
          <br />
          <Link to="/forgot-password">forgot password?</Link>
        </p>


      </form>


    </div>
  )
}

export default AdminLoginPage