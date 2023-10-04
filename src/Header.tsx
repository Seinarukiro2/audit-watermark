import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Badge,
    Typography,
    Button,
    Box,
} from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Logo from './Logo'; // Замените на путь к вашему логотипу

const Header: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" style={{ backgroundColor: '#e20074' }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Link to="/">
                        <Logo style={{ maxWidth: '42px', maxHeight: '42px' }} />
                    </Link>
                </IconButton>
                <div style={{ flex: 1 }}></div>
                <IconButton color="inherit" edge="end" onClick={handleMenuClick}>
                    <Badge badgeContent={3} color="error"> {/* Замените на реальное количество уведомлений */}
                        <Notifications />
                    </Badge>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    // Добавьте стили для изменения размеров меню
                    PaperProps={{
                        style: {
                            width: '300px', // Увеличьте эту ширину по вашим предпочтениям
                            maxHeight: '80vh', // Увеличьте эту высоту по вашим предпочтениям
                        },
                    }}
                >
                    <MenuItem onClick={handleClose}>
                        <Typography>Watermark was added to file ...</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Typography>NDA was created</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Typography>Report Disclosure Agreement was created</Typography>
                    </MenuItem>
                    <Box display="flex" justifyContent="center">
                        <Button color="primary">Get all</Button>
                    </Box>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
