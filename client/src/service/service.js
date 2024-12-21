import { https } from "./config";

export let userService = {
  login: (valueForm) => {
    return https.post("/api/QuanLyNguoiDung/DangNhap", valueForm);
  },
  register: (valueForm) => {
    return https.post("/api/QuanLyNguoiDung/DangKy", valueForm);
  },
};

export let movieService = {
  getList: () => {
    return https.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09");
  },
  getDetail: (id) => {
    return https.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);
  },
  getMovieByTheater:()=>{
    return https.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP09` );
  
  },
  setBookingTicket:(payload)=>{
    return https.post(`/api/QuanLyDatVe/DatVe`,payload)
  },

  getSeatByShowTimeId: (ShowTimeId) => {
    return https.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${ShowTimeId}`);
  },
  getBroadcastScheduleByMovie:(movieId)=>{
    return https.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`)
  }
 
};
export let adminService = {
  getUserList:(query = ' ')=>{
    return https.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung${query}`);
  },
  deleteUser: (taiKhoan = ' ')=>{
    return https.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
  },
  getUserDetailById:(taiKhoan)=>{
    return https.post(`/api/QuanLyNguoiDung/LayThongTinNguoiDung?TaiKhoan=${taiKhoan}`)
  },
  updateUser:(payload)=>{
    return https.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,payload)
  }
}
