import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

// Import các hàm API
import showtimeService from "../../services/showtimeService";
import movieService from "../../services/movieService";
import theaterService from "../../services/theaterService";
import roomService from "../../services/roomService";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const ManageShowtimes = () => {
  const [showtimes, setShowtimes] = useState([]); // Danh sách suất chiếu
  const [movies, setMovies] = useState([]); // Danh sách phim
  const [theaters, setTheaters] = useState([]); // Danh sách rạp chiếu
  const [rooms, setRooms] = useState([]); // Danh sách phòng chiếu
  const [open, setOpen] = useState(false); // Trạng thái mở/đóng modal
  const [editingShowtime, setEditingShowtime] = useState(null); // Suất chiếu đang được sửa
  const [newShowtime, setNewShowtime] = useState({
    movieId: "",
    theaterId: "",
    roomId: "",
    startTime: "",
    endTime: "",
    price: "",
    status: "available",
  }); // Thông tin suất chiếu mới

  // Lấy danh sách suất chiếu, phim, rạp và phòng khi component render
  useEffect(() => {
    const fetchData = async () => {
      try {
        const showtimesData = await showtimeService.getAllShowtimes();
        setShowtimes(showtimesData);

        const moviesData = await movieService.getAllMovies();
        setMovies(moviesData);

        const theatersData = await theaterService.getAllTheaters();
        setTheaters(theatersData);

        const roomsData = await roomService.getAllRooms();
        setRooms(roomsData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  // Mở modal
  const handleOpen = (showtime = null) => {
    setEditingShowtime(showtime);
    setNewShowtime(
      showtime || {
        movieId: "",
        theaterId: "",
        roomId: "",
        startTime: "",
        endTime: "",
        price: "",
        status: "available",
      }
    );
    setOpen(true);
  };

  // Đóng modal
  const handleClose = () => {
    setOpen(false);
    setEditingShowtime(null);
  };

  // Thêm hoặc sửa suất chiếu
  const handleSave = async () => {
    try {
      if (editingShowtime) {
        // Cập nhật suất chiếu
        const updatedShowtime = await showtimeService.updateShowtime(editingShowtime.id, newShowtime);
        setShowtimes((prev) =>
          prev.map((showtime) =>
            showtime.id === editingShowtime.id ? updatedShowtime : showtime
          )
        );
      } else {
        // Thêm suất chiếu mới
        const createdShowtime = await showtimeService.createShowtime(newShowtime);
        setShowtimes((prev) => [...prev, createdShowtime]);
      }
      handleClose();
    } catch (error) {
      console.error("Lỗi khi lưu suất chiếu:", error);
    }
  };

  // Xóa suất chiếu
  const handleDelete = async (id) => {
    try {
      // Gọi API xóa suất chiếu
      await showtimeService.deleteShowtime(id);
      setShowtimes((prev) => prev.filter((showtime) => showtime.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa suất chiếu:", error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Quản lý suất chiếu
      </Typography>

      {/* Nút thêm suất chiếu */}
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Thêm suất chiếu
      </Button>

      {/* Bảng danh sách suất chiếu */}
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Phim</TableCell>
              <TableCell>Ngày chiếu</TableCell>
              <TableCell>Phòng chiếu</TableCell>
              <TableCell>Rạp chiếu</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showtimes.map((showtime) => (
              <TableRow key={showtime.id}>
                <TableCell>{showtime.id}</TableCell>
                <TableCell>{showtime.movieId.name}</TableCell>
                <TableCell>{new Date(showtime.startTime).toLocaleString()}</TableCell>
                <TableCell>{showtime.roomId.name}</TableCell>
                <TableCell>{showtime.theaterId.name}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleOpen(showtime)}
                    sx={{ marginRight: 1 }}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(showtime.id)}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal thêm/sửa suất chiếu */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            {editingShowtime ? "Sửa suất chiếu" : "Thêm suất chiếu"}
          </Typography>

          {/* Form */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Phim</InputLabel>
            <Select
              value={newShowtime.movieId}
              onChange={(e) =>
                setNewShowtime({ ...newShowtime, movieId: e.target.value })
              }
              label="Phim"
            >
              {movies.map((movie) => (
                <MenuItem key={movie._id} value={movie._id}>
                  {movie.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Rạp chiếu</InputLabel>
            <Select
              value={newShowtime.theaterId}
              onChange={(e) =>
                setNewShowtime({ ...newShowtime, theaterId: e.target.value })
              }
              label="Rạp chiếu"
            >
              {theaters.map((theater) => (
                <MenuItem key={theater._id} value={theater._id}>
                  {theater.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Phòng chiếu</InputLabel>
            <Select
              value={newShowtime.roomId}
              onChange={(e) =>
                setNewShowtime({ ...newShowtime, roomId: e.target.value })
              }
              label="Phòng chiếu"
            >
              {rooms.map((room) => (
                <MenuItem key={room._id} value={room._id}>
                  {room.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Thời gian bắt đầu"
            fullWidth
            type="datetime-local"
            value={newShowtime.startTime}
            onChange={(e) =>
              setNewShowtime({ ...newShowtime, startTime: e.target.value })
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Thời gian kết thúc"
            fullWidth
            type="datetime-local"
            value={newShowtime.endTime}
            onChange={(e) =>
              setNewShowtime({ ...newShowtime, endTime: e.target.value })
            }
            sx={{ marginBottom: 2 }}
          />

          <TextField
            label="Giá vé"
            fullWidth
            value={newShowtime.price}
            onChange={(e) =>
              setNewShowtime({ ...newShowtime, price: e.target.value })
            }
            sx={{ marginBottom: 2 }}
          />

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={newShowtime.status}
              onChange={(e) =>
                setNewShowtime({ ...newShowtime, status: e.target.value })
              }
              label="Trạng thái"
            >
              <MenuItem value="available">Còn vé</MenuItem>
              <MenuItem value="almost-full">Sắp hết vé</MenuItem>
              <MenuItem value="full">Hết vé</MenuItem>
              <MenuItem value="cancelled">Đã hủy</MenuItem>
            </Select>
          </FormControl>

          {/* Nút Lưu */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ marginRight: 1 }}
          >
            Lưu
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Hủy
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ManageShowtimes;
