import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { userService } from "../../service/service";
import toast from "react-hot-toast";

export default function RegisterPage() {
  let navigate = useNavigate();
  const onFinish = (values) => {
    userService
    .register(values)
    .then((res)=>{
      toast.success("Đăng ký thành công")
      navigate("/")
      console.log("Success:", res);
    })
    .catch(()=>{
      toast.error("Đăng ký thất bại")
    })
    
  };
  const onFinishFailed = (errorInfo) => {

    toast.error("Đăng ký thất bại")
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="register">
      <div className="rgtContainer">
        <div className="rgtContain">
          <div className="rgtHeader">
          
            <p style={{ textAlign: "center", marginBottom: "10px",fontSize:"20px", fontWeight:"bold" }}>
            Đăng Ký Tài Khoản
            </p>
          </div>
          <Form
            style={{position:"relative" , paddingLeft:"15px" , paddingRight:"15px"}}
            className="d-flex justify-content-center"
            layout="vertical"
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label={<label style={{ color: "white" }}>Tài khoản</label>}
              name="taiKhoan"
              rules={[
                {
                  required: true,
                  message: "Tài khoản không được bỏ trống !",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={<label style={{ color: "white" }}>Mật khẩu</label>}
              name="matKhau"
              rules={[
                {
                  required: true,
                  message: "Mật khẩu không được bỏ trống !",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label={<label style={{ color: "white" }}>Họ và Tên</label>}
              name="hoTen"
              rules={[
                {
                  required: true,
                  message: "Tên không được bỏ trống !",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={<label style={{ color: "white" }}>Email</label>}
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email không được bỏ trống !",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={<label style={{ color: "white" }}>Số điện thoại</label>}
              name="soDt"
              rules={[
                {
                  required: true,
                  message: "Số điện thoại không được bỏ trống !",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
               className="d-flex justify-content-center"
                type="primary"
                htmlType="submit"
                style={{ background: "green" }}
              >
                Đăng Ký
              </Button>
              {" "}
                <Button
               className="d-flex justify-content-center text-red-500"
                type="primary"
                // htmlType="submit"
                style={{ background: "yellow" }}
                onClick={()=>{
                  navigate("/")
                }}
              >
                Huỷ
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
