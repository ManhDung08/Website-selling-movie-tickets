import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const jsonData = {
  Position: [
    { ID_Position: 1, PositionName: "A" },
    { ID_Position: 2, PositionName: "B" },
    { ID_Position: 3, PositionName: "C" },
    { ID_Position: 4, PositionName: "D" },
    { ID_Position: 5, PositionName: "E" },
    { ID_Position: 6, PositionName: "F" },
    { ID_Position: 7, PositionName: "G" },
    { ID_Position: 8, PositionName: "H" },
    { ID_Position: 9, PositionName: "J" },
    { ID_Position: 10, PositionName: "K" },
    { ID_Position: 11, PositionName: "L" },
  ],
};

const SeatRoom = () => {
  const [seats, setSeats] = useState([]);
  const navigate = useNavigate();

  const user = useSelector((state)=>state.user).id

  const [selectedSeats, setSelectedSeats] = useState([]);

  const [totalAmount, setTotalAmount] = useState(0); 

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [snacks, setSnacks] = useState([

    { id: 1, name: "Bỏng Ngô", price: 50000, checked: false },

    { id: 2, name: "Coca Cola", price: 30000, checked: false },

    { id: 3, name: "Pepsi", price: 30000, checked: false },

    { id: 4, name: "Combo 1", price: 100000, checked: false },

    { id: 5, name: "Combo 2", price: 150000, checked: false },

    { id: 6, name: "Combo 3", price: 300000, checked: false },

  ]); 

  const formattedPrice = (price) => {

    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  };
  const handleSeatClick = (seat, seatClass,index) => {
    const seatPrice =
      seatClass === "seatroom__pos__vip"  & index <= 17  & index >=4
        ? 200000
        : seatClass === "seatroom__pos__Couple"  & index <= 17  & index >=4
        ? 300000
        : 100000;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
      setTotalAmount(totalAmount - seatPrice);
    } else {
      setSelectedSeats([...selectedSeats, seat]);
      setTotalAmount(totalAmount + seatPrice);
    }
  };

  const handleSnackChange = (id) => {

    setSnacks((prevSnacks) =>

      prevSnacks.map((snack) => {

        if (snack.id === id) {

          const updatedSnack = { ...snack, checked: !snack.checked };

  

          // Cập nhật tổng tiền

          if (updatedSnack.checked) {

            setTotalAmount((prevTotal) => prevTotal + updatedSnack.price);

          } else {

            setTotalAmount((prevTotal) => prevTotal - updatedSnack.price);

          }

  

          return updatedSnack;

        }

        return snack;

      })

    );

  };



  const handleSnackConfirm = () => {

    setIsModalOpen(false);

  };

  const printSeatMan = (posName, seatClass) => {
    return (
      <div key={posName} className={`seatroom__pos ${seatClass} flex mb-4 items-center`}>
        <span className="seatroom__pos__name w-12">{posName}</span>
        <div className="seatroom__pos__seats flex">
          {[...Array(20)].map((_, index) => {
            const seat = `${posName}${index}`;
            const isSelected = selectedSeats.includes(seat);

            return (
              <div
                key={seat}
                onClick={() => handleSeatClick(seat, seatClass,index)}
                className={`seat ${
                  isSelected
                    ? "bg-green-500"
                    : seatClass === "seatroom__pos__vip" & index <= 17  & index >=4
                    ? "bg-yellow-400"
                    : seatClass === "seatroom__pos__Couple" & index <= 17  & index >=4
                    ? "bg-blue-400"
                    : "bg-red-500"
                } text-white w-8 h-8 flex items-center justify-center border rounded-md ${
                  index === 17 || index === 3 ? "mr-20" : "mr-2"
                } cursor-pointer`}
              >
                {posName}{index}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const handleCheckout = () => {

    const Snacks = snacks.filter((snack) => snack.checked);

    console.log('Snacks', Snacks)

    const idOrder = `order-${Date.now()}`;



  const checkoutData = {

    user,

    idOrder,

    Snacks,

    selectedSeats,

    totalAmount,

  };

  const orders = JSON.parse(localStorage.getItem("checkoutData")) || [];

  orders.push(checkoutData);

  localStorage.setItem("checkoutData", JSON.stringify(orders));

    alert("Đặt vé thành công");

    navigate("/order"); 

  };
  useEffect(() => {
    const data = jsonData;

    const generatedSeats = data.Position.map((pos) => {
      let seatClass = "seatroom__pos__normal";
      if (["E", "F", "G", "H", "J", "K"].includes(pos.PositionName)) {
        seatClass = "seatroom__pos__vip";
      } else if (pos.PositionName === "L") {
        seatClass = "seatroom__pos__Couple";
      }
      return printSeatMan(pos.PositionName, seatClass);
    });

    setSeats(generatedSeats);
  }, [selectedSeats]);

  return (
    <div className="seatroom__man container mx-auto flex justify-between">
      <div>
        <div className="flex items-center gap-4">
          <img
            className="w-20 h-20 rounded-full"
            src="https://cdn.moveek.com/storage/media/cache/square/5fffb2fcaf3c1018282624.png"
            alt=""
          />
          <h1 className="font-bold  text-xl">Beta Cinemas</h1>
        </div>
        <img className="w-[992px]" src="assets/imgs/screen.png" alt="" />
        {seats}
        <div className="flex gap-20 mt-4 justify-center max-w-[992px]">
            <div>
                <div className=" w-8 h-8 bg-green-500 border rounded-md"></div>
                <span>Ghế đã chọn</span>
            </div>
            <div>
                <div className=" w-8 h-8 bg-red-500 border rounded-md"></div>
                <span>Thường</span>
            </div>
            <div>
                <div className=" w-8 h-8 bg-yellow-400 border rounded-md"></div>
                <span>Vip</span>
            </div>
            <div>
                <div className=" w-8 h-8 bg-blue-400 border rounded-md"></div>
                <span>Couple</span>
            </div>
        </div>
      </div>
      <div className="w-full p-20 font-bold">
        <h1>Mufasa: Vua Sư Tử</h1>
        <p>Beta Tân Uyên</p>
        <p>
          Suất <b>12:00 24/12/2024</b>
        </p>
        <h3 className="font-bold mb-2">Ghế đã chọn:</h3>

{selectedSeats.map((data)=>(

  <li key={data}>

    {data}

  </li>

))}

<p className="text-red-400 hover:underline cursor-pointer" onClick={() => setIsModalOpen(true)} >Chọn thêm bỏng và nước</p>

{snacks.filter((snack) => snack.checked).length > 0 && (

    <div className="mt-2">

      <h3 className="font-bold mb-2">Bỏng ngô và nước đã chọn:</h3>

      <ul>

        {snacks

          .filter((snack) => snack.checked)

          .map((snack) => (

            <li key={snack.id}>

              {snack.name} - {formattedPrice(snack.price)}

            </li>

          ))}

      </ul>

    </div>

  )}
        <p className="flex justify-between">
          <span>Tổng tiền</span>
          <b className="text-green-500" id="TotalAmout">
          {formattedPrice(totalAmount)}
          </b>
        </p>
        <p className="flex gap-2 text-red-400 font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
          Vé đã mua không thể đổi hoặc hoàn tiền
        </p>
        <div className="flex justify-between mt-4 ">
          <Link
            className=" py-2 px-6 rounded-md border border-spacing-2 hover:bg-slate-500"
            to="/detail"
          >
            Quay lại
          </Link>
          <button onClick={handleCheckout} className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700">
            Thanh toán
          </button>
        </div>
      </div>
      {isModalOpen && (

<div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

<div className="bg-white p-6 rounded-md w-80">

  <h2 className="text-lg font-bold mb-4">Chọn bỏng và nước</h2>

  <ul>

    {snacks.map((snack) => (

      <li key={snack.id} className="flex items-center mb-2">

        <input

          type="checkbox"

          checked={snack.checked}

          onChange={() => handleSnackChange(snack.id)}

          className="mr-2"

        />

        <span>

          {snack.name} - {formattedPrice(snack.price)}

        </span>

      </li>

    ))}

  </ul>

  <div className="flex justify-end mt-4">

    <button

      className="bg-red-600 text-white py-2 px-4 rounded-md mr-2"

      onClick={() => setIsModalOpen(false)}

    >

      Hủy

    </button> 

    <button

      className="bg-green-600 text-white py-2 px-4 rounded-md"

      onClick={handleSnackConfirm}

    >

      OK

    </button>

  </div>

</div>

</div>



)}
    </div>
  );
};

export default SeatRoom;
