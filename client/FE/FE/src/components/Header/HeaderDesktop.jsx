import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function HeaderDesktop() {
  let navigate = useNavigate();
  //let info = useSelector((state)=> {return state.userReducer.info;})
   let {info} = useSelector(state=>state.userReducer);
   console.log("🚀 ~ file: Header.jsx:9 ~ Header ~ info:", info)
   let handleLogout = ()=>{
    // vừa chuyển trang vừa reload 
    window.location.href="/"
    localStorage.clear();
    // xoá toàn bộ local storage

   }
   let renderUserNav = ()=>{
if(info){
  return (
    <>
    <div className="flex justify-start">
    <span style={{color:"rgb(155, 155, 155)"}} className="flex">
      <img 
    style={{width:"3rem",height:"100%"}}
    src="/Capture-removebg-preview.png" alt=""></img>
    <p style={{paddingTop:12,paddingRight:10}}>{info.hoTen}   </p>
    </span> {" "}
    <button className="btn-theme" onClick={handleLogout}
    style={{color:"rgb(155, 155, 155)",borderColor:"rgb(155, 155, 155)"}}
    >Logout</button>
    </div>
   
   
    </>
  )
}
return (
  <>
  <button
            onClick={() => {
              navigate("/login");
            }}
            className="btn-theme"
            style={{color:"rgb(155, 155, 155)",borderColor:"rgb(155, 155, 155)"}}
          >
            Login
          </button>
          <button
            onClick={() => {
              navigate("/register");
            }}
            className="btn-theme"
            style={{color:"rgb(155, 155, 155)",borderColor:"rgb(155, 155, 155)"}}
          >
          Register
          </button>
  </>
)
   }
  return (
    <div className=" shadow-lg ">
      <div className="container flex justify-between items-center  h-20">
        <span 
        className="text-5xl text-red-500 cursor-pointer flex"
        onClick={() => {
              navigate("/");
            }}><p>CYBER</p><p className="text-black">FLIX</p></span>
        <nav className="space-x-5">
          {renderUserNav()}
          {/* <button
            onClick={() => {
              navigate("/login");
            }}
            className="btn-theme"
          >
            Login
          </button> */}
        </nav>
      </div>
    </div>
  );
}
