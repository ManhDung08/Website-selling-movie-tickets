import React, { useEffect, useState } from "react";
import CardComp from "../Components/CardComp/CardComp";

import NavbarComp from "../Components/Navbar/NavbarComp";
import FooterComp from "../Components/Footer/FooterComp";
import Slider from "../Components/Slider";
import { getProductData } from "../services/productService";
import { Link } from "react-router-dom";

export default function Home() {
    const [listFirm,setListFirm] = useState([])
    const fetchData = async() =>{
        const res = await getProductData();
        if(res.status === 'success'){
            setListFirm(res.data.movies)
        }
    }
    
    useEffect(()=>{
        fetchData();
    },[])
    return ( 

        <div >
            <NavbarComp></NavbarComp>
        <div className="container max-w-screen-xl	 mx-auto">
            <div className="py-3 sm:py-6">
            <h1 className="text-center text-xl sm:text-6xl font-bold mt-2 	tracking-tighter	 uppercase">Phim đang chiếu</h1>
            </div>
            <div className="flex container mx-auto my-2 flex-row *:basis-1/2 sm:*:basis-1/4   flex-wrap  *:shrink-0  *:p-3 justify-center ">
{/* <Slider filmProfiles={listFirm?.filter((film) => film.status === "available")}></Slider> */}
<Slider filmProfiles={listFirm}></Slider>
            </div>
            <div className="flex justify-center">
            <Link className="!z-10 p-2 m-auto uppercase text-center col-span-2 sm:col-span-1 text-yellow-400 border-2 border-yellow-500 hover:bg-yellow-500 hover:text-black"
                to="/Showing"
                state={{ listFirm }}>Xem thêm</Link>      
            </div>
           
        </div>  
        <div className="container max-w-screen-xl	 mx-auto">
            <div className="py-3 sm:py-6">
            <h1 className="text-center text-xl sm:text-6xl font-bold mt-2 	tracking-tighter	 uppercase">Phim sắp chiếu</h1>
            </div>
            <div className="flex container mx-auto flex-row *:basis-1/2 sm:*:basis-1/4   flex-wrap  *:shrink-0  *:p-3 justify-center ">
{/* <Slider filmProfiles={listFirm?.filter((film) =>  film.status === "coming-soon")}></Slider> */}
<Slider filmProfiles={listFirm}></Slider>
            </div>
            <div className="flex justify-center">
            <Link className="!z-10 p-2 m-auto my-2 uppercase text-center col-span-2 sm:col-span-1 text-yellow-400 border-2 border-yellow-500 hover:bg-yellow-500 hover:text-black"
                to={{
                pathname: "/Upcoming",
                state: { listFirm},
            }}>Xem thêm</Link>
                          
            </div>
           
        </div>  
            <FooterComp></FooterComp>
        </div>
        
    );
}



