import logo from './logo.svg';
import './App.css';
import FooterComp from './Components/Footer/FooterComp';
import Navbar from './Components/Navbar/NavbarComp';
import NavbarComp from './Components/Navbar/NavbarComp';
import CardComp from './Components/CardComp/CardComp';
import Home from './Page/Home';
import Slider from './Components/Slider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Showing from './Page/Showing';
import Upcoming from './Page/Upcoming';
import FirmDetail from './Page/FirmDetail';
import Checkout from './Page/Checkout';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './redux/userSlice';
import { jwtDecode } from 'jwt-decode';
import OrderList from './Page/Order';

export default function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const { userId, username } = decoded;
        dispatch(setUser({ userId, username, token }));
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, [dispatch,token]);
  return (
    <div className=''>
     
       
     
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Showing" element={<Showing />} />
          <Route path="/Upcoming" element={<Upcoming />} />
          <Route path="/detail/:id" element={<FirmDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order" element={<OrderList />} />
          
        </Routes>
      </BrowserRouter>
    </div>
   
  )
}
