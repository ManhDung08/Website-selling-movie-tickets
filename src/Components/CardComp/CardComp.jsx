import React from 'react'

export default function CardComp(filmProfile) {
    return (

            <div className="flex flex-col group ">
                <a href="">
                    <div className="w-full relative  overflow-hidden border-2 border-white">
                        <img className="object-cover aspect-[2/3] w-full"
                            src={filmProfile.img}
                            alt=""/>
                        <div
                            className="absolute top-0 left-0 flex opacity-100 translate-y-0 group-hover:opacity-0 group-hover:-translate-y-11 transition-all duration-300 ease-in-out">
                            <div className="p-2 bg-orange-500 "> <span
                                    className="border-2 p-0.5 border-black rounded h-2 text-xs">filmProfile.displayType</span></div>
                            <div className="bg-red-500 flex flex-col p-2">
                                <p className="text-center "> </p>
                                <span className="text-center text-[5px] text-white bg-black mx-auto">filmProfile.adult</span>
                            </div>
                        </div>
                        <div
                            className="absolute flex flex-col text-white bg-black/[0.7] top-0 left-0 bottom-0 right-0 flex opacity-0 translate-y-11 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
                            <div className="my-auto px-2">
                                <p className="text-ellipsis text-center my-5 uppercase line-clamp-2 ">{filmProfile.name}</p>
                                <div className="flex mb-2">
                                    <img alt="" loading="lazy" width="24" height="24" decoding="async" data-nimg="1"
                                        className="me-2" src="https://cinestar.com.vn/assets/images/icon-tag.svg"
                                        style={{color: "transparent"}}/>
                                    <span className="text-xs">Kinh Dị</span>
                                </div>
                                <div className="flex mb-2">
                                    <img alt="" loading="lazy" width="24" height="24" decoding="async" data-nimg="1"
                                        className="me-2" src="https://cinestar.com.vn/assets/images/icon-tag.svg"
                                        style={{color: "transparent"}}/>
                                    <span className="text-xs">Kinh Dị</span>
                                </div>
                                <div className="flex mb-2">
                                    <img alt="" loading="lazy" width="24" height="24" decoding="async" data-nimg="1"
                                        className="me-2" src="https://cinestar.com.vn/assets/images/icon-tag.svg"
                                        style={{color: "transparent"}}/>
                                    <span className="text-xs">Kinh Dị</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </a>
                <div className='flex flex-col '>
                   
                        <a className="" href="">
                            <p className="text-ellipsis text-center my-5 uppercase line-clamp-2 ">{filmProfile.name}</p>
                        </a>
                        
                  
                </div>
                <div className="grid grid-cols-2 mt-auto">
                            <a className="flex py-2 hidden sm:flex" data-fancybox="true"
                                href="https://youtu.be/TdhESC_Qz-8">
                                <img alt="" loading="eager" width="23" height="23"
                                    src="https://cinestar.com.vn/assets/images/icon-play-vid.svg"
                                    style={{color: "transparent"}}/><span className="text-sm underline">Xem Trailer</span></a>
                             <div className="relative px-3 sm:py-2 py-5 bg-yellow-500  col-span-2 sm:col-span-1">
                                <div
                                    className="absolute inset-y-0 left-0 right-[100%] bg-purple-600 duration-700 group-hover:right-0 transition-all hover:ease-in-out text-white">

                                </div>
                                <div className="absolute inset-0 text-black z-10 text-center flex duration-700 group-hover:text-white"><a className="m-auto uppercase text-center col-span-2 sm:col-span-1 bg "
                                    href="">đặt vé</a></div>
                            </div>
                        </div>
            </div>
            


      
        
   
    )
}