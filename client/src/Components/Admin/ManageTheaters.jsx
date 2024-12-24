import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Modal, TextField, MenuItem, Select, FormControl, 
  InputLabel
} from '@mui/material';
import theaterService from '../../services/theaterService';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

const ManageTheaters = () => {
  const [theaters, setTheaters] = useState([]); // Danh sách rạp chiếu
  const [open, setOpen] = useState(false); // Trạng thái mở/đóng modal
  const [editingTheater, setEditingTheater] = useState(null); // Rạp chiếu đang được sửa
  const [newTheater, setNewTheater] = useState({
    name: '',
    address: '',
    city: '',
    totalRooms: 0,
    facilities: [],
    contact: {
      phone: '',
      email: ''
    }
  }); // Thông tin rạp chiếu mới

  // Lấy danh sách rạp chiếu từ API khi component render
  useEffect(() => {
    const fetchTheatersFromApi = async () => {
      try {
        const response = await theaterService.getAllTheaters();
        setTheaters(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách rạp chiếu:', error);
      }
    };

    fetchTheatersFromApi();
  }, []);

  // Mở modal
  const handleOpen = (theater = null) => {
    setEditingTheater(theater);
    setNewTheater(theater || {
      name: '',
      address: '',
      city: '',
      totalRooms: 0,
      facilities: [],
      contact: {
        phone: '',
        email: ''
      }
    });
    setOpen(true);
  };

  // Đóng modal
  const handleClose = () => {
    setOpen(false);
    setEditingTheater(null);
  };

  // Thêm hoặc sửa rạp chiếu
  const handleSave = async () => {
    try {
      if (editingTheater) {
        const updatedTheater = await theaterService.updateTheater(editingTheater._id, newTheater);;
        setTheaters(prev => prev.map(theater => theater._id === editingTheater._id ? updatedTheater : theater));
      } else {
        const createdTheater = await theaterService.createTheater(newTheater);
        setTheaters(prev => [...prev, createdTheater]);
      }
      handleClose();
    } catch (error) {
      console.error('Lỗi khi lưu rạp chiếu:', error);
    }
  };

  // Xóa rạp chiếu
  const handleDelete = async (id) => {
    try {
      await theaterService.deleteTheater(id);;
      setTheaters(prev => prev.filter(theater => theater._id !== id));
    } catch (error) {
      console.error('Lỗi khi xóa rạp chiếu:', error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Quản lý Rạp Chiếu
      </Typography>

      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Thêm Rạp Chiếu
      </Button>

      {/* Bảng danh sách rạp chiếu */}
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên Rạp</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Thành phố</TableCell>
              <TableCell>Số phòng</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {theaters.map((theater) => (
              <TableRow key={theater._id}>
                <TableCell>{theater._id}</TableCell>
                <TableCell>{theater.name}</TableCell>
                <TableCell>{theater.address}</TableCell>
                <TableCell>{theater.city}</TableCell>
                <TableCell>{theater.totalRooms}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleOpen(theater)} sx={{ marginRight: 1 }}>
                    Sửa
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(theater._id)}>
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal thêm/sửa rạp chiếu */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            {editingTheater ? 'Sửa Rạp Chiếu' : 'Thêm Rạp Chiếu'}
          </Typography>

          <TextField label="Tên Rạp" fullWidth value={newTheater.name} onChange={(e) => setNewTheater({ ...newTheater, name: e.target.value })} sx={{ marginBottom: 2 }} />
          <TextField label="Địa chỉ" fullWidth value={newTheater.address} onChange={(e) => setNewTheater({ ...newTheater, address: e.target.value })} sx={{ marginBottom: 2 }} />
          <TextField label="Thành phố" fullWidth value={newTheater.city} onChange={(e) => setNewTheater({ ...newTheater, city: e.target.value })} sx={{ marginBottom: 2 }} />
          <TextField label="Số phòng" type="number" fullWidth value={newTheater.totalRooms} onChange={(e) => setNewTheater({ ...newTheater, totalRooms: e.target.value })} sx={{ marginBottom: 2 }} />

          <TextField label="Số điện thoại" fullWidth value={newTheater.contact.phone} onChange={(e) => setNewTheater({ ...newTheater, contact: { ...newTheater.contact, phone: e.target.value } })} sx={{ marginBottom: 2 }} />
          <TextField label="Email" fullWidth value={newTheater.contact.email} onChange={(e) => setNewTheater({ ...newTheater, contact: { ...newTheater.contact, email: e.target.value } })} sx={{ marginBottom: 2 }} />

          <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginRight: 1 }}>
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

export default ManageTheaters;
