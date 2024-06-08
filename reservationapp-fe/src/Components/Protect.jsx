import React from 'react'
import { Navigate } from 'react-router-dom'

const Protect = ({Child}) => {
    let x = localStorage.getItem("Admin")

    function verify(){
        if(x==null){
            return false;
        }else{
            return true;
        }
    }
  return (
    <div>
        {verify()?<Child/>:<Navigate to='/adminlogin'/>}
    </div>
  )
}

export default Protect