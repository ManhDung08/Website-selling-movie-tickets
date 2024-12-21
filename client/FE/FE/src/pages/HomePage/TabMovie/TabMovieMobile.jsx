import React, { useEffect, useState } from "react";
import { ConfigProvider, Tabs } from "antd";
import { movieService } from "../../../service/service";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { SET_MALICHCHIEU } from "../../../redux/constant/user";
import { useNavigate } from "react-router-dom";
const onChange = (key) => {
  console.log("key",key);
};

export default function TabMovieMobile() {
  let USER = JSON.parse(localStorage.getItem("USER")) || false;
  let navigate = useNavigate();
  let dispatch = useDispatch();
  
  const [heThongRap, setHeThongRap] = useState([]);
  useEffect(() => {
    movieService
      .getMovieByTheater()
      .then((res) => {
        setHeThongRap(res.data.content);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let renderHeThongRap = () => {
    return heThongRap.map((heThong) => {
      return {
        key: heThong.maHeThongRap,
        label: <img src={heThong.logo} className="w-8"></img>,
        children: (
          <Tabs
            style={{
              height: 300,
            }}
            tabPosition="left"
            items={heThong.lstCumRap.map((cumRap) => {
              return {
                key: cumRap.tenCumRap,
                label: (
                  <div className="text-left w-20 whitespace-normal">
                    <p>{cumRap.tenCumRap}</p>
                    {/* <p>{cumRap.diaChi}</p> */}
                  </div>
                ),
                children:<div 
                  style={{
            height: 300,
            overflow:"scroll",
          }}>
                  { renderDsPhim(cumRap)}
                </div>,
              };
            })}
          />
        ),
      };
    });
  };
  let renderDsPhim = (cumRap) => {
    return cumRap.danhSachPhim.map((phim) => {
      return (
        <div>
          <img
            src={phim.hinhAnh}
            alt=""
            className="w-20 h-32 object-cover"
          ></img>
          <div>
          <h3>{phim.tenPhim}</h3>
          <div className="grid grid-cols-1 gap-1">
            {phim.lstLichChieuTheoPhim.map((lichChieu)=>{
              return <span className="rounded bg-slate-200 px-1 py-1 text-green-500 decoration-4 cursor-pointer" 
              onClick={()=>{
                dispatch({
                  type:SET_MALICHCHIEU,
                  payload:lichChieu.maLichChieu,
                })
                localStorage.setItem("SCHEDULE",JSON.stringify(lichChieu.maLichChieu))
                if (USER==false) {
                  navigate(`/login`);
                } else {
                  navigate(`/booking/${lichChieu.maLichChieu}`);
                }
                console.log("lichchieu",lichChieu.maLichChieu)}}>
                  {moment(lichChieu.ngayChieuGioChieu).format("DD/MM/YY ~ HH:mm")}
                  
                  </span>
            })}
          </div>
          </div>
        
        </div>
      );
    });
  };
  return (
    <div className="container py-20">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#fb8500",
            borderRadius: 2,
            colorBgContainer: "#fb8500",
          },
        }}
      >
        <Tabs
          style={{
            height: 300,
          }}
          tabPosition="left"
          defaultActiveKey="1"
          items={renderHeThongRap()}
          onChange={onChange}
        />
      </ConfigProvider>
    </div>
  );
}
