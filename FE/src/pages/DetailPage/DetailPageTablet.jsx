import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movieService } from "../../service/service";
import { Progress, Rate, ConfigProvider, Tabs } from "antd";
import moment from "moment";
import { SET_MALICHCHIEU } from "../../redux/constant/user";
import { useDispatch } from "react-redux";
const onChange = (key) => {
  console.log("key", key);
};

export default function DetailPageTablet() {
  let USER = JSON.parse(localStorage.getItem("USER")) || false;
  console.log("USER", USER);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  //detail id
  let { id } = useParams();
  const [detail, setDetail] = useState();
  console.log("detail", detail);
  const [rapCoChieu, setRapCoChieu] = useState();
  console.log("id", id);
  console.log("rapcochieu", rapCoChieu);

  // detail phim
  useEffect(() => {
    movieService
      .getDetail(id)
      .then((res) => {
        setDetail(res.data.content);
        console.log("resdetail", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //lay ds rap theo phim
  useEffect(() => {
    movieService
      .getBroadcastScheduleByMovie(id)
      .then((res) => {
        setRapCoChieu(res.data.content);
        console.log("res movie", res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //render rap - lich chieu
  const [heThongRap, setHeThongRap] = useState([]);
  console.log("heThongrap", heThongRap);
  useEffect(() => {
    movieService
      .getMovieByTheater()
      .then((res) => {
        setHeThongRap(res.data.content);
        console.log("movieby theater", res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let renderHeThongRap = () => {
    return rapCoChieu?.heThongRapChieu.map((heThong) => {
      return {
        key: heThong.maHeThongRap,
        label: <img src={heThong.logo} className="w-16"></img>,
        children: (
          <Tabs
            style={{
              height: 600,
            }}
            tabPosition="left"
            items={heThong.cumRapChieu.map((cumRap) => {
              return {
                key: cumRap.tenCumRap,
                label: (
                  <div className="text-left w-96 whitespace-normal">
                    <p>{cumRap.tenCumRap}</p>
                    <p>{cumRap.diaChi}</p>
                    {cumRap.lichChieuPhim?.map((lich) => {
                      return (
                        <span
                          onClick={() => {
                            dispatch({
                              type: SET_MALICHCHIEU,
                              payload: lich.maLichChieu,
                            });
                            localStorage.setItem(
                              "SCHEDULE",
                              JSON.stringify(lich.maLichChieu)
                            );
                            if (USER == false) {
                              navigate(`/login`);
                            } else {
                              navigate(`/booking/${lich.maLichChieu}`);
                            }
                            console.log("lichchieu", id);
                          }}
                          className="rounded bg-slate-200 px-2 py-1 text-green-500 decoration-4"
                        >
                          {moment(lich.ngayChieuGioChieu).format(
                            "DD/MM/YYYY ~ HH:mm"
                          )}
                        </span>
                      );
                    })}
                  </div>
                ),
                // children: (
                //   <div
                //     style={{
                //       height: 100,
                //       overflow: "scroll",
                //     }}
                //   ></div>
                // ),
              };
            })}
          />
        ),
      };
    });
  };
  const items = [
    {
      key: "1",
      label: "LỊCH CHIẾU",
      children: (
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                /* here is your component tokens */
                // itemSelectedColor:"#fb4226",
                // itemActiveColor:"#fb4226",
                // inkBarColor:"#fb4226",
               
              },
            },
            token: {
              colorPrimary: "#fb4226",
              borderRadius: 2,
              // colorBgContainer: "#fb4226",
            },
          }}
        >
          <Tabs
            style={{
              height: 600,
              backgroundColor: "white",
              borderRadius: "10px",
            }}
            tabPosition="left"
            defaultActiveKey="1"
            items={renderHeThongRap()}
            onChange={onChange}
          />
        </ConfigProvider>
      ),
    },
    {
      key: "2",
      label: "THÔNG TIN",
      children: (
        <div style={{ padding: "24px", color:"white"}}>
          <div className="flex" style={{ fontSize: "16px" }}>
            <div style={{flex:"0 0 50%", maxWidth:"50%"}}>
              <div className="flex">
               <p style={{float:"left"}}>Ngày công chiếu:  </p> 
               <p style={{float:"left"}}> {moment(rapCoChieu?.ngayKhoiChieu).format("DD/MM/YYYY")}</p>
               
              </div>
            </div>
            <div style={{flex:"0 0 50%", maxWidth:"50%"}}>
              <div className="flex"><p style={{float:"left"}}> Nội dung</p></div>
              <div className="flex"><p style={{float:"left"}}> {rapCoChieu?.moTa}</p></div>
            </div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="flex flex-col detailBg">
      <div className="detailHeader">
        <div className="detailBGImg"></div>
        <div className="detailContent" style={{ color: "#e9e9e9" }}>
          <div className="detailContentLeft">
            <img className="" src={detail?.hinhAnh} alt="" />
          </div>
          <div className="detailContentMid">
            <p>{moment(detail?.ngayKhoiChieu).format("DD/MM/YYYY")}</p>
            <p style={{ fontSize: "24px" }}>
              <span className="tagMovie">C18</span>
              {detail?.tenPhim}
            </p>
            <button className="btnMuaVe">Mua vé</button>
          </div>
          <div className="detailContentRight">
            <Progress
              strokeWidth={8}
              size={200}
              strokeColor={"#7ed321"}
              format={(number) => {
                return <p className=" text-white text-7xl"> {number / 10}</p>;
              }}
              type="circle"
              percent={detail?.danhGia * 10}
            />
            <Rate
              allowHalf
              disabled
              defaultValue={detail?.danhGia / 2}
              count={5}
              style={{ color: "#ffb400" }}
            />
          </div>
        </div>
      </div>
      <div className="detailFooter">
      <ConfigProvider
  theme={{
    components: {
      Tabs: {
        /* here is your component tokens */
        itemColor:"white",
        itemSelectedColor:"#fb4226",
        itemHoverColor:"#f36954",
        inkBarColor:'#fb4226'
      },
    },
  }}
>
<Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          centered
          style={{
            padding: "20px 50px",
            backgroundColor: "rgb(10 13 28)",
            
          }}
        />
</ConfigProvider>
       
      </div>
    </div>
  );
}
