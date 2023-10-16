import React, { useState } from 'react';
import {
    Container,
    Grid,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Button,
    CssBaseline,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const NDA: React.FC = () => {
    const [question1, setQuestion1] = useState('');
    const [question2, setQuestion2] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [address, setAddress] = useState({
        companyName: '',
        streetNumber: '',
        zipCodeCity: '',
    });
    const [ticketNumber, setTicketNumber] = useState('');

    const [errors, setErrors] = useState({
        question1: false,
        question2: false,
        customerName: false,
        companyName: false,
        streetNumber: false,
        zipCodeCity: false,
        ticketNumber: false,
    });

    const handleRequest = async () => {
        // Проверка на заполнение полей перед отправкой
        if (!question1 || !question2 || !customerName || !address.companyName || !address.streetNumber || !address.zipCodeCity || !ticketNumber) {
            // Установка ошибок для незаполненных полей
            setErrors({
                question1: !question1,
                question2: !question2,
                customerName: !customerName,
                companyName: !address.companyName,
                streetNumber: !address.streetNumber,
                zipCodeCity: !address.zipCodeCity,
                ticketNumber: !ticketNumber,
            });
        } else {
            // Если все поля заполнены, можно выполнять запрос
            try {
                const response = await fetch('http://80.158.59.110:8007/process_docx_nda', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        question1,
                        question2,
                        customerName,
                        address,
                        ticketNumber,
                    }),
                });

                if (response.ok) {

                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    const currentDate = new Date();
                    const year = currentDate.getFullYear();
                    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // +1, так как месяцы в JavaScript начинаются с 0
                    const day = currentDate.getDate().toString().padStart(2, '0');

                    const formattedDate = `${year}${month}${day}`;


                    a.download = `NDA_${customerName}_${formattedDate}.docx`;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);

                    setErrors({
                        question1: false,
                        question2: false,
                        customerName: false,
                        companyName: false,
                        streetNumber: false,
                        zipCodeCity: false,
                        ticketNumber: false,
                    });
                } else {
                    // Если сервер вернул ошибку, обработайте ее
                    console.error('Server error');
                }
            } catch (error) {
                // Обработка ошибок сети
                console.error(error);
            }
        }
    };

    const handleInputChange = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        // Убираем ошибку, если пользователь начал вводить данные
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: e.target.value.length > 0 ? false : true,
        }));
        // Обновляем значение поля
        if (fieldName === 'question1') {
            setQuestion1(e.target.value);
        } else if (fieldName === 'question2') {
            setQuestion2(e.target.value);
        } else if (fieldName === 'customerName') {
            setCustomerName(e.target.value);
        } else if (fieldName === 'companyName') {
            setAddress((prevState) => ({
                ...prevState,
                companyName: e.target.value,
            }));
        } else if (fieldName === 'streetNumber') {
            setAddress((prevState) => ({
                ...prevState,
                streetNumber: e.target.value,
            }));
        } else if (fieldName === 'zipCodeCity') {
            setAddress((prevState) => ({
                ...prevState,
                zipCodeCity: e.target.value,
            }));
        } else if (fieldName === 'ticketNumber') {
            setTicketNumber(e.target.value);
        }
    };

    return (
        <div>
            <CssBaseline />

            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4" style={{ marginTop: '20px' }}>
                            NDA
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{ textAlign: 'left', fontWeight: 'bold' }}>
                            Language
                        </Typography>
                        <RadioGroup
                            aria-label="Language"
                            name="question1"
                            value={question1} // Должно быть значение, например, "Deutsch" или "English"
                            onChange={handleInputChange('question1')}
                        >
                            <FormControlLabel
                                value="Deutsch"
                                control={<Radio color="secondary" />}
                                label="Deutsch"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="English"
                                control={<Radio color="secondary" />}
                                label="English"
                                labelPlacement="end"
                            />
                        </RadioGroup>
                        {errors.question1 && <div style={{ color: 'red' }}>This field is required</div>}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" gutterBottom style={{ textAlign: 'left', fontWeight: 'bold' }}>
                            Is the business with TSI or TDG
                        </Typography>
                        <RadioGroup
                            aria-label="TSI or TDG"
                            name="question2"
                            value={question2} // Должно быть значение, например, "TSI" или "TDG"
                            onChange={handleInputChange('question2')}
                        >
                            <FormControlLabel
                                value="TSI"
                                control={<Radio color="secondary" />}
                                label="TSI"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="TDG"
                                control={<Radio color="secondary" />}
                                label="TDG"
                                labelPlacement="end"
                            />
                        </RadioGroup>
                        {errors.question2 && <div style={{ color: 'red' }}>This field is required</div>}
                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            fullWidth
                            label="Customer Name"
                            value={customerName}
                            onChange={handleInputChange('customerName')}
                            error={errors.customerName}
                            variant="outlined"
                        />
                        {errors.customerName && <div style={{ color: 'red' }}>This field is required</div>}
                    </Grid>
                    <Grid item xs={12}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="address-content"
                                id="address-header"
                            >
                                <Typography variant="body1" gutterBottom style={{ textAlign: 'left' }}>
                                    Please enter customer address data
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Company name"
                                            variant="outlined"
                                            value={address.companyName}
                                            onChange={handleInputChange('companyName')}
                                            error={errors.companyName}
                                        />
                                        {errors.companyName && <div style={{ color: 'red' }}>This field is required</div>}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Street, Number"
                                            variant="outlined"
                                            value={address.streetNumber}
                                            onChange={handleInputChange('streetNumber')}
                                            error={errors.streetNumber}
                                        />
                                        {errors.streetNumber && <div style={{ color: 'red' }}>This field is required</div>}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="ZIP Code, City"
                                            variant="outlined"
                                            value={address.zipCodeCity}
                                            onChange={handleInputChange('zipCodeCity')}
                                            error={errors.zipCodeCity}
                                        />
                                        {errors.zipCodeCity && <div style={{ color: 'red' }}>This field is required</div>}
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Ticket Number"
                            value={ticketNumber}
                            onChange={handleInputChange('ticketNumber')}
                            error={errors.ticketNumber}
                            variant="outlined"
                        />
                        {errors.ticketNumber && <div style={{ color: 'red' }}>This field is required</div>}
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleRequest}
                            style={{ backgroundColor: '#e20074', marginTop: '20px' }}
                        >
                            Request
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default NDA;
