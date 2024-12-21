import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { userService } from "../../service/service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_INFO } from "../../redux/constant/user";
import { loginAction } from "../../redux/action/user";
const LoginPage = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  //redux thuần
  const onFinishRedux = (values) => {
    userService
      .login(values)
      .then((res) => {
        dispatch({
          type:SET_INFO,
          payload:res.data.content,
        })
        // luu len local storage
        localStorage.setItem("USER",JSON.stringify(res.data.content))
        toast.success("Đăng nhập thành công")
        navigate("/")
        console.log(res);
      })
      .catch((err) => {
        toast.error("Đăng nhập thất bại")
        console.log(err);
      });

  };
//redux thunk
  const onFinishThunk = value => {
   let onSuccess = ()=> window.location.href = "/";
    // navigate("/")
   dispatch(loginAction(value,onSuccess))
    
  }
  //tool kit
  // const onFinish =()=>{

  // }
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="flex h-screen justify-center items-center register ">
     
      <div className="w-1/2 p-10  rounded rgtContainer">
        <Form
        
          layout="vertical"
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinishThunk}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
          label={<label style={{ color: "white" }}>Tài khoản</label>}
            name="taiKhoan"
 
            rules={[
              {
                required: true,
                message: "Please input your username!",
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
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              
              span: 24,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
             
              className=" hover:bg-white hover:text-orange-500"
              style={{background:"#28a745"}}
            >
             Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default LoginPage;
