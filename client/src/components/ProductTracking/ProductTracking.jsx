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
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

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
    <div className="bb">
      <Header />
      <div className="product-tracking">
        <div className="main__display">
          <h2 className="main__title">Track Product Expiry</h2>
          <button onClick={handleAddProduct}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <span>
                {product.name} (Use before: {product.displayDate})
              </span>
              <button onClick={() => handleEditProduct(product)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button onClick={() => handleDeleteProduct(product.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
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
