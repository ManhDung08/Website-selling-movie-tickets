import React from "react";
import CardComp from "../Components/CardComp/CardComp";

import NavbarComp from "../Components/Navbar/NavbarComp";
import FooterComp from "../Components/Footer/FooterComp";
import Slider from "../Components/Slider";

export default function Home() {
    const filmProfiles = [
        {
            name: "Avatar: The Way of Water",
            isShowing: true, // Phim đang chiếu
            displayType: "3D", // Định dạng: 2D hoặc 3D
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40" // URL ảnh poster phim
        },
        {
            name: "Spider-Man: No Way Home",
            isShowing: false, // Phim đã ngừng chiếu
            displayType: "2D", // Định dạng: 2D
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        },
        {
            name: "The Batman",
            isShowing: true,
            displayType: "IMAX", // Định dạng: IMAX
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        }
        ,
        {
            name: "Spider-Man: No Way Home",
            isShowing: false, // Phim đã ngừng chiếu
            displayType: "2D", // Định dạng: 2D
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        },
        {
            name: "The Batman",
            isShowing: true,
            displayType: "IMAX", // Định dạng: IMAX
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        }
        ,
        {
            name: "Spider-Man: No Way Home",
            isShowing: false, // Phim đã ngừng chiếu
            displayType: "2D", // Định dạng: 2D
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        },
        {
            name: "The Batman",
            isShowing: true,
            displayType: "IMAX", // Định dạng: IMAX
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        },
        {
            name: "Spider-Man: No Way Home",
            isShowing: false, // Phim đã ngừng chiếu
            displayType: "2D", // Định dạng: 2D
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        },
        {
            name: "The Batman",
            isShowing: true,
            displayType: "IMAX", // Định dạng: IMAX
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        },
        {
            name: "Spider-Man: No Way Home",
            isShowing: false, // Phim đã ngừng chiếu
            displayType: "2D", // Định dạng: 2D
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        },
        {
            name: "The Batman",
            isShowing: true,
            displayType: "IMAX", // Định dạng: IMAX
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        },
        {
            name: "Spider-Man: No Way Home",
            isShowing: false, // Phim đã ngừng chiếu
            displayType: "2D", // Định dạng: 2D
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        },
        {
            name: "The Batman",
            isShowing: true,
            displayType: "IMAX", // Định dạng: IMAX
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        },
        {
            name: "Spider-Man: No Way Home",
            isShowing: false, // Phim đã ngừng chiếu
            displayType: "2D", // Định dạng: 2D
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        },
        {
            name: "The Batman",
            isShowing: true,
            displayType: "IMAX", // Định dạng: IMAX
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        },
        {
            name: "Spider-Man: No Way Home",
            isShowing: false, // Phim đã ngừng chiếu
            displayType: "2D", // Định dạng: 2D
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        },
        {
            name: "The Batman",
            isShowing: true,
            displayType: "IMAX", // Định dạng: IMAX
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        },
        {
            name: "Spider-Man: No Way Home",
            isShowing: false, // Phim đã ngừng chiếu
            displayType: "2D", // Định dạng: 2D
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        },
        {
            name: "The Batman",
            isShowing: true,
            displayType: "IMAX", // Định dạng: IMAX
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        },
        {
            name: "Spider-Man: No Way Home",
            isShowing: false, // Phim đã ngừng chiếu
            displayType: "2D", // Định dạng: 2D
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        },
        {
            name: "The Batman",
            isShowing: true,
            displayType: "IMAX", // Định dạng: IMAX
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        },
        {
            name: "Spider-Man: No Way Home",
            isShowing: false, // Phim đã ngừng chiếu
            displayType: "2D", // Định dạng: 2D
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        },
        {
            name: "The Batman",
            isShowing: true,
            displayType: "IMAX", // Định dạng: IMAX
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        },
        {
            name: "Spider-Man: No Way Home",
            isShowing: false, // Phim đã ngừng chiếu
            displayType: "2D", // Định dạng: 2D
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        },
        {
            name: "The Batman",
            isShowing: true,
            displayType: "IMAX", // Định dạng: IMAX
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        },
        {
            name: "Spider-Man: No Way Home",
            isShowing: false, // Phim đã ngừng chiếu
            displayType: "2D", // Định dạng: 2D
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        },
        {
            name: "The Batman",
            isShowing: true,
            displayType: "IMAX", // Định dạng: IMAX
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40"
        }
    ];

    return ( 

        <div >
            <NavbarComp></NavbarComp>
        <div className="container max-w-screen-xl	 mx-auto">
            <div className="py-3 sm:py-6">
            <h1 className="text-center text-xl sm:text-6xl font-bold mt-2 	tracking-tighter	 uppercase">Phim đang chiếu</h1>
            </div>
            <div className="flex container mx-auto flex-row *:basis-1/2 sm:*:basis-1/4   flex-wrap  *:shrink-0  *:p-3 justify-center ">
<Slider filmProfiles={filmProfiles.filter((film) => film.isShowing)}></Slider>
            </div>
            <div className="flex justify-center">
            <a className="!z-10 m-auto uppercase text-center col-span-2 sm:col-span-1 text-yellow-400 border-2 border-yellow-500"
                                    href="/Showing">Xem thêm</a>
                          
            </div>
           
        </div>  
        <div className="container max-w-screen-xl	 mx-auto">
            <div className="py-3 sm:py-6">
            <h1 className="text-center text-xl sm:text-6xl font-bold mt-2 	tracking-tighter	 uppercase">Phim sắp chiếu</h1>
            </div>
            <div className="flex container mx-auto flex-row *:basis-1/2 sm:*:basis-1/4   flex-wrap  *:shrink-0  *:p-3 justify-center ">
<Slider filmProfiles={filmProfiles.filter((film) => !film.isShowing)}></Slider>
            </div>
            <div className="flex justify-center">
            <a className="!z-10 m-auto uppercase text-center col-span-2 sm:col-span-1 text-yellow-400 border-2 border-yellow-500"
                                    href="/Upcoming">Xem thêm</a>
                          
            </div>
           
        </div>  
            <FooterComp></FooterComp>
        </div>
        
    );
}



// Sẽ có 1 nhãn phân biệt đang chiêu và sắp chiếu phân tích theo mẫu 
