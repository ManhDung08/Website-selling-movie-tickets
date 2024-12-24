import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MovieIcon from '@mui/icons-material/Movie';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import TheatersIcon from '@mui/icons-material/Theaters';  
import PeopleIcon from '@mui/icons-material/People';

const SidebarMenu = () => {
  return (
    <List>
      <ListItem button component={Link} to="/dashboard">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} to="/manage-movies">
        <ListItemIcon>
          <MovieIcon />
        </ListItemIcon>
        <ListItemText primary="Quản lý phim" />
      </ListItem>
      <ListItem button component={Link} to="/manage-showtimes">
        <ListItemIcon>
          <ScheduleIcon />
        </ListItemIcon>
        <ListItemText primary="Quản lý suất chiếu" />
      </ListItem>
      <ListItem button component={Link} to="/manage-rooms">
        <ListItemIcon>
          <MeetingRoomIcon />
        </ListItemIcon>
        <ListItemText primary="Quản lý phòng chiếu" />
      </ListItem>
      <ListItem button component={Link} to="/manage-theaters"> 
        <ListItemIcon>
          <TheatersIcon /> 
        </ListItemIcon>
        <ListItemText primary="Quản lý rạp chiếu" />
      </ListItem>
      <ListItem button component={Link} to="/manage-users">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Quản lý người dùng" />
      </ListItem>
    </List>
  );
};

export default SidebarMenu;
