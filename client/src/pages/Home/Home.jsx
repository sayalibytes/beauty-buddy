import "./Home.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRoutines, addRoutine } from "../../utilities/api";
import { getProductTracking, addProductTracking } from "../../utilities/api";
import Header from "../../components/Header/Header";
import Calendar from "../../components/Calendar/Calendar";
import RoutineModal from "../../components/RoutineModal/RoutineModal";
import ProductModal from "../../components/ProductModal/ProductModal";

const Home = ({ skinType }) => {
  const [routines, setRoutines] = useState([]);
  const [products, setProducts] = useState([]);
  const [routineModalIsOpen, setRoutineModalIsOpen] = useState(false);
  const [productModalIsOpen, setProductModalIsOpen] = useState(false);

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

  const handleAddRoutine = async (routine) => {
    try {
      const response = await addRoutine(routine);
      setRoutines([...routines, response.data]);
    } catch (error) {
      console.error("Error adding routine:", error);
    }
  };

  const handleAddProduct = async (product) => {
    try {
      const response = await addProductTracking(product);
      setProducts([...products, response.data]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="main-page">
      <Header />

      <h1 className="main-page__heading">
        Your Personalised Skincare Dashboard
      </h1>
      <p className="main-page__description">Your skin type is {skinType}</p>

      <Calendar />

      <div className="main-page__content">
        
        <div className="main-page__section">
            <div className="main-page__display">
            <Link to="/routine" className="main-page__section-link">

              <h2 className="main-page__title">My Routines</h2>
              </Link>
              <button
                className="main-page__add-button"
                onClick={() => setRoutineModalIsOpen(true)}
              >
                +
              </button>
            </div>
            <ul className="main-page__list">
              {routines.map((routine) => (
                <li className="main-page__item" key={routine.id}>
                  <label className="main-page__checkbox-label">
                    <input type="checkbox" className="main-page__checkbox" />
                    <span className="main-page__custom-checkbox"></span>
                    <div className="main-page__item-display">
                      <h3 className="main-page__item-title">{routine.title}</h3>
                      <p className="main-page__item-total">
                        {routine.products.length} products
                      </p>
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          
        </div>
        <div className="main-page__section">
          <Link to="/products" className="main-page__section-link">
            <div className="main-page__display">
              <h2 className="main-page__title">My Products</h2>
              <button
                className="main-page__add-button"
                onClick={() => setProductModalIsOpen(true)}
              >
                +
              </button>
            </div>
            <ul className="main-page__list">
              {products.map((product) => (
                <li className="main-page__item-display" key={product.id}>
                  <div className="main-page__products">
                    <h3 className="main-page__item-title">{product.name}</h3>
                    <p className="main-page__item-total">
                      Use before: {product.displayDate}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Link>
        </div>
      </div>
      <RoutineModal
        isOpen={routineModalIsOpen}
        onRequestClose={() => setRoutineModalIsOpen(false)}
        onSubmit={handleAddRoutine}
      />
      <ProductModal
        isOpen={productModalIsOpen}
        onRequestClose={() => setProductModalIsOpen(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
};

export default Home;
