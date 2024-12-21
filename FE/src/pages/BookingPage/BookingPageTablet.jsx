//import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";

import { movieService } from "../../service/service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function BookingPageTablet() {
  let SCHEDULE = JSON.parse(localStorage.getItem("SCHEDULE"));
  let navigate = useNavigate();
  // const maLichChieu = useSelector((state) => state.userReducer.maLichChieu);
  const maLichChieu = SCHEDULE;
  //let { id } = useParams();
  const [number,setNumber] =useState(0);
  const [List, setList] = useState();
  const [chonGhe, setChonGhe] = useState([]);
  const [tongTien, setTongTien] = useState(0);
  const [dsVe, setDsVe] = useState([]);

  const [dataDatVe, setDataDatVe] = useState({
    maLichChieu: maLichChieu,
    danhSachVe: [
      // {
      //   maGhe: 0,
      //   giaVe: 0,
      // },
    ],
  });

  console.log("dsve", dsVe);
  console.log("datadatve", dataDatVe);

  //console.log("chonghe", chonGhe);

  //console.log("maLichChieu", maLichChieu);
  useEffect(() => {
    movieService
      .getSeatByShowTimeId(maLichChieu)
      .then((res) => {
        //console.log("content ma lich chieu", res);
        setList(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    movieService
      .getSeatByShowTimeId(maLichChieu)
      .then((res) => {
        //console.log("content ma lich chieu", res);
        setList(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [number]);
 
  useEffect(() => {
    let newDataDatVe = { ...dataDatVe, danhSachVe: dsVe };
    setDataDatVe(newDataDatVe);
  }, [dsVe]);

  let renderList = () => {
    return List?.danhSachGhe.map((item) => {
      if (item.daDat == true) {
        return (
          <label
            className="inputContainer"
            key={item.tenGhe}
            style={{ margin: "5px" }}
          >
            <input type="checkbox" />
            <span
              className="checkMarkDaDat"
              style={{ fontSize: 18, fontWeight: "bold" }}
            >
              x
            </span>
          </label>
        );
      } else if (item.loaiGhe == "Vip") {
        return (
          <label
            className="inputContainer"
            key={item.tenGhe}
            style={{ margin: "5px" }}
          >
            <input
              type="checkbox"
              onClick={(e) => {
                console.log("check", e.target.checked);
                if (e.target.checked == true) {
                  setChonGhe((chonGhe) => [...chonGhe, item.tenGhe]);
                  setDsVe((prev) => [
                    ...prev,
                    { maGhe: item.maGhe, giaVe: item.giaVe },
                  ]);
                  setTongTien((tien) => tien + item.giaVe);
                  // let newDataDatVe = { ...dataDatVe, danhSachVe: dsVe };
                  // setDataDatVe(newDataDatVe);
                } else if (e.target.checked == false) {
                  console.log("uncheck", item.tenGhe);
                  setChonGhe((chonGhe) =>
                    chonGhe.filter((i) => i !== item.tenGhe)
                  );
                  const newDsVe = dsVe.filter((d) => d.maGhe !== item.maGhe);
                  setDsVe(newDsVe);
                  setTongTien((tien) => tien - item.giaVe);
                  // let newDataDatVe = { ...dataDatVe, danhSachVe: dsVe };
                  // setDataDatVe(newDataDatVe);
                }

                //console.log(item.tenGhe)
              }}
            />
            <span
              className="checkMark checkMarkVipBG"
              style={{ fontSize: 18, fontWeight: "bold" }}
            >
              {item.tenGhe}
            </span>
          </label>
        );
      }
      return (
        <label
          className="inputContainer"
          key={item.tenGhe}
          style={{ margin: "5px" }}
        >
          <input
            type="checkbox"
            onClick={(e) => {
              console.log("check", e.target.checked);
              if (e.target.checked == true) {
                setChonGhe((chonGhe) => [...chonGhe, item.tenGhe]);
                setDsVe((prev) => [
                  ...prev,
                  { maGhe: item.maGhe, giaVe: item.giaVe },
                ]);
                setTongTien((tien) => tien + item.giaVe);
                // let newDataDatVe = { ...dataDatVe, danhSachVe: dsVe };
                // setDataDatVe(newDataDatVe);
              } else if (e.target.checked == false) {
                console.log("uncheck", item.tenGhe);
                setChonGhe((chonGhe) =>
                  chonGhe.filter((i) => i !== item.tenGhe)
                );
                const newDsVe = dsVe.filter((d) => d.maGhe !== item.maGhe);
                setDsVe(newDsVe);
                setTongTien((tien) => tien - item.giaVe);
                // let newDataDatVe = { ...dataDatVe, danhSachVe: dsVe };
                // setDataDatVe(newDataDatVe);
              }

              //console.log(item.tenGhe)
            }}
          />
          <span
            className="checkMark checkMarkBG"
            style={{ fontSize: 18, fontWeight: "bold" }}
          >
            {item.tenGhe}
          </span>
        </label>
      );
    });
  };
  let handleBooking = () => {
    // let newDataDatVe = { ...dataDatVe, danhSachVe: dsVe };
    // setDataDatVe(newDataDatVe);
    movieService
      .setBookingTicket(dataDatVe)
      .then((res) => {
        console.log(res);
        toast.success("đặt thành công");
        setNumber(number=>number+1)
        navigate(`/booking/${SCHEDULE}`)
       // window.location.href = `/booking/${SCHEDULE}`;
      })
      .catch((err) => {
        console.log("err",err);
        toast.error("đặt thất bại");
      });
  };
  console.log("ghe", List);
  return (
    <div>
      <div className="flex">
        <div className="seatInfo" style={{ flexBasis: "66.666667%" }}>
          <div style={{ width: "85%", margin: "auto", paddingTop: 50 }}>
            <div className="renderSeatTablet ">{renderList()}</div>
            <div
              style={{
                width: "50%",
                margin: "20px auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  margin: "0px 16px",
                  display: "flex",
                  textAlign: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <label
                  className="inputContainerTemp"
                  style={{ margin: "5px", cursor: "context-menu" }}
                >
                  <input type="checkbox" disabled />
                  <span
                    className="checkMarkDaDat"
                    style={{ fontSize: 18, fontWeight: "bold" }}
                  >
                    {" "}
                    x
                  </span>
                </label>
                <p> Đã đặt</p>
              </div>
              <div
                style={{
                  margin: "0px 16px",
                  display: "flex",
                  textAlign: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <label
                  className="inputContainerTemp"
                  style={{ margin: "5px", cursor: "context-menu" }}
                >
                  <input type="checkbox" disabled />
                  <span
                    className="checkMark checkMarkBG"
                    style={{ fontSize: 18, fontWeight: "bold" }}
                  ></span>
                </label>
                <p> Thường</p>
              </div>
              <div
                style={{
                  margin: "0px 16px",
                  display: "flex",
                  textAlign: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <label
                  className="inputContainerTemp"
                  style={{ margin: "5px", cursor: "context-menu" }}
                >
                  <input type="checkbox" disabled />
                  <span
                    className="checkMarkVip"
                    style={{ fontSize: 18, fontWeight: "bold" }}
                  ></span>
                </label>
                <p> Vip</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="bookingInfo "
          style={{
            flexGrow: 0,
            maxWidth: "33.333333%",
            flexBasis: "33.333333%",
          }}
        >
          <div
            style={{
              width: "100%",
              boxShadow: "0 0 5px grey",
              backgroundColor: "#fff",
            }}
          >
            <div style={{ padding: "24px 16px" }}>
              <p
                style={{
                  color: "rgb(139,195,74",
                  fontSize: "35px",
                  textAlign: "center",
                }}
              >
                {tongTien} VND
              </p>
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px 16px",
              }}
            >
              <h3>Cụm Rạp:</h3>
              <h3
                style={{
                  color: "#108f3e",
                  textAlign: "right",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                {List?.thongTinPhim.tenCumRap}
              </h3>
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px 16px",
              }}
            >
              <h3>Địa chỉ:</h3>
              <h3
                style={{
                  color: "#108f3e",
                  textAlign: "right",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                {List?.thongTinPhim.diaChi}
              </h3>
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px 16px",
              }}
            >
              <h3>Rạp:</h3>
              <h3
                style={{
                  color: "#108f3e",
                  textAlign: "right",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                {List?.thongTinPhim.tenRap}
              </h3>
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px 16px",
              }}
            >
              <h3>Ngày giờ chiếu:</h3>
              <span
                style={{
                  textAlign: "right",
                  fontSize: "16px",
                  fontWeight: "500",
                  display: "flex",
                }}
              >
                <p style={{ color: "#108f3e" }}>
                  {List?.thongTinPhim.ngayChieu} -{" "}
                </p>
                <p style={{ color: "red" }}> {List?.thongTinPhim.gioChieu}</p>{" "}
              </span>
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px 16px",
              }}
            >
              <h3>Tên phim:</h3>
              <h3
                style={{
                  color: "#108f3e",
                  textAlign: "right",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                {List?.thongTinPhim.tenPhim}
              </h3>
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px 16px",
              }}
            >
              <h3>Chọn:</h3>
              <h3
                style={{
                  color: "#108f3e",
                  textAlign: "right",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Ghế: {chonGhe.toString()}
              </h3>
            </div>
            <hr />
            <button
              style={{
                color: "#fff",
                width: "100%",
                fontSize: "25px",
                marginTop: "24px",
                borderRadius: "unset",
                backgroundColor: "#fb4226",
                padding: "6px 8px",
              }}
              onClick={handleBooking}
            >
              ĐẶT VÉ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
