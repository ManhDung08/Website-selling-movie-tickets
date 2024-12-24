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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

// Import các hàm API
import roomService from "../../services/roomService";
import theaterService from "../../services/theaterService"; 

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]); // Danh sách phòng chiếu
  const [open, setOpen] = useState(false); // Trạng thái mở/đóng modal
  const [editingRoom, setEditingRoom] = useState(null); // Phòng chiếu đang được sửa
  const [newRoom, setNewRoom] = useState({
    name: "",
    type: "",
    capacity: "",
    theaterId: "",
    seatMap: [{ row: "", number: "", type: "", status: "active" }],
  }); // Thông tin phòng chiếu mới
  const [theaters, setTheaters] = useState([]); // Danh sách các rạp chiếu

  // Lấy danh sách phòng chiếu từ API khi component render
  useEffect(() => {
    const fetchRoomsFromApi = async () => {
      try {
        const roomsData = await roomService.getAllRooms();
        setRooms(roomsData);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phòng chiếu:", error);
      }
    };

    const fetchTheaters = async () => {
      try {
        const theatersData = await theaterService.getAllTheaters(); // Lấy danh sách rạp
        setTheaters(theatersData);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách rạp chiếu:", error);
      }
    };

    fetchRoomsFromApi();
    fetchTheaters();
  }, []);

  // Mở modal
  const handleOpen = (room = null) => {
    setEditingRoom(room);
    setNewRoom(room || {
      name: "",
      type: "",
      capacity: "",
      theaterId: "",
      seatMap: [{ row: "", number: "", type: "", status: "active" }],
    });
    setOpen(true);
  };

  // Đóng modal
  const handleClose = () => {
    setOpen(false);
    setEditingRoom(null);
  };

  // Thêm hoặc sửa phòng chiếu
  const handleSave = async () => {
    try {
      if (editingRoom) {
        // Gọi API cập nhật phòng chiếu
        const updatedRoom = await roomService.updateRoom(editingRoom.id, newRoom);
        setRooms((prev) =>
          prev.map((room) => (room.id === editingRoom.id ? updatedRoom : room))
        );
      } else {
        // Gọi API thêm phòng chiếu mới
        const createdRoom = await roomService.createRoom(newRoom);
        setRooms((prev) => [...prev, createdRoom]);
      }
      handleClose();
    } catch (error) {
      console.error("Lỗi khi lưu phòng chiếu:", error);
    }
  };

  // Xóa phòng chiếu
  const handleDelete = async (id) => {
    try {
      // Gọi API xóa phòng chiếu
      await roomService.deleteRoom(id);
      setRooms((prev) => prev.filter((room) => room.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa phòng chiếu:", error);
    }
  };

  // Cập nhật seatMap
  const handleSeatMapChange = (index, key, value) => {
    const updatedSeatMap = [...newRoom.seatMap];
    updatedSeatMap[index][key] = value;
    setNewRoom({ ...newRoom, seatMap: updatedSeatMap });
  };

  // Thêm một ghế vào seatMap
  const addSeatMapRow = () => {
    setNewRoom({
      ...newRoom,
      seatMap: [
        ...newRoom.seatMap,
        { row: "", number: "", type: "standard", status: "active" },
      ],
    });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Quản lý phòng chiếu
      </Typography>

      {/* Nút thêm phòng chiếu */}
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Thêm phòng chiếu
      </Button>

      {/* Bảng danh sách phòng chiếu */}
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên phòng</TableCell>
              <TableCell>Loại phòng</TableCell>
              <TableCell>Sức chứa</TableCell>
              <TableCell>Rạp chiếu</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.id}</TableCell>
                <TableCell>{room.name}</TableCell>
                <TableCell>{room.type}</TableCell>
                <TableCell>{room.capacity}</TableCell>
                <TableCell>{room.theaterId}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleOpen(room)}
                    sx={{ marginRight: 1 }}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(room.id)}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal thêm/sửa phòng chiếu */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            {editingRoom ? "Sửa phòng chiếu" : "Thêm phòng chiếu"}
          </Typography>

          {/* Form */}
          <TextField
            label="Tên phòng"
            fullWidth
            value={newRoom.name}
            onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Loại phòng</InputLabel>
            <Select
              value={newRoom.type}
              onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
              label="Loại phòng"
            >
              <MenuItem value="2D">2D</MenuItem>
              <MenuItem value="3D">3D</MenuItem>
              <MenuItem value="4DX">4DX</MenuItem>
              <MenuItem value="IMAX">IMAX</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Sức chứa"
            fullWidth
            value={newRoom.capacity}
            onChange={(e) =>
              setNewRoom({ ...newRoom, capacity: e.target.value })
            }
            sx={{ marginBottom: 2 }}
          />

          {/* Chọn rạp chiếu */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Rạp chiếu</InputLabel>
            <Select
              value={newRoom.theaterId}
              onChange={(e) => setNewRoom({ ...newRoom, theaterId: e.target.value })}
              label="Rạp chiếu"
            >
              {theaters.map((theater) => (
                <MenuItem key={theater.id} value={theater.id}>
                  {theater.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* SeatMap */}
          <Typography variant="h6" gutterBottom>
            SeatMap
          </Typography>
          {newRoom.seatMap.map((seat, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <TextField
                label="Hàng"
                value={seat.row}
                onChange={(e) => handleSeatMapChange(index, "row", e.target.value)}
                sx={{ marginRight: 1 }}
              />
              <TextField
                label="Số ghế"
                value={seat.number}
                onChange={(e) => handleSeatMapChange(index, "number", e.target.value)}
                sx={{ marginRight: 1 }}
              />
              <FormControl sx={{ marginRight: 1 }}>
                <InputLabel>Loại ghế</InputLabel>
                <Select
                  value={seat.type}
                  onChange={(e) =>
                    handleSeatMapChange(index, "type", e.target.value)
                  }
                  label="Loại ghế"
                >
                  <MenuItem value="standard">Standard</MenuItem>
                  <MenuItem value="vip">VIP</MenuItem>
                  <MenuItem value="couple">Couple</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ marginRight: 1 }}>
                <InputLabel>Tình trạng</InputLabel>
                <Select
                  value={seat.status}
                  onChange={(e) =>
                    handleSeatMapChange(index, "status", e.target.value)
                  }
                  label="Tình trạng"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="maintenance">Maintenance</MenuItem>
                </Select>
              </FormControl>
            </Box>
          ))}
          <Button
            variant="outlined"
            color="secondary"
            onClick={addSeatMapRow}
            sx={{ marginBottom: 2 }}
          >
            Thêm ghế
          </Button>

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

export default ManageRooms;
