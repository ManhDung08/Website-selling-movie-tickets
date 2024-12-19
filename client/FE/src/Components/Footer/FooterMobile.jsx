import React from 'react'

export default function FooterMobile() {
  return (
    <div className="footerMobile" style={{width:"767px", height:"350px"}}>
      <div
        style={{
          margin: "auto",
          maxWidth: "100%",
          paddingBottom: "10px",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: "0 0 33.333333%",
            maxWidth: "33.333333%",
            display: "block!important",
            position: "relative",
            width: "100%",
            paddingRight: "15px",
            paddingLeft: "15px",
            color: "white",
            fontSize: "12px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "block!important" }}>
              <p>TIX</p>
              <a style={{ color: "#949494", display: "block" }} href="">
                FAQ
              </a>
              <a style={{ color: "#949494", display: "block" }} href="">
                Brand Guidelines
              </a>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginRight: 0,
                marginLeft: 0,
              }}
            >
              <a
                style={{
                  color: "#949494",
                  display: "block",
                  flex: "0 0 100%",
                  maxWidth: "100%",
                  position: "relative",
                  width: "100%",
                  paddingRight: "15px",
                  paddingLeft: "15px",
                  backgroundColor: "transparent",
                }}
                href=""
              >
                Thoả thuận sử dụng
              </a>
              <a
                style={{
                  color: "#949494",
                  display: "block",
                  flex: "0 0 100%",
                  maxWidth: "100%",
                  position: "relative",
                  width: "100%",
                  paddingRight: "15px",
                  paddingLeft: "15px",
                  backgroundColor: "transparent",
                }}
                href=""
              >
                Chính sách bảo mật
              </a>
            </div>
          </div>
        </div>
        
        <div
          style={{
            textAlign: "center!important",
            display: "flex",
            flex: "0 0 33.333333%",
            maxWidth: "33.333333%",
            position: "relative",
            width: "100%",
            paddingRight: "15px",
            paddingLeft: "15px",
          }}
        >
      
          <div
            className="jss47"
            style={{
              width: "50%",
              display: "block",
              textAlign: "center!important",
            }}
          >
            <p
              className=""
              style={{ paddingBottom: "0.5rem!important", textAlign: "center" }}
            >
              SOCIAL APP
            </p>
            <div
              className="jss48"
              style={{
                display: "flex",
                justifyContent: "space-around",
                paddingTop: "10px",
              }}
            >
              <a
                style={{
                  color: "#949494",
                  display: "block",
                  backgroundColor: "transparent",
                }}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.cgv.vn/"
              >
                <img
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                  className="jss42"
                  src="../../../public/partner/facebook-logo.png"
                  alt
                />
              </a>
              <a
                style={{
                  color: "#949494",
                  display: "block",
                  backgroundColor: "transparent",
                }}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.cgv.vn/"
              >
                <img
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                  className="jss42"
                  src="../../../public/partner/zalo-logo.png"
                  alt
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footerContainer">
        <div className="row" style={{marginRight:0,marginLeft:0,display:"flex",flexWrap:"wrap",boxSizing:"border-box"}}>
          <div className="col-12 " style={{textAlign:"center",padding:"0.25rem",flex:"0 0 30%",maxWidth:"50%"}}>
            <img
              src="../../../public/partner/zion-logo.jpg"
              alt="company"
              className="jss50"
              style={{textAlign:"center",borderRadius:"8px",height:"30px",width:"80px"}}
            />
          </div>
        
          <div
            className="col-12 col-md-2 p-1 text-center"
            style={{ position: "static",textAlign:"center",padding:"0.25rem",flex:"0 0 50%",maxWidth:"50%" }}
          >
            <img src="../../../public/partner/certificate.png" alt="gvm" className="jss51" style={{height:"30px",width:"80px"}} />
          </div>
        </div>
      </div>
    </div>
  )
}
