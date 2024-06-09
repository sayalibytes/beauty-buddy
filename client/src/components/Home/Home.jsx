import "./Home.scss";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Header from "../Header/Header";
import Calendar from "../Calendar/Calendar";
import { getRoutines, getProductTracking } from "../../utilities/api";

const API_URL =
  process.env.REACT_APP_API_BASE_URL ||
  "https://beauty-buddy-7f3e1b864c30.herokuapp.com";

const Home = ({ skinType }) => {
  const [routines, setRoutines] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const response = await getRoutines();
        setRoutines(response.data);
      } catch (error) {
        console.error("Error fetching routines:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await getProductTracking();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchRoutines();
    fetchProducts();
  }, []);

  return (
    <div className="bb">
      <Header />
      <Calendar />
      <h1>Your Skincare Dashboard</h1>
      <p>Your skin type is {skinType}</p>
      <div className="main-page__content">
        <div className="main-page__section">
          <h2>
            Routines{" "}
            <Link to="/add-routine" className="add-btn">
              +
            </Link>
          </h2>
          <div className="routines-list">
            {routines.map((routine) => (
              <div key={routine.id} className="routine-item">
                <input type="checkbox" />
                <span>{routine.title}</span>
                <span>{routine.products.length} products</span>
              </div>
            ))}
          </div>
        </div>
        <div className="main-page__section">
          <h2>
            My Products{" "}
            <Link to="/add-product" className="add-btn">
              +
            </Link>
          </h2>
          <div className="products-list">
            {products.map((product) => (
              <div key={product.id} className="product-item">
                <span>{product.name}</span>
                <span>Use before - {product.displayDate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
