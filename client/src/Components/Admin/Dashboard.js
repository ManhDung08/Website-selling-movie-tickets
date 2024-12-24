import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { getRevenueSummary, getTopPerformers, getRevenueRecords } from '../../api/dashboardApi'; 

const Dashboard = () => {
  // State để lưu trữ dữ liệu
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [totalTicketsSold, setTotalTicketsSold] = useState(null);
  const [topMovies, setTopMovies] = useState([]);
  const [topTheaters, setTopTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm fetch dữ liệu khi component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Lấy tổng hợp doanh thu
        const summaryData = await getRevenueSummary('2024-01-01', '2024-12-31');
        setTotalRevenue(summaryData.totalRevenue);

        // Lấy tổng số vé đã bán (Giả sử API này trả về tổng vé bán được)
        const revenueRecordsData = await getRevenueRecords(1, 1); // Lấy bản ghi doanh thu
        setTotalTicketsSold(revenueRecordsData.totalTicketsSold);

        // Lấy top phim
        const topMoviesData = await getTopPerformers('movie', 5);
        setTopMovies(topMoviesData);

        // Lấy top rạp
        const topTheatersData = await getTopPerformers('theater', 5);
        setTopTheaters(topTheatersData);
      } catch (error) {
        setError("Có lỗi xảy ra khi lấy dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

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

        {/* Doanh thu hôm nay */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Doanh thu hôm nay
              </Typography>
              <Typography variant="h4" color="secondary">
                ${totalRevenue}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Số suất chiếu hôm nay */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Số suất chiếu hôm nay
              </Typography>
              <Typography variant="h4" color="success.main">
                35 {/* Giả sử con số này có sẵn từ API hoặc static */}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Phim bán chạy nhất */}
        <Grid item xs={12} sm={12} md={12}>
          <Card sx={{ backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Phim bán chạy nhất
              </Typography>
              {topMovies.map((movie, index) => (
                <Typography key={index}>
                  {index + 1}. {movie.movie} - {movie.revenue} vé
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Rạp bán chạy nhất */}
        <Grid item xs={12} sm={12} md={12}>
          <Card sx={{ backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Rạp bán chạy nhất
              </Typography>
              {topTheaters.map((theater, index) => (
                <Typography key={index}>
                  {index + 1}. {theater.theater} - {theater.revenue} vé
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
