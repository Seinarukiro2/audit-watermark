import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import {AppBar, IconButton, Toolbar} from "@mui/material";
import Logo from "./Logo";
import {Language} from "@mui/icons-material";
import NDA from "./NDA";
import HomePage from "./HomePage";
import ReportDisclosureAgreement from "./ReportDisclosureAgreement";
import WatermarkedPDF from "./WatermarkedPDF";
import Header from "./Header";
import SpeedDialMenu from "./SpeedDialMenu";

function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <SpeedDialMenu/>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/nda" element={<NDA />} />
                    <Route path="/report-disclosure-agreement" element={<ReportDisclosureAgreement />} />
                    <Route path="/watermarker" element={<WatermarkedPDF />} />
                </Routes>
            </div>
        </Router>
    );
}


export default App;
