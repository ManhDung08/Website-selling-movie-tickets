import axiosClient from "./axiosClient";

const moviesApi = {
    // Lấy danh sách phim
    getDanhSachPhim: () => {
        const path = "/phim";  // Lấy tất cả các phim từ db.json
        return axiosClient.get(path);
    },

    // Lấy thông tin của một phim theo id
    getThongTinPhim: (maPhim) => {
        const path = `/phim/${maPhim}`;  // Lấy thông tin chi tiết của phim theo id
        return axiosClient.get(path);
    },

    // Lấy danh sách phim theo ngày
    getDanhSachPhimTheoNgay: (maNhom, tuNgay, denNgay) => {
        const path = "/phim";  // Lấy tất cả phim (db.json không hỗ trợ theo ngày, sẽ cần xử lý thêm trên frontend)
        return axiosClient.get(path, { params: { maNhom, tuNgay, denNgay } });
    },

    // Lấy phim với phân trang (mô phỏng bằng cách phân trang trên frontend)
    getDanhSachPhimPhanTrang: (param) => {
        const path = "/phim";  // Phân trang dựa trên tham số truyền vào
        return axiosClient.get(path, { params: param });
    },

    // Thêm phim mới vào db.json
    postThemPhim: (movie) => {
        const path = "/phim";  // Thêm một phim mới vào db.json
        return axiosClient.post(path, movie);
    },

    // Cập nhật thông tin phim theo id
    postCapNhatPhim: (maPhim, movie) => {
        const path = `/phim/${maPhim}`;  // Cập nhật thông tin phim theo id
        return axiosClient.put(path, movie);
    },

    // Xóa phim theo id
    deleteMovie: (maPhim) => {
        const path = `/phim/${maPhim}`;  // Xóa phim theo id
        return axiosClient.delete(path);
    },

    // Thêm lịch chiếu cho một phim
    postThemLichChieu: (maPhim, lichChieu) => {
        const path = `/phim/${maPhim}/lichChieu`;  // Thêm lịch chiếu mới cho phim
        return axiosClient.post(path, lichChieu);
    },

    // Cập nhật lịch chiếu của một phim
    postCapNhatLichChieu: (maPhim, maLichChieu, lichChieu) => {
        const path = `/phim/${maPhim}/lichChieu/${maLichChieu}`;  // Cập nhật lịch chiếu của phim theo mã lịch chiếu
        return axiosClient.put(path, lichChieu);
    },

    // Xóa lịch chiếu của phim
    deleteLichChieu: (maPhim, maLichChieu) => {
        const path = `/phim/${maPhim}/lichChieu/${maLichChieu}`;  // Xóa lịch chiếu của phim theo mã lịch chiếu
        return axiosClient.delete(path);
    }
};

export default moviesApi;
