import "./Home.scss";
import React from "react";
import Routines from '../Routines/Routines';
import ProductTracking from '../ProductTracking/ProductTracking';
import Header from "../Header/Header";
import Calendar from "../Calendar/Calendar";

const Home = ({ skinType }) => {
  return (
    <div className="bb">
      <Header />
      <Calendar />
      <h1>Your Skincare Dashboard</h1>
      <p>Your skin type is {skinType}</p>
      <div className="main-page__content">
        <div className="main-page__section">
          <div>
          <h2>Routines</h2>
          <p>+</p>
          </div>
          <Routines />
        </div>
        <div className="main-page__section">
          <div>
          <h2>Products</h2>
          <p>+</p>
          </div>
          <ProductTracking />
        </div>
      </div>
    </div>
  );
}

export default Home;

