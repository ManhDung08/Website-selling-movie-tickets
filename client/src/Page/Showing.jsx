import React, { useEffect, useState } from "react";
import CardComp from "../Components/CardComp/CardComp";
import NavbarComp from "../Components/Navbar/NavbarComp";
import FooterComp from "../Components/Footer/FooterComp"
import { useLocation } from "react-router-dom";
export default function Showing() {
    const location = useLocation();
    const data = location.state;
    const [filmProfiles,setFilmProfiles] = useState([])
    useEffect(()=>{
        if(data){
            setFilmProfiles(data.listFirm)
        }
    },[data])
    

    return (
        <div >
            <NavbarComp></NavbarComp>
        <div className="container max-w-screen-xl	 mx-auto">
            <div className="py-3 sm:py-6">
            <h1 className="text-center text-xl sm:text-6xl font-bold mt-2 	tracking-tighter	 uppercase">Phim đang chiếu</h1>
            </div>
            <div className="flex container mx-auto flex-row *:basis-1/2 sm:*:basis-1/4   flex-wrap  *:shrink-0  *:p-3 justify-center ">
                {filmProfiles
                    // .filter((film) => film.isShowing) // Lọc chỉ phim đang chiếu
                    .map((filmProfile) => (
                        <CardComp key={filmProfile.name} {...filmProfile} />
                    ))}
            </div>
           
        </div>
            <FooterComp></FooterComp>
        </div>

    );
}



