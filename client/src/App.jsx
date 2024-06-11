import "./App.scss";
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import Questionnaire from "./pages/Questionnaire/Questionnaire";
import GetStarted from "./pages/GetStarted/GetStarted";
import Home from "./pages/Home/Home";
import Routines from "./pages/Routines/Routines";
import ProductTracking from "./pages/ProductTracking/ProductTracking";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

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
      <Route path="/routine" element={<Routines />} />
      <Route path="/products" element={<ProductTracking />} />
      <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
