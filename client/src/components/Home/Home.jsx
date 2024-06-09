import "./Home.scss";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Header from "../Header/Header";
import Calendar from "../Calendar/Calendar";
import { getRoutines, getProductTracking } from "../../utilities/api";

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
      <h1 className="main-page__heading">Your Skincare Dashboard</h1>
      <p className="main-page__description">Your skin type is {skinType}</p>
      <div className="main-page__content">
        <div className="main-page__section">
          <h2>
            My Routines{" "}
            <Link to="/add-routine" className="add-btn">
              +
            </Link>
          </h2>
          <div className="main-page__routines-list">
            {routines.map((routine) => (
              <div key={routine.id} className="main-page__routine-item">
                <input className="main-page__checkbox" type="checkbox" />
                <div className="main-page__display">
                <h4>{routine.title}</h4>
                <p>{routine.products.length} products</p>
                </div>
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
                <h4>{product.name}</h4>
                <p>Use before - {product.displayDate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
