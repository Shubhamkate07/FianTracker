import React from 'react';
import { AppBar as MuiAppBar, Toolbar,  Button, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../img/Screenshot_2024-09-13_000422-removebg-preview.png'; 
import { useNavigate } from 'react-router-dom';
function AppBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
   
    navigate('/');
    console.log('User logged out');
  };

  return (
    <MuiAppBar 
      position="fixed" 
      sx={{ 
        background: 'linear-gradient(145deg, #f3e7e9, #e3edf7)', 
        color: '#333', 
        zIndex: (theme) => theme.zIndex.drawer + 1, 
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
        borderBottom: '1px solid #e0e0e0', 
      }}
    >
      <Toolbar sx={{ px: 3 }}>
        {/* Logo */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            flexGrow: 1 
          }}
        >
          <img 
            src={logo} 
            alt="Logo" 
            style={{ 
              width: '7rem',
              marginRight: '16px', 
            }} 
          />
         
        </Box>

        {/* Logout Button */}
        <Button
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            fontWeight: 'bold',
            backgroundColor: '#007bff', 
            color: '#ffffff', 
            borderRadius: 2, 
            padding: '8px 16px', 
            '&:hover': {
              backgroundColor: '#0056b3', 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', 
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
