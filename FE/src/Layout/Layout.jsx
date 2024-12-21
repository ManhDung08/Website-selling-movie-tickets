
import React from 'react'
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer.jsx"
import { Outlet } from 'react-router-dom'
export default function Layout() {
  // Outlet la nhung gi ben trong Layout
  return (
    <div className='min-h-screen flex flex-col '>
        <Header/>
        <div className='flex-grow'>
       <Outlet/>
        </div>
      
        <Footer/>
    </div>
  )
}
