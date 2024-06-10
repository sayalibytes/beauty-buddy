import React, { useState, useEffect } from "react";
import {
  getProductTracking,
  addProductTracking,
  updateProductTracking,
  deleteProductTracking,
} from "../../utilities/api";
import Header from "../Header/Header";
import ProductModal from "../ProductModal/ProductModal";
import "./ProductTracking.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function ProductTracking() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductTracking();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProductTracking(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSaveProduct = async (product) => {
    if (editingProduct) {
      try {
        const response = await updateProductTracking(
          editingProduct.id,
          product
        );
        setProducts(
          products.map((p) => (p.id === editingProduct.id ? response.data : p))
        );
      } catch (error) {
        console.error("Error updating product:", error);
      }
    } else {
      try {
        const response = await addProductTracking(product);
        setProducts([...products, response.data]);
      } catch (error) {
        console.error("Error adding product:", error);
      }
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="pt">
      <Header />
      <div className="product-tracking">
        <div className="main-page__display">
          <h2 className="main-page__title">Track Product Expiry</h2>
          <button className="main-page__add-button" onClick={handleAddProduct}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <ul className="main-page__list">
          {products.map((product) => (
            <li className="main-page__item-display" key={product.id}>
              <div className="button-display">
              <div className="main-page__products">
              <h3 className="main-page__item-title">{product.name}</h3>
              <p className="main-page__item-total">Use before: {product.displayDate}</p>
              </div>
              <button onClick={() => handleEditProduct(product)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button onClick={() => handleDeleteProduct(product.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              </div>
            </li>
          ))}
        </ul>
        <ProductModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onSubmit={handleSaveProduct}
          initialData={
            editingProduct || {
              name: "",
              startDate: "",
              LifeAfterOpening: "",
              expiryDate: "",
            }
          }
          isEdit={!!editingProduct}
        />
      </div>
    </div>
  );
}

export default ProductTracking;
