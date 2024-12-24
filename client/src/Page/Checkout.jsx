import React from 'react'
import NavbarComp from '../Components/Navbar/NavbarComp'
import FooterComp from '../Components/Footer/FooterComp'
import SeatRoom from '../Components/SeatRoom/SeatRoom '
import { useLocation } from 'react-router-dom'

const Checkout = () => {
  const location = useLocation();
  const data = location.state || {}; 
  return (
    <div>
        <NavbarComp></NavbarComp>
        <SeatRoom data={data}></SeatRoom>
        <FooterComp></FooterComp>
    </div>
  )
}

export default Checkout
