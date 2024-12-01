import axiosClient from "./axiosClient";

const BookTicketApi = {
    // Lấy danh sách phòng vé theo mã lịch chiếu
    getDanhSachPhongVe: (maLichChieu) => {
        const path = `/ve?maLichChieu=${maLichChieu}`;
        return axiosClient.get(path); // Lấy thông tin vé theo mã lịch chiếu
    },

    // Đặt vé
    postDatVe: (data) => {
        const path = `/ve`; // Thêm vé mới vào db.json
        return axiosClient.post(path, data);
    },

    // Tạo lịch chiếu mới
    postTaoLichChieu: (data) => {
        const path = `/phim`; // Thêm lịch chiếu mới vào db.json (Giả sử lịch chiếu được lưu trong phim)
        return axiosClient.post(path, data);
    },

    // Lấy thông tin lịch chiếu theo mã lịch chiếu
    getLichChieuByMaLichChieu: (maLichChieu) => {
        const path = `/phim?lichChieu.maLichChieu=${maLichChieu}`; // Lọc lịch chiếu theo mã
        return axiosClient.get(path);
    },

    // Sửa thông tin lịch chiếu theo mã lịch chiếu
    editLichChieuByMaLichChieu: (maLichChieu, time, gia) => {
        const path = `/phim/lichChieu/${maLichChieu}`; // Giả sử chỉnh sửa lịch chiếu trực tiếp trong phim
        return axiosClient.put(path, { time, gia });
    }
};

export default BookTicketApi;
