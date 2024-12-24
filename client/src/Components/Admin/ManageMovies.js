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
import { getMovies, createMovie, updateMovie, deleteMovie } from "../../api/moviesApi";


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

const ManageMovies = () => {
  const [movies, setMovies] = useState([]); // Dữ liệu phim sẽ được lấy từ API
  const [open, setOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    duration: "",
    genre: [],
    releaseDate: "",
    language: "",
    director: "",
    cast: [],
    poster: "",
    status: "coming-soon",
  });

  // Lấy danh sách phim khi component mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies(); // Gọi API để lấy danh sách phim
        setMovies(data); // Cập nhật state với danh sách phim
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phim", error);
      }
    };

    fetchMovies();
  }, []);

  // Mở modal để thêm hoặc sửa phim
  const handleOpen = (movie = null) => {
    setEditingMovie(movie);
    setNewMovie(
      movie || {
        title: "",
        description: "",
        duration: "",
        genre: [],
        releaseDate: "",
        language: "",
        director: "",
        cast: [],
        poster: "",
        status: "coming-soon",
      }
    );
    setOpen(true);
  };

  // Đóng modal
  const handleClose = () => {
    setOpen(false);
    setEditingMovie(null);
  };

  // Lưu phim (thêm mới hoặc cập nhật)
  const handleSave = async () => {
    try {
      if (editingMovie) {
        // Cập nhật phim
        const updatedMovie = await updateMovie(editingMovie.id, newMovie);
        setMovies((prev) =>
          prev.map((movie) => (movie.id === updatedMovie.id ? updatedMovie : movie))
        );
      } else {
        // Thêm phim mới
        const createdMovie = await createMovie(newMovie);
        setMovies((prev) => [...prev, createdMovie]);
      }
      handleClose();
    } catch (error) {
      console.error("Lỗi khi lưu phim", error);
    }
  };

  // Xóa phim
  const handleDelete = async (id) => {
    try {
      await deleteMovie(id); // Gọi API xóa phim
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa phim", error);
    }
  };

  // Thay đổi poster
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMovie({ ...newMovie, poster: reader.result }); // Lưu base64 vào state
      };
      reader.readAsDataURL(file); // Đọc file ảnh dưới dạng base64
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Quản lý phim
      </Typography>

      {/* Nút thêm phim */}
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Thêm phim
      </Button>

      {/* Bảng danh sách phim */}
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên phim</TableCell>
              <TableCell>Thể loại</TableCell>
              <TableCell>Thời lượng</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>{movie.id}</TableCell>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.genre.join(", ")}</TableCell>
                <TableCell>{movie.duration} phút</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleOpen(movie)}
                    sx={{ marginRight: 1 }}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(movie.id)}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal thêm/sửa phim */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            {editingMovie ? "Sửa phim" : "Thêm phim"}
          </Typography>

          {/* Form thêm/sửa phim */}
          <TextField
            label="Tên phim"
            fullWidth
            value={newMovie.title}
            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Mô tả"
            fullWidth
            value={newMovie.description}
            onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Thời lượng"
            fullWidth
            type="number"
            value={newMovie.duration}
            onChange={(e) => setNewMovie({ ...newMovie, duration: Number(e.target.value) })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Thể loại (tách bằng dấu phẩy)"
            fullWidth
            value={newMovie.genre.join(", ")}
            onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value.split(",").map(g => g.trim()) })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Ngày phát hành"
            fullWidth
            type="date"
            value={newMovie.releaseDate}
            onChange={(e) => setNewMovie({ ...newMovie, releaseDate: e.target.value })}
            sx={{ marginBottom: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Ngôn ngữ"
            fullWidth
            value={newMovie.language}
            onChange={(e) => setNewMovie({ ...newMovie, language: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Đạo diễn"
            fullWidth
            value={newMovie.director}
            onChange={(e) => setNewMovie({ ...newMovie, director: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Diễn viên (tách bằng dấu phẩy)"
            fullWidth
            value={newMovie.cast.join(", ")}
            onChange={(e) => setNewMovie({ ...newMovie, cast: e.target.value.split(",").map(c => c.trim()) })}
            sx={{ marginBottom: 2 }}
          />

          {/* Input file cho poster */}
          <Button variant="contained" component="label" sx={{ marginBottom: 2 }}>
            Chọn ảnh poster
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
          {newMovie.poster && (
            <Box sx={{ marginBottom: 2 }}>
              <img
                src={newMovie.poster}
                alt="Poster"
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
          )}

          {/* Trạng thái */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={newMovie.status}
              onChange={(e) => setNewMovie({ ...newMovie, status: e.target.value })}
              label="Trạng thái"
            >
              <MenuItem value="coming-soon">Sắp ra mắt</MenuItem>
              <MenuItem value="now-showing">Đang chiếu</MenuItem>
              <MenuItem value="ended">Đã kết thúc</MenuItem>
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

export default ManageMovies;
