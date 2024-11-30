import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

function UserProfileRoute(props) {
  const { currentUser } = useSelector((state) => state.authReducer);
  const { element: UserProfile, ...routeProps } = props;

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: "/taikhoan" }} />;
  }

  if (currentUser.maLoaiNguoiDung === "QuanTri") {
    return <Navigate to="/admin/users" />;
  }

  return <Route {...routeProps} element={<UserProfile />} />;
}

export default UserProfileRoute;
