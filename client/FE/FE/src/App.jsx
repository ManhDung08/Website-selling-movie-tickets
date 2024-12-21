import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Header from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import DetailPage from "./pages/DetailPage/DetailPage";
import Footer from "./components/Footer/Footer";
import Layout from "./Layout/Layout";
import Spinner from "./components/Spinner/Spinner";
import AdminLayout from "./Layout/AdminLayout";
import UserPage from "./pages/UserPage/UserPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import BookingPage from "./pages/BookingPage/BookingPage";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Spinner />
        <Routes>
          {/* user route */}
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />}></Route>

            <Route path="/detail/:id" element={<DetailPage />}></Route>
            <Route path="/booking/:id" element={<BookingPage/>}/>
          </Route>
          {/* admin route */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<UserPage />}></Route>
          </Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
