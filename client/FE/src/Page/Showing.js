import React from "react";
import CardComp from "../Components/CardComp/CardComp";
import NavbarComp from "../Components/Navbar/NavbarComp";
import FooterComp from "../Components/Footer/FooterComp"
export default function Showing() {
    const filmProfiles = [
        {
            name: "Avatar: The Way of Water",
            id: "001",
            isShowing: true, // Phim đang chiếu
            displayType: "3D", // Định dạng: 2D hoặc 3D
            img: "https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F11-2024%2Flinh-mieu-official.png&w=256&q=40" // URL ảnh poster phim
        },
        {
            name: "Spider-Man: No Way Home",
            id: "002",
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
                {filmProfiles
                    .filter((film) => film.isShowing) // Lọc chỉ phim đang chiếu
                    .map((filmProfile) => (
                        <CardComp key={filmProfile.name} {...filmProfile} />
                    ))}
            </div>
           
        </div>
            <FooterComp></FooterComp>
        </div>

    );
}



// Sẽ có 1 nhãn phân biệt đang chiêu và sắp chiếu phân tích theo mẫu 
