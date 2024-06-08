import React from 'react'
import AdminNavBar from './AdminNavBar'
import { Routes ,Route} from 'react-router-dom'
import { AdminDashBoard } from './AdminDashBoard'
import AddBus from './AddBus'
import ViewBus from './ViewBus'
import EditBus from './EditBus'

const AdminHomePage = () => {
  return (
    <div className='adminhomepage'>
        <AdminNavBar/>

        <Routes>
            <Route path='/' element={<AdminDashBoard/>}/>
            <Route path='/addbus' element={<AddBus/>}/>
            <Route path='/viewbus' element={<ViewBus/>}/>
            <Route path='/editbus/:id' element={<EditBus/>}/>
        </Routes>

    </div>
  )
}

export default AdminHomePage