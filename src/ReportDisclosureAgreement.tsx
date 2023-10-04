import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
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
import { Language } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
import Logo from './Logo';
import {LocalizationProvider} from "@mui/x-date-pickers";



const NDA: React.FC = () => {
    const [question1, setQuestion1] = useState('');
    const [question2, setQuestion2] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Состояние для хранения выбранной даты
    const [address, setAddress] = useState({
        companyName: '',
        streetNumber: '',
        zipCodeCity: '',
    });
    const [ticketNumber, setTicketNumber] = useState('');
    const [salesRepresentative, setSalesRepresentative] = useState(''); // Состояние для Sales Representative
    const [telefonnummer, setTelefonnummer] = useState(''); // Состояние для Telefonnummer

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };
    const [errors, setErrors] = useState({
        question1: false,
        question2: false,
        companyName: false,
        streetNumber: false,
        zipCodeCity: false,
        ticketNumber: false, // Добавленное поле ошибки для Ticket Number
        salesRepresentative: false, // Добавленное поле ошибки для Sales Representative
        telefonnummer: false, // Добавленное поле ошибки для Telefonnummer
        date: false, // Поле ошибки для даты (если не выбрана)
    });


    const handleRequest = () => {
        // Проверка на заполнение полей перед отправкой
        if (
            !question1 ||
            !question2 ||
            !address.companyName ||
            !address.streetNumber ||
            !address.zipCodeCity ||
            !ticketNumber ||
            !salesRepresentative || // Проверка на заполнение Sales Representative
            !telefonnummer || // Проверка на заполнение Telefonnummer
            !selectedDate // Проверка на выбор даты
        ) {
            // Установка ошибок для незаполненных полей
            setErrors({
                question1: !question1,
                question2: !question2,
                companyName: !address.companyName,
                streetNumber: !address.streetNumber,
                zipCodeCity: !address.zipCodeCity,
                ticketNumber: !ticketNumber,
                salesRepresentative: !salesRepresentative, // Установка ошибки для Sales Representative
                telefonnummer: !telefonnummer, // Установка ошибки для Telefonnummer
                date: !selectedDate, // Установка ошибки для даты
            });
        } else {
            // Если все поля заполнены, можно выполнять запрос
            console.log('Sent data:', {
                question1,
                question2,
                address,
                ticketNumber,
                salesRepresentative,
                telefonnummer,
                selectedDate,
            });

            // Сброс ошибок
            setErrors({
                question1: false,
                question2: false,
                companyName: false,
                streetNumber: false,
                zipCodeCity: false,
                ticketNumber: false,
                salesRepresentative: false,
                telefonnummer: false,
                date: false,
            });

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
        } else if (fieldName === 'telefonnummer') {
            setTelefonnummer(e.target.value);
        } else if (fieldName === 'salesRepresentative') {
            setSalesRepresentative(e.target.value);
        }
    };

    return (
        <div>
            <CssBaseline />

            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4" style={{ marginTop: '20px' }}>
                            Report-disclosure agreement
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{ textAlign: 'left', fontWeight: 'bold'}}>
                            Is the report for an existing customer OR a potential
                            customer/a customer of the customer?
                        </Typography>
                        <RadioGroup
                            aria-label="CustomerType"
                            name="question1"
                            value={question1}
                            onChange={handleInputChange('question1')}
                        >
                            <FormControlLabel
                                value="Existing"
                                control={<Radio color="secondary" />}
                                label="Existing"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="Potential Cust/Cust of cust"
                                control={<Radio color="secondary" />}
                                label="Potential Cust/Cust of cust"
                                labelPlacement="end"
                            />
                        </RadioGroup>
                        {errors.question1 && <div style={{ color: 'red' }}>This field is required</div>}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" gutterBottom style={{ textAlign: 'left', fontWeight: 'bold'}}>
                            Language
                        </Typography>
                        <RadioGroup
                            aria-label="Language"
                            name="question2"
                            value={question2}
                            onChange={handleInputChange('question2')}
                        >
                            <FormControlLabel
                                value="English"
                                control={<Radio color="secondary" />}
                                label="English"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="Deutsch"
                                control={<Radio color="secondary" />}
                                label="Deutsch"
                                labelPlacement="end"
                            />
                        </RadioGroup>
                        {errors.question2 && <div style={{ color: 'red' }}>This field is required</div>}
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
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="additional-info-content"
                                id="additional-info-header"
                            >
                                <Typography variant="body1" gutterBottom style={{ textAlign: 'left' }}>
                                    Enter additional information
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Ticket Number"
                                            value={ticketNumber}
                                            onChange={handleInputChange('ticketNumber')}
                                            error={errors.ticketNumber}
                                            variant="outlined"
                                        />
                                        {errors.ticketNumber && (
                                            <div style={{ color: 'red' }}>This field is required</div>
                                        )}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Sales Representative"
                                            value={salesRepresentative}
                                            onChange={handleInputChange('salesRepresentative')}
                                            error={errors.salesRepresentative}
                                            variant="outlined"
                                        />
                                        {errors.salesRepresentative && (
                                            <div style={{ color: 'red' }}>This field is required</div>
                                        )}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Telefonnummer"
                                            value={telefonnummer}
                                            onChange={handleInputChange('telefonnummer')}
                                            error={errors.telefonnummer}
                                            variant="outlined"
                                            inputProps={{
                                                inputMode: 'numeric',
                                                pattern: '[0-9]*',
                                            }}
                                        />
                                        {errors.telefonnummer && (
                                            <div style={{ color: 'red' }}>This field is required</div>
                                        )}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                            <DatePicker
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                format="M/D/YYYY" // Формат даты
                                                label="Select a date"
                                                slotProps={{ field: { shouldRespectLeadingZeros: true } }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
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
