import toast from "react-hot-toast";
import { userService } from "../../service/service";
import { SET_INFO } from "../constant/user";

export const loginAction = (formData, callback) => {
  //redux thunk
  return (dispatch) => {
    userService
      .login(formData)
      .then((res) => {
        console.log(res);
        dispatch({
          type: SET_INFO,
          payload: res.data.content,
        });
        toast.success("đăng nhập thành công");
        localStorage.setItem("USER", JSON.stringify(res.data.content));
        //call back dùng navigate vì dùng window.location.href bị reload trang
        callback();
        //window.location.href("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
// ko dùng navigate được vì hook dùng trong function component
