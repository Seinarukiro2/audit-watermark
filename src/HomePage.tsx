import React from 'react';
import { CardContent, Typography, Box } from '@mui/material';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import ReceiptLongSharpIcon from '@mui/icons-material/ReceiptLongSharp';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Link } from 'react-router-dom';

const cardStyle = {
    width: '275px',
    height: '275px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: '10px',
    padding: '10px',
    overflow: 'hidden',
    border: '2px solid transparent',
    transition: 'transform 0.3s ease-in-out',
};

const hoveredCardStyle = {
    ...cardStyle,
    transform: 'translateY(-5px)', // Поднимаем бокс на 5 пикселей при наведении
};

const iconStyle = {
    fontSize: 140,
    color: '#e20074',
    transition: 'transform 0.3s ease-in-out', // Применяем анимацию к иконкам
};

const hoveredIconStyle = {
    ...iconStyle,
    transform: 'scale(1.1)', // Увеличиваем размер иконки при наведении
};

const HomePage = () => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {/* Карточка "Berichtsweitergabeerklärung" */}
            <Link to="/report-disclosure-agreement" style={{ textDecoration: 'none' }}>
                <Box sx={{ ...cardStyle, '&:hover': hoveredCardStyle }}>
                    <CardContent>
                        <ReceiptLongSharpIcon sx={{ ...iconStyle, '&:hover': hoveredIconStyle }} />
                        <Typography
                            variant="h5"
                            style={{ fontSize: '20px', lineHeight: '24px', color: 'black', fontWeight: 'bold' }}
                        >
                            Berichtsweitergabeerklärung
                        </Typography>
                    </CardContent>
                </Box>
            </Link>

            {/* Карточка "NDA" */}
            <Link to="/nda" style={{ textDecoration: 'none' }}>
                <Box sx={{ ...cardStyle, '&:hover': hoveredCardStyle }}>
                    <CardContent>
                        <AssignmentLateIcon sx={{ ...iconStyle, '&:hover': hoveredIconStyle }} />
                        <Typography
                            variant="h5"
                            style={{ fontSize: '20px', lineHeight: '24px', color: 'black', fontWeight: 'bold' }}
                        >
                            NDA
                        </Typography>
                    </CardContent>
                </Box>
            </Link>

            <Link to="/watermarker" style={{ textDecoration: 'none' }}>
                <Box sx={{ ...cardStyle, '&:hover': hoveredCardStyle }}>
                    <CardContent>
                        <PictureAsPdfIcon sx={{ ...iconStyle, '&:hover': hoveredIconStyle }} />
                        <Typography
                            variant="h5"
                            style={{ fontSize: '20px', lineHeight: '24px', color: 'black', fontWeight: 'bold' }}
                        >
                            Watermarker
                        </Typography>
                    </CardContent>
                </Box>
            </Link>
        </div>
    );
};

export default HomePage;
