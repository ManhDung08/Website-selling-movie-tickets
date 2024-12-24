import React, { useEffect, useState } from 'react'
import FooterComp from '../Components/Footer/FooterComp'
import NavbarComp from '../Components/Navbar/NavbarComp'
import { Link, useParams } from 'react-router-dom'
import { getProductDetail } from '../services/productService'

const FirmDetail = () => {
  const { id } = useParams();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [productDetail, setProductDetail] = useState({});
  const [selectedDistrict, setSelectedDistrict] = useState("Hoàng Mai");
  console.log('productDetail', productDetail)
  const cinemas = [
    {
      district: "Thanh Xuân",
      title: "Beta Cinemas",
      count: "3 rạp",
      branches: [
        {
          name: "Beta Trần Quang Khải",
          address: "123 Trần Quang Khải, Thanh Xuân, Hà Nội",
          showtimes: ["10:00", "12:30", "15:00", "18:00", "20:30"],
        },
        {
          name: "Beta Quang Trung",
          address: "456 Quang Trung, Gò Vấp, Hà Nội",
          showtimes: ["09:00", "11:30", "14:00", "16:30", "19:00"],
        },
        {
          name: "Beta Ung Văn Khiêm",
          address: "789 Ung Văn Khiêm, Giải Phóng, Hà Nội",
          showtimes: ["08:30", "10:30", "13:00", "17:00", "21:00"],
        },
      ],
    },
    {
      district: "Mỹ Đình",
      title: "CGV Cinemas ",
      count: "2 rạp",
      branches: [
        {
          name: "CGV Vincom Sky Lake",
          address: "72 Phạm Hùng, Giải Phóng, Hà Nội",
          showtimes: ["09:00", "12:00", "15:30", "19:00", "22:00"],
        },
        {
          name: "CGV Crescent Mall",
          address: "101 Đường Mỹ Đình, Mỹ Đình, Hà Nội",
          showtimes: ["10:15", "13:45", "16:30", "20:00", "23:00"],
        },
      ],
    },
    {
      district: "Giải Phóng",

      title: "Lotte Cinemas ",

      count: "4 rạp",

      branches: [

        {

          name: "Lotte Nguyễn Văn Lượng",

          address: "12 Nguyễn Văn Lượng, Giải Phóng, Hà Nội",

          showtimes: ["08:45", "11:00", "13:30", "17:30", "20:45"],

        },

        {

          name: "Lotte Hai Bà Trưng",

          address: "20 Lữ Gia, Hai Bà Trưng, Hà Nội",

          showtimes: ["09:15", "12:30", "15:45", "18:45", "21:30"],

        },

        {

          name: "Lotte Cộng Hòa",

          address: "555 Cộng Hòa, Tân Bình, Hà Nội",

          showtimes: ["10:00", "13:00", "16:00", "19:00", "22:00"],

        },

        {

          name: "Lotte Thủ Đức",

          address: "268 Võ Văn Ngân, Thủ Đức, Hà Nội",

          showtimes: ["09:00", "11:30", "14:00", "16:30", "19:30"],

        },

      ],

    },

    {

      district: "Hoàng Mai",
      title: "Lotte Cinemas",
      count: "4 rạp",
      branches: [
        {
          name: "Lotte Nguyễn Văn Lượng",
          address: "12 Nguyễn Văn Lượng, Gò Vấp, Hà Nội",
          showtimes: ["08:45", "11:00", "13:30", "17:30", "20:45"],
        },
        {
          name: "Lotte Phú Thọ",
          address: "20 Lữ Gia, Hoàng Mai1, Hà Nội",
          showtimes: ["09:15", "12:30", "15:45", "18:45", "21:30"],
        },
        {
          name: "Lotte Cộng Hòa",
          address: "555 Cộng Hòa, Tân Bình, Hà Nội",
          showtimes: ["10:00", "13:00", "16:00", "19:00", "22:00"],
        },
        {
          name: "Lotte Thủ Đức",
          address: "268 Võ Văn Ngân, Thủ Đức, Hà Nội",
          showtimes: ["09:00", "11:30", "14:00", "16:30", "19:30"],
        },
      ],
    },
    {

      district: "Mỹ Đình",

      title: "Beta Cinemas",

      count: "3 rạp",

      branches: [

        {

          name: "Beta Trần Quang Khải",

          address: "123 Trần Quang Khải, Hoàng Mai, Hà Nội",

          showtimes: ["10:00", "12:30", "15:00", "18:00", "20:30"],

        },

        {

          name: "Beta Quang Trung",

          address: "456 Quang Trung, Gò Vấp, Hà Nội",

          showtimes: ["09:00", "11:30", "14:00", "16:30", "19:00"],

        },

        {

          name: "Beta Ung Văn Khiêm",

          address: "789 Ung Văn Khiêm, Giải Phóng, Hà Nội",

          showtimes: ["08:30", "10:30", "13:00", "17:00", "21:00"],

        },

      ],

    },

    {

      district: "Giải Phóng",

      title: "Beta Cinemas",

      count: "3 rạp",

      branches: [

        {

          name: "Beta Trần Quang Khải",

          address: "123 Trần Quang Khải, Hoàng Mai, Hà Nội",

          showtimes: ["10:00", "12:30", "15:00", "18:00", "20:30"],

        },

        {

          name: "Beta Quang Trung",

          address: "456 Quang Trung, Gò Vấp, Hà Nội",

          showtimes: ["09:00", "11:30", "14:00", "16:30", "19:00"],

        },

        {

          name: "Beta Ung Văn Khiêm",

          address: "789 Ung Văn Khiêm, Giải Phóng, Hà Nội",

          showtimes: ["08:30", "10:30", "13:00", "17:00", "21:00"],

        },

      ],

    },

    {

      district: "Quận 4",

      title: "Beta Cinemas",

      count: "3 rạp",

      branches: [

        {

          name: "Beta Trần Quang Khải",

          address: "123 Trần Quang Khải, Hoàng Mai, Hà Nội",

          showtimes: ["10:00", "12:30", "15:00", "18:00", "20:30"],

        },

        {

          name: "Beta Quang Trung",

          address: "456 Quang Trung, Gò Vấp, Hà Nội",

          showtimes: ["09:00", "11:30", "14:00", "16:30", "19:00"],

        },

        {

          name: "Beta Ung Văn Khiêm",

          address: "789 Ung Văn Khiêm, Giải Phóng, Hà Nội",

          showtimes: ["08:30", "10:30", "13:00", "17:00", "21:00"],

        },

      ],

    },
  ];
  const filteredCinemas = cinemas.filter(cinema => cinema.district === selectedDistrict);

  console.log('filteredCinemas', filteredCinemas)
  const [openItems, setOpenItems] = useState(
    cinemas.map(() => false)
  );
  const toggleItem = (index) => {
    setOpenItems((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };
  const handleClick = (index) => {
    setSelectedIndex(index);
  };
  const fetchData=async(id)=>{
    const res = await getProductDetail(id)
    console.log('res', res)
    if(res.status === "success"){
        setProductDetail(res.data)
      }
  }
  const uniqueDistricts = [...new Set(cinemas.map(cinema => cinema.district))];
  useEffect(()=>{
    fetchData(id)
  },[])
  return (
    <div>
      <NavbarComp></NavbarComp>
      <div className="bg-slate-900 text-white py-4">
          <div className="container mx-auto">
              <div className="flex gap-3">
                  <div className="flex justify-center">
                      <Link className="w-full" to="/detail" title="Mufasa: Vua Sư Tử">
                          <img className="img-fluid rounded border ls-is-cached lazyloaded" width={166} height={248} alt={productDetail.title} src={productDetail.poster}/>
                      </Link>
                  </div >
                  <div className='max-w-[950px]'>
                    <h1 className='text-3xl ml-4 font-bold mb-4' >
                      <Link to="" title={productDetail.title}>
                        {productDetail.title}
                      </Link>
                    </h1>
                    <div className='grid grid-cols-5'>
                      <div className='col-span-3 px-4'>
                          <Link>
                            <div className='mb-4'>
                              <span className='text-sm mr-4 border p-1 px-2 bg-white text-slate-900 rounded-md '>
                                Thích
                              </span>
                              <span className='text-sm mr-4 border p-1 px-2 bg-white text-slate-900 rounded-md '>
                                Đánh giá
                              </span>
                              <span className='text-sm mr-4 border p-1 px-2 rounded-md '>
                                Trailer
                              </span>
                              <span className='text-sm mr-4 border p-1 px-2 bg-red-600 border-red-600 rounded-md '>
                                Mua vé
                              </span>
                            </div>
                            <p className='mb-4'>
                            {productDetail.description}
                            </p>
                            <div className='flex gap-4'>
                              <div>
                                <p className='flex gap-2 font-bold'>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                                  </svg>
                                  Ngôn ngữ
                                  
                                </p>
                                <p>{productDetail.language}</p>
                              </div>
                              <div>
                                <p className='flex gap-2 font-bold'>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                  </svg>
                                  Thời lượng
                                </p>
                                <p>{productDetail.duration} phút</p>
                              </div>
                            </div>
                          </Link>
                      </div>
                      <div className='col-span-2 px-4'>
                        <div>
                          <p className='font-bold'>Diễn viên</p>
                          {productDetail?.cast?.map((data,index)=>(
                            <>
                              <span className='text-red-500'>{data}</span>
                              {index < productDetail.cast.length - 1 && <span className="mr-1">,</span>}
                            </>
                          ))}
                        </div>
                        <div>
                          <p className='mt-2 font-bold'>Thể loại</p>
                          {productDetail?.genre?.map((data,index)=>(
                            <>
                              <span className='text-red-500'>{data}</span>
                              {index < productDetail.cast.length - 1 && <span className="mr-1">,</span>}
                            </>
                          ))}
                        </div>
                        <div className='mt-2'>
                          <p className='font-bold'>Nhà sản xuất</p>
                          <span className='text-red-500'>{productDetail.director}</span>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
      </div>
      <div className='container mx-auto'>
        <h1 className='font-bold text-3xl text-center my-4'>Mua vé trực tuyến</h1>
        <div className='w-[734px]'>
          <div className=' p-4 border rounded-md'>
          <select className='w-full border rounded-md px-3 py-2' onChange={(e) => setSelectedDistrict(e.target.value)} >

{uniqueDistricts.map(district => (

  <option key={district} value={district}>

    {district}

  </option>

))}

              </select>
          </div>
          <div className='my-4 bg-[#edf2f9] border rounded-md'>
            <div className="flex space-x-1">
              {['24/12', '25/12', '26/12', '27/12', '28/12', '29/12'].map((date, index) => (
                <span
                  key={index}
                  className={`w-full text-center hover:bg-[#d0ddef] ${selectedIndex === index ? 'bg-[#95aac9]' : ''}`}
                  onClick={() => handleClick(index)}
                >
                  {date}
                  <br />
                  Th3
                </span>
              ))}
            </div>
          </div>
          <div className='border rounded-md mb-4'>
          {filteredCinemas.map((cinema, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  openItems[index] ? "max-h-96" : "max-h-[74px]"
                } overflow-hidden border`}
              >
                {/* Header */}
                <div
                  className="py-3 px-5 flex items-center gap-4 bg-[#edf2f9] cursor-pointer"
                  onClick={() => toggleItem(index)} // Xử lý toggle
                >
                  <div>
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://cdn.moveek.com/storage/media/cache/square/5fffb2fcaf3c1018282624.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="font-bold">{cinema.title}</p>
                    <span className="text-xs text-slate-500">{cinema.count}</span>
                  </div>
                </div>
                {cinema.branches.map((branch, i) => (
                  <div key={i} className="py-3 px-5 cursor-pointer">
                    <div className=''>
                      <p>{branch.name}</p>
                      <span className='text-xs text-black'>{branch.address}</span>
                      <div className='mt-2'>
                        {branch.showtimes.map((data,index)=>(
                          <span onClick={()=> window.location.href="/checkout"} className='p-1 px-2 border rounded-md mr-2 hover:bg-slate-800 hover:text-white'>
                            {data}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <FooterComp></FooterComp>
    </div>
  )
}

export default FirmDetail
