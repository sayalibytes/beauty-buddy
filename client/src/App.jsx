import "./App.scss";
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import Questionnaire from "./components/Questionnaire/Questionnaire";
import GetStarted from "./components/GetStarted/GetStarted";
import Home from "./components/Home/Home";
import AddRoutine from "./components/AddRoutine/AddRoutine";
import AddProduct from "./components/AddProduct/AddProduct";
import Routines from "./components/Routines/Routines";
import ProductTracking from "./components/ProductTracking/ProductTracking";

function App() {
  const [skinType, setSkinType] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/questionnaire" element={<Questionnaire setSkinType={setSkinType} />} />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/home" element={<Home skinType={skinType}/>} />
      <Route path="/add-routine" element={<AddRoutine />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/routine" element={<Routines />} />
      <Route path="/products" element={<ProductTracking />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
