import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import revenueService from '../../services/revenueService'; 

const Dashboard = () => {
  // State để lưu trữ dữ liệu
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalTicketsSold, setTotalTicketsSold] = useState(0);
  const [revenueRecords, setRevenueRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
    
        // Gọi API với object query
        const response = await revenueService.getRevenueRecords({ 
          page: 1, 
          limit: 10 
        });

        // Kiểm tra và log phản hồi
        console.log("Response từ API:", response);
        
        // Kiểm tra cấu trúc dữ liệu
        if (!response || !Array.isArray(response.records)) {
          throw new Error("Dữ liệu không hợp lệ");
        }
    
        const { 
          records, 
          currentPage = 1, 
          totalPages = 1, 
          totalRecords = 0 
        } = response;
    
        // Tính tổng doanh thu và vé bán
        const totalRevenueSum = records.reduce((sum, record) => {
          const revenue = record?.totalRevenue ? Number(record.totalRevenue) : 0;
          return sum + revenue;
        }, 0);
    
        const totalTicketsSoldSum = records.reduce((sum, record) => {
          const tickets = record?.totalTicketsSold ? Number(record.totalTicketsSold) : 0;
          return sum + tickets;
        }, 0);
    
        // Cập nhật state
        setRevenueRecords(records);
        setTotalRevenue(totalRevenueSum);
        setTotalTicketsSold(totalTicketsSoldSum);
        setPagination({ 
          currentPage, 
          totalPages, 
          totalRecords 
        });
    
      } catch (err) {
        // Log chi tiết lỗi
        console.error("Lỗi chi tiết:", err);
        
        // Đặt thông báo lỗi
        setError(err.message || "Có lỗi xảy ra khi lấy dữ liệu.");
      } finally {
        // Luôn tắt loading
        setLoading(false);
      }
    };

    // Gọi hàm fetch data
    fetchData();
  }, []);
  
  // Hiển thị loading hoặc lỗi nếu có
  if (loading) {
    return (
      <Box sx={{ padding: 2, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 2, display: "flex", justifyContent: "center", color: "red" }}>
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Tổng số vé đã bán */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tổng số vé đã bán
              </Typography>
              <Typography variant="h4" color="primary">
                {totalTicketsSold}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Tổng doanh thu */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tổng doanh thu
              </Typography>
              <Typography variant="h4" color="secondary">
                {totalRevenue.toLocaleString()} VND
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Chi tiết doanh thu theo ngày */}
        <Grid item xs={12} sm={12} md={12}>
          <Card sx={{ backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Chi tiết doanh thu theo ngày
              </Typography>
              {revenueRecords.map((record) => (
                <Box key={record._id} sx={{ marginBottom: 2, borderBottom: '1px solid #ddd', paddingBottom: 2 }}>
                  <Typography variant="h6">
                    Ngày: {new Date(record.date).toLocaleDateString()}
                  </Typography>
                  <Typography>
                    Tổng doanh thu: {record.totalRevenue.toLocaleString()} VND
                  </Typography>
                  <Typography>
                    Tổng vé bán: {record.totalTicketsSold}
                  </Typography>
                  
                  {/* Doanh thu theo rạp */}
                  <Typography variant="subtitle1" sx={{ marginTop: 1, fontWeight: 'bold' }}>
                    Doanh thu theo rạp:
                  </Typography>
                  {record.revenueByTheater.map((theater) => (
                    <Typography key={theater._id}>
                      - {theater.theaterName}: {theater.revenue.toLocaleString()} VND ({theater.ticketsSold} vé)
                    </Typography>
                  ))}
                  
                  {/* Doanh thu theo phim */}
                  <Typography variant="subtitle1" sx={{ marginTop: 1, fontWeight: 'bold' }}>
                    Doanh thu theo phim:
                  </Typography>
                  {record.revenueByMovie.map((movie) => (
                    <Typography key={movie._id}>
                      - {movie.movieTitle}: {movie.revenue.toLocaleString()} VND ({movie.ticketsSold} vé)
                    </Typography>
                  ))}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;