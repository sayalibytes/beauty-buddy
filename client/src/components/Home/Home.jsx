import "./Home.scss";
import React, { useState, useEffect } from "react";
import { getRoutines, addRoutine } from "../../utilities/api";
import { getProductTracking, addProductTracking } from "../../utilities/api";
import Header from "../Header/Header";
import Calendar from "../Calendar/Calendar";
import RoutineModal from "../RoutineModal/RoutineModal";
import ProductModal from "../ProductModal/ProductModal";

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
    <div className="bb">
      <Header />
      <Calendar />
      <h1 className="main-page__heading">Your Skincare Dashboard</h1>
      <p className="main-page__description">Your skin type is {skinType}</p>
      <div className="main-page__content">
        <div className="main-page__section">
          <div className="main__display">
          <h2 className="main__title">My Routines</h2>
          <button className="main__add-button" onClick={() => setRoutineModalIsOpen(true)}>+</button>
          </div>
          <ul className="main__list">
            {routines.map((routine) => (
              <li className="main__item" key={routine.id}>
                <input type="checkbox" />
                <h3 className="main__item-title">{routine.title}</h3>
                <p className="main__item-total">
                  ({routine.products.length} products)
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="main-page__section">
        <div className="main__display">
          <h2 className="main__title">My Products</h2>
          <button className="main__add-button" onClick={() => setProductModalIsOpen(true)}>+</button>
          </div>
          <ul className="main__list">
          {products.map((product) => (
            <li className="main__item" key={product.id}>
              <h3 className="main__item-title">{product.name}</h3>
              <p className="main__item-total">Use before: {product.displayDate}</p>
            </li>
          ))}
        </ul>
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
