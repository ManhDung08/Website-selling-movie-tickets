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
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

// Import các hàm API
import { getUsers, createUser, updateUser, deleteUser } from "../../api/usersApi";

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

const ManageUsers = () => {
  const [users, setUsers] = useState([]); // Danh sách người dùng
  const [open, setOpen] = useState(false); // Trạng thái mở/đóng modal
  const [editingUser, setEditingUser] = useState(null); // Người dùng đang được sửa
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    phone: "",
    role: "",
    dateOfBirth: "",
    isEmailVerified: false,
    isActive: false,
  }); // Thông tin người dùng mới

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  // Lấy danh sách người dùng từ API khi component render
  useEffect(() => {
    const fetchUsersFromApi = async () => {
      try {
        const usersData = await getUsers({
          page: pagination.page,
          limit: pagination.limit,
        });
        setUsers(usersData.data); // Giả sử backend trả về dữ liệu trong `data`
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
      }
    };

    fetchUsersFromApi();
  }, [pagination]); // Điều chỉnh khi thay đổi trang hoặc số lượng người dùng trên trang

  // Mở modal
  const handleOpen = (user = null) => {
    setEditingUser(user);
    setNewUser(
      user || {
        username: "",
        email: "",
        password: "",
        fullName: "",
        phone: "",
        role: "user", // Mặc định là "user"
        dateOfBirth: "",
        isEmailVerified: false,
        isActive: false,
      }
    );
    setOpen(true);
  };

  // Đóng modal
  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
  };

  // Thêm hoặc sửa người dùng
  const handleSave = async () => {
    try {
      if (editingUser) {
        // Gọi API cập nhật người dùng
        const updatedUser = await updateUser(editingUser.id, newUser);
        setUsers((prev) =>
          prev.map((user) => (user.id === editingUser.id ? updatedUser.data : user))
        );
      } else {
        // Gọi API thêm người dùng mới
        const createdUser = await createUser(newUser);
        setUsers((prev) => [...prev, createdUser.data]);
      }
      handleClose();
    } catch (error) {
      console.error("Lỗi khi lưu người dùng:", error);
    }
  };

  // Xóa người dùng
  const handleDelete = async (id) => {
    try {
      // Gọi API xóa người dùng
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Quản lý người dùng
      </Typography>

      {/* Nút thêm người dùng */}
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Thêm người dùng
      </Button>

      {/* Bảng danh sách người dùng */}
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên người dùng</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.isActive ? "Đang hoạt động" : "Không hoạt động"}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleOpen(user)}
                    sx={{ marginRight: 1 }}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(user.id)}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal thêm/sửa người dùng */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            {editingUser ? "Sửa người dùng" : "Thêm người dùng"}
          </Typography>

          {/* Form */}
          <TextField
            label="Tên người dùng"
            fullWidth
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Email"
            fullWidth
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Mật khẩu"
            fullWidth
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Họ và tên"
            fullWidth
            value={newUser.fullName}
            onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Số điện thoại"
            fullWidth
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Ngày sinh"
            fullWidth
            type="date"
            value={newUser.dateOfBirth}
            onChange={(e) => setNewUser({ ...newUser, dateOfBirth: e.target.value })}
            sx={{ marginBottom: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* Trạng thái Email */}
          <FormControlLabel
            control={
              <Checkbox
                checked={newUser.isEmailVerified}
                onChange={(e) =>
                  setNewUser({ ...newUser, isEmailVerified: e.target.checked })
                }
              />
            }
            label="Xác thực email"
          />

          {/* Trạng thái người dùng */}
          <FormControlLabel
            control={
              <Checkbox
                checked={newUser.isActive}
                onChange={(e) => setNewUser({ ...newUser, isActive: e.target.checked })}
              />
            }
            label="Người dùng hoạt động"
          />

          {/* Chọn vai trò người dùng */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="role-select-label">Vai trò</InputLabel>
            <Select
              labelId="role-select-label"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
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

export default ManageUsers;
