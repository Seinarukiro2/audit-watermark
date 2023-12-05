import React, { useState, useRef } from 'react';
import {
    Container,
    Grid,
    Typography,
    TextField,
    Button,
    CssBaseline,
    Backdrop,
    CircularProgress,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { createWatermarkedPDF } from './watermark_adder'; // Путь к вашему файлу

const WatermarkedPDF: React.FC = () => {
    const [customerName, setCustomerName] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false); // Состояние для отображения загрузки
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [errors, setErrors] = useState({
        customerName: false,
        file: false,
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setSelectedFile(file);
        }
    };

    const handleFileUploadButtonClick = () => {
        // Открываем диалог выбора файла при клике на кнопку
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleRequest = async () => {
        if (!customerName || !selectedFile) {
            // Обработка ошибок
            // ...
        } else {
            try {
                // Начало загрузки
                setLoading(true);

                // Создаем водяной PDF
                const watermarkedPDF = await createWatermarkedPDF(selectedFile, customerName);

                // Преобразуем в Blob
                const blob = new Blob([watermarkedPDF], { type: 'application/pdf' });

                // Создаем ссылку на Blob
                const url = window.URL.createObjectURL(blob);

                // Создаем ссылку для скачивания
                const a = document.createElement('a');
                a.href = url;
                a.download = 'watermarked.pdf';

                // Автоматически "кликаем" по ссылке для скачивания
                a.click();

                // Освобождаем URL
                window.URL.revokeObjectURL(url);

                // Очищаем состояние
                setCustomerName('');
                setSelectedFile(null);

                // Завершение загрузки после 2 секунд
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            } catch (error) {
                // Обработка ошибок
                console.log(error);
            }
        }
    };

    return (
        <div>
            <CssBaseline />
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4" style={{ marginTop: '20px'}}>
                            PDF Watermarker
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Customer Name"
                            variant="outlined"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            InputLabelProps={{ style: { textAlign: 'left' } }} // Выравниваем метку слева
                        />
                        {errors.customerName && (
                            <div style={{ color: 'red', textAlign: 'left' }}>
                                Customer Name is required
                            </div>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            accept=".pdf"
                            style={{ display: 'none' }}
                            id="pdf-upload"
                            type="file"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                        />
                        {selectedFile ? (
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ backgroundColor: '#e20074', marginTop: '20px' }}
                                    onClick={handleFileUploadButtonClick}
                                >
                                    Upload Another PDF
                                </Button>
                                <div style={{ marginTop: '10px' }}>
                                    Selected file: {selectedFile.name}
                                </div>
                            </div>
                        ) : (
                            <label htmlFor="pdf-upload">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ backgroundColor: '#e20074', marginTop: '20px' }}
                                    startIcon={<CloudUpload />}
                                    onClick={handleFileUploadButtonClick}
                                >
                                    Upload PDF
                                </Button>
                            </label>
                        )}
                        {errors.file && (
                            <div style={{ color: 'red', marginTop: '10px', textAlign: 'left' }}>
                                PDF file is required
                            </div>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleRequest}
                            style={{ backgroundColor: '#e20074', marginTop: '20px' }}
                        >
                            Download
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            {/* Отображение загрузки с заблуренным фоном */}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default WatermarkedPDF;
