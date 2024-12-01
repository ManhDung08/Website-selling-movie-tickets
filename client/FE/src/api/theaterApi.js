import axiosClient from './axiosClient';

const theatersApi = {
    getThongTinHeThongRap: () => {
        const path = "/heThongRap";
        return axiosClient.get(path); // Lấy thông tin hệ thống rạp từ db.json
    },
    getThongTinLichChieuHeThongRap: () => {
        const path = "/lichChieu?maNhom=GP09"; // Lọc theo maNhom nếu cần
        return axiosClient.get(path); // Lấy thông tin lịch chiếu hệ thống rạp
    },
    getThongTinLichChieuPhim: (maPhim) => {
        const path = `/lichChieu?maPhim=${maPhim}`; // Lọc lịch chiếu theo mã phim
        return axiosClient.get(path); // Lấy thông tin lịch chiếu của phim
    },
    getListCumRapTheoHeThong: (maHeThongRap) => {
        const path = `/cumRap?maHeThongRap=${maHeThongRap}`; // Lọc cum rap theo maHeThongRap
        return axiosClient.get(path); // Lấy danh sách cụm rạp theo hệ thống
    },

    getListRap: () => {
        const path = "/rap";
        return axiosClient.get(path); // Lấy danh sách các rạp
    },
    deleteLichChieu: (maLichChieu) => {
        const path = `/lichChieu/${maLichChieu}`;
        return axiosClient.delete(path); // Xóa lịch chiếu theo maLichChieu
    },
    getThongTinCumRap: () => {
        const path = "/cumRap";
        return axiosClient.get(path); // Lấy thông tin tất cả các cụm rạp
    },
    addThongTinCumRap: (data) => {
        const path = "/cumRap";
        return axiosClient.post(path, data); // Thêm cụm rạp mới
    },
    suaCumRap: (data) => {
        const path = `/cumRap/${data.id}`;
        return axiosClient.put(path, data); // Cập nhật cụm rạp theo ID
    },
    xoaCumRap: (id) => {
        const path = `/cumRap/${id}`;
        return axiosClient.delete(path); // Xóa cụm rạp theo ID
    },

    // Chức năng của rạp
    themRap: (data) => {
        const path = "/rap";
        return axiosClient.post(path, data); // Thêm rạp mới
    },

    suaRap: (data) => {
        const path = `/rap/${data.id}`;
        return axiosClient.put(path, data); // Cập nhật thông tin rạp
    },

    xoaRap: (id) => {
        const path = `/rap/${id}`;
        return axiosClient.delete(path); // Xóa rạp theo ID
    },

    // Chức năng thể loại phim
    getThongTinCuaTheLoaiPhim: () => {
        const path = "/theLoaiPhim";
        return axiosClient.get(path); // Lấy thông tin thể loại phim
    },
    addTheLoaiPhim: (data) => {
        const path = "/theLoaiPhim";
        return axiosClient.post(path, data); // Thêm thể loại phim mới
    },
    updateTheLoaiPhim: (data) => {
        const path = `/theLoaiPhim/${data.id}`;
        return axiosClient.put(path, data); // Cập nhật thể loại phim
    },
    deleteTheLoaiPhim: (id) => {
        const path = `/theLoaiPhim/${id}`;
        return axiosClient.delete(path); // Xóa thể loại phim theo ID
    }
};

export default theatersApi;
