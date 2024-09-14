import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Toolbar, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; 
import DashboardIcon from '@mui/icons-material/Dashboard';
import SavingsIcon from '@mui/icons-material/Savings'; 
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const drawerWidth = 300;

function SideBar() {
    const [selectedIndex, setSelectedIndex] = useState(null); 

    const handleItemClick = (index) => {
        setSelectedIndex(index);
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#c9b5eb', 
                    borderRight: '1px solid #ddd',
                    marginTop: '1rem', 
                    boxShadow: 3, 
                },
            }}
        >
            <Toolbar />
            <Box
                sx={{
                    overflow: 'auto',
                    padding: '1rem',
                }}
            >
                <List>
                    <ListItem
                        button
                        to="/db"
                        component={RouterLink}
                        key="Dashboard"
                        onClick={() => handleItemClick(0)} 
                        sx={{
                            backgroundColor: selectedIndex === 0 ? '#bbdefb' : '#e3f2fd', 
                            '&:hover': {
                                backgroundColor: selectedIndex === 0 ? '#bbdefb' : '#bbdefb', 
                            },
                            marginBottom: '8px',
                            borderRadius: '8px', 
                            transition: 'background-color 0.3s, transform 0.2s',
                            transform: selectedIndex === 0 ? 'scale(1.02)' : 'scale(1)', 
                            border: selectedIndex === 0 ? '2px solid #1565c0' : 'none', 
                        }}
                    >
                        <ListItemIcon>
                            <DashboardIcon sx={{ color: selectedIndex === 0 ? '#0d47a1' : '#1565c0', transition: 'color 0.3s' }} /> 
                        </ListItemIcon>
                        <ListItemText
                            primary="Dashboard"
                            sx={{
                                color: selectedIndex === 0 ? '#0d47a1' : '#1565c0',
                                fontWeight: selectedIndex === 0 ? 'bold' : 'normal',
                                fontStyle: selectedIndex === 0 ? 'italic' : 'normal',
                                transition: 'color 0.3s, font-weight 0.3s, font-style 0.3s',
                            }}
                        />
                    </ListItem>

                    <ListItem
                        button
                        to="/sg"
                        component={RouterLink}
                        key="Savings Goals"
                        onClick={() => handleItemClick(1)} 
                        sx={{
                            backgroundColor: selectedIndex === 1 ? '#c8e6c9' : '#e8f5e9',
                            '&:hover': {
                                backgroundColor: selectedIndex === 1 ? '#c8e6c9' : '#c8e6c9', 
                            },
                            marginBottom: '8px', 
                            borderRadius: '8px', 
                            transition: 'background-color 0.3s, transform 0.2s', 
                            transform: selectedIndex === 1 ? 'scale(1.02)' : 'scale(1)', 
                            border: selectedIndex === 1 ? '2px solid #2e7d32' : 'none',
                        }}
                    >
                        <ListItemIcon>
                            <SavingsIcon sx={{ color: selectedIndex === 1 ? '#2e7d32' : '#388e3c', transition: 'color 0.3s' }} /> 
                        </ListItemIcon>
                        <ListItemText
                            primary="Savings Goals"
                            sx={{
                                color: selectedIndex === 1 ? '#2e7d32' : '#388e3c',
                                fontWeight: selectedIndex === 1 ? 'bold' : 'normal',
                                fontStyle: selectedIndex === 1 ? 'italic' : 'normal',
                                transition: 'color 0.3s, font-weight 0.3s, font-style 0.3s',
                            }}
                        />
                    </ListItem>

                    <ListItem
                        button
                        to="/tp"
                        component={RouterLink}
                        key="Ad yourd Expenses"
                        onClick={() => handleItemClick(2)} 
                        sx={{
                            backgroundColor: selectedIndex === 2 ? '#ffe0b2' : '#fff3e0', 
                            '&:hover': {
                                backgroundColor: selectedIndex === 2 ? '#ffe0b2' : '#ffe0b2', 
                            },
                            marginBottom: '8px', 
                            borderRadius: '8px', 
                            transition: 'background-color 0.3s, transform 0.2s', 
                            transform: selectedIndex === 2 ? 'scale(1.02)' : 'scale(1)', 
                            border: selectedIndex === 2 ? '2px solid #e65100' : 'none', 
                        }}
                    >
                        <ListItemIcon>
                            <AccountBalanceWalletIcon sx={{ color: selectedIndex === 2 ? '#e65100' : '#f57c00', transition: 'color 0.3s' }} /> 
                        </ListItemIcon>
                        <ListItemText
                            primary="Add yourd Expenses"
                            sx={{
                                color: selectedIndex === 2 ? '#e65100' : '#f57c00',
                                fontWeight: selectedIndex === 2 ? 'bold' : 'normal',
                                fontStyle: selectedIndex === 2 ? 'italic' : 'normal',
                                transition: 'color 0.3s, font-weight 0.3s, font-style 0.3s',
                            }}
                        />
                    </ListItem>
                   
                </List>
            </Box>
        </Drawer>
    );
}
export default SideBar;

