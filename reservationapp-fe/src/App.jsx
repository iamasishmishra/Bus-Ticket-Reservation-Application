import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import AdminLoginPage from './Components/AdminLoginPage';
import UserLoginPage from './Components/UserLoginPage';
import AdminSignUp from './Components/AdminSignUp';
import AdminHomePage from './Components/AdminHomePage';
import PageNotFound from './Components/PageNotFound';
import UserSignUp from './Components/User/UserSignUp';
import ForgotPassword from './Components/ForgotPassword';
import Protect from './Components/Protect';
import UserHomePage from './Components/User/UserHomePage';
import About from './Components/About';
import Contact from './Components/Contact';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/*' element={<PageNotFound/>}/>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>

          {/* admin links */}
          <Route path='/adminlogin' element={<AdminLoginPage/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/adminsignup' element={<AdminSignUp/>}/>
          <Route path='/adminhomepage/*' element={<Protect Child={AdminHomePage} />} />


          {/* user links */}
          <Route path='/userlogin' element={<UserLoginPage/>}/> 
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/usersignup' element={<UserSignUp/>}/>
          <Route path='/userhomepage/*' element={<Protect Child={UserHomePage} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
