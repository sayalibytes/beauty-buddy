import React, { useState, useEffect } from "react";
import { getProductTracking, updateProductTracking, deleteProductTracking } from "../../utilities/api";
import AddProduct from "../AddProduct/AddProduct";
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

  const handleSaveProduct = async (updatedProduct) => {
    try {
      const response = await updateProductTracking(editingProduct.id, updatedProduct);
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id ? response.data : product
        )
      );
      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="product-tracking">
      <h2>Product Tracking</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.name} (Use before: {product.displayDate})</span>
            <button onClick={() => handleEditProduct(product)}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button onClick={() => handleDeleteProduct(product.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>
      <AddProduct
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveProduct}
        initialData={editingProduct || { name: "", startDate: "", LifeAfterOpening: "", expiryDate: "" }}
      />
    </div>
  );
}

export default ProductTracking;
