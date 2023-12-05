import React, { useState } from 'react';
import {
    Container,
    Grid,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    Button,
    CssBaseline,
} from '@mui/material';
import { Language } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
import Logo from './Logo';
import { LocalizationProvider } from "@mui/x-date-pickers";

const RDA: React.FC = () => {
    const [question2, setQuestion2] = useState('');

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [address, setAddress] = useState({
        companyName: '',
        streetNumber: '',
        zipCodeCity: '',
    });
    const [ticketNumber, setTicketNumber] = useState('');
    const [salesRepresentative, setSalesRepresentative] = useState('');
    const [telefonnummer, setTelefonnummer] = useState('');

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);

    };

    const [errors, setErrors] = useState({
        question2: false,
        companyName: false,
        streetNumber: false,
        zipCodeCity: false,
        ticketNumber: false,
        salesRepresentative: false,
        telefonnummer: false,
        date: false,
    });

    const handleRequest = async () => {
        try {
            if (
                !question2 ||
                !address.companyName ||
                !address.streetNumber ||
                !address.zipCodeCity ||
                !ticketNumber ||
                !salesRepresentative ||
                !telefonnummer ||
                !selectedDate
            ) {
                setErrors({
                    question2: !question2,
                    companyName: !address.companyName,
                    streetNumber: !address.streetNumber,
                    zipCodeCity: !address.zipCodeCity,
                    ticketNumber: !ticketNumber,
                    salesRepresentative: !salesRepresentative,
                    telefonnummer: !telefonnummer,
                    date: !selectedDate,
                });
            } else {

                
                
                const response = await fetch('https://auditrequest.tsi-dev.otc-service.com/get_rda', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        question2,
                        address,
                        ticketNumber,
                        salesRepresentative,
                        telefonnummer,
                        selectedDate
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
                    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                    const day = currentDate.getDate().toString().padStart(2, '0');
                    const formattedDate = `${year}-${month}-${day}`;
                    let doc_name = "Berichtsweitergabeerklärung";
                    if (question2 === "English") {
                        doc_name = "RDA";
                    }
                    a.download = `${doc_name}_${address.companyName}_${formattedDate}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                } else {
                    console.error('Server error');
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: e.target.value.length > 0 ? false : true,
        }));

        switch (fieldName) {
            case 'question2':
                setQuestion2(e.target.value);
                break;
            case 'companyName':
                setAddress((prevState) => ({
                    ...prevState,
                    companyName: e.target.value,
                }));
                break;
            case 'streetNumber':
                setAddress((prevState) => ({
                    ...prevState,
                    streetNumber: e.target.value,
                }));
                break;
            case 'zipCodeCity':
                setAddress((prevState) => ({
                    ...prevState,
                    zipCodeCity: e.target.value,
                }));
                break;
            case 'ticketNumber':
                setTicketNumber(e.target.value);
                break;
            case 'telefonnummer':
                setTelefonnummer(e.target.value);
                break;
            case 'salesRepresentative':
                setSalesRepresentative(e.target.value);
                break;
            default:
                break;
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
                        <Typography variant="body1" gutterBottom style={{ textAlign: 'left', fontWeight: 'bold' }}>
                            Language
                        </Typography>
                        <RadioGroup
                            aria-label="Language"
                            name="question2"
                            value={question2}
                            onChange={handleInputChange('question2')}
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
                        {errors.question2 && <div style={{ color: 'red' }}>This field is required</div>}
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <Typography variant="body1" gutterBottom style={{ textAlign: 'left' }}>
                                Please enter customer address data
                            </Typography>
                            {/* Customer Address Section */}
                        </div>
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
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <Typography variant="body1" gutterBottom style={{ textAlign: 'left' }}>
                                Enter additional information
                            </Typography>
                            {/* Additional Information Section */}
                        </div>
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
                                {errors.ticketNumber && <div style={{ color: 'red' }}>This field is required</div>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Sales Representative / OTC Service Desk"
                                    value={salesRepresentative}
                                    onChange={handleInputChange('salesRepresentative')}
                                    error={errors.salesRepresentative}
                                    variant="outlined"
                                />
                                {errors.salesRepresentative && <div style={{ color: 'red' }}>This field is required</div>}
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
                                {errors.telefonnummer && <div style={{ color: 'red' }}>This field is required</div>}
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                    <DatePicker
                                        
                                        views={["year", "month", "day"]}
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        format="YYYY-MM-DD" // Set the format to "YYYY-MM-DD"
                                        
                                        label="Select a date"
                                        slotProps={{ field: { shouldRespectLeadingZeros: true } }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
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

export default RDA;
