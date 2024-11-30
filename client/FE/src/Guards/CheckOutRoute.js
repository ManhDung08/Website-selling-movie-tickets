import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function CheckoutRoute({ element: BookTicket, ...routeProps }) {
  const { currentUser } = useSelector((state) => state.authReducer);

  if (!currentUser) {
    // Nếu người dùng chưa đăng nhập, chuyển hướng tới trang đăng nhập
    return (
      <Navigate
        to={{
          pathname: "/login",
          state: { from: routeProps.path }, // Truyền đường dẫn gốc
        }}
      />
    );
  }

  // Nếu đã đăng nhập, hiển thị component đặt vé
  return <BookTicket />;
}

export default CheckoutRoute;
