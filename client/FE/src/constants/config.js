import { nanoid } from "nanoid";
import { createTheme } from "@mui/material/styles";  // Updated to createTheme

// Get current user from localStorage or generate a new ID using nanoid
const currentUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
const avtIdUser = currentUser ? currentUser?.avtIdUser : nanoid(10);

// Export variables
export { avtIdUser };
export const BASE_URL = "http://localhost:4000/api";
export const URL_BANNER = 'http://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachBanner';
export const FAKE_AVATAR = `https://i.pravatar.cc/300?u=${avtIdUser}`;
export const UNKNOW_USER = "/img/unknowUser.png";
export const DISPLAY_MOBILE_BookTicket = "(max-width:768px)";
export const DISPLAY_MOBILE_THEATER = "(max-width:678px)";
export const HIDDEN_SEARCHTICKET = "(max-width:992px)";
export const DISPLAY_MOBILE_HOMEPAGE = "(max-width:736px)";
export const IMG_LOADING = "/img/logoTixLoading.png";

// Date range constants
export const DATE_BEGIN_DANGCHIEU = "2024-01-01"; // format: yyyy-mm-dd
export const DATE_END_DANGCHIEU = "2024-12-01";
export const DATE_BEGIN_SAPCHIEU = "2024-12-02";
export const DATE_END_SAPCHIEU = new Date().toISOString()?.slice(0, 10);

// Price array
export const arrayGiaVe = [35000, 40000, 50000, 75000];

// MUI theme configuration
export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 678,
            md: 736,
            lg: 768,
            xl: 992,
        },
    },
});
