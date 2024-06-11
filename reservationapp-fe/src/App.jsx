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


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/*' element={<PageNotFound/>}/>
          <Route path='/' element={<LandingPage/>}/>

          {/* admin links */}
          <Route path='/adminlogin' element={<AdminLoginPage/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/adminsignup' element={<AdminSignUp/>}/>
          <Route path='/adminhomepage/*' element={<Protect Child={AdminHomePage} />} />


          {/* user links */}
          <Route path='/userlogin' element={<UserLoginPage/>}/> 
          <Route path='/usersignup' element={<UserSignUp/>}/>
          <Route path='/adminhomepage/*' element={<Protect Child={AdminHomePage} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
