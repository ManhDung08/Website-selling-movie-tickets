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
import MovieDetail from './Page/MovieDetail'

export default function App() {
  return (
    <div className='bg-white-400'>
     
       
     
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Showing" element={<Showing />} />
          <Route path="/Upcoming" element={<Upcoming />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
   
  )
}
