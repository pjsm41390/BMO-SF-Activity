import logo from './logo.svg';
import React, {useEffect, useState} from "react";
import { useNavigate, BrowserRouter, Route, Routes} from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './App.css';
import LogCallReport from "./LogCallReport"

function App() {
  return (
   <div className="App">
    <Routes> 
        <Route exact path="/" element={<LogCallReport />}/>
      </Routes>
   </div>
  );
}

export default App;
