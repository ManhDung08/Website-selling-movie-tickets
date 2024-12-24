import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  const [selectedSeats, setSelectedSeats] = useState([]); // Lưu danh sách ghế đã chọn
  const [totalAmount, setTotalAmount] = useState(0); // Lưu tổng tiền

  const handleSeatClick = (seat, seatClass,index) => {
    const seatPrice =
      seatClass === "seatroom__pos__vip"  & index <= 17  & index >=4
        ? 200
        : seatClass === "seatroom__pos__Couple"  & index <= 17  & index >=4
        ? 300
        : 100;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
      setTotalAmount(totalAmount - seatPrice);
    } else {
      setSelectedSeats([...selectedSeats, seat]);
      setTotalAmount(totalAmount + seatPrice);
    }
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
        <p className="flex justify-between">
          <span>Tổng tiền</span>
          <b className="text-green-500" id="TotalAmout">
            {totalAmount} đ
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
          <button className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700">
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatRoom;
