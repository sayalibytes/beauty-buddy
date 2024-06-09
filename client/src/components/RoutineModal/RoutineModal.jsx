import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./RoutineModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

function RoutineModal({
  isOpen,
  onRequestClose,
  onSubmit,
  initialData = { title: "", products: [""] },
  isEdit = false
}) {
  const [title, setTitle] = useState(initialData.title);
  const [products, setProducts] = useState(initialData.products);

  useEffect(() => {
    if (initialData.title !== title) {
        setTitle(initialData.title);
      }
      if (JSON.stringify(initialData.products) !== JSON.stringify(products)) {
        setProducts(initialData.products);
      }
    }, [initialData.title, initialData.products, title, products]);  
    
  const handleProductChange = (index, value) => {
    const newProducts = [...products];
    newProducts[index] = value;
    setProducts(newProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, ""]);
  };

  const handleRemoveProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({ title, products });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={isEdit ? "Edit Routine" : "Add Routine"}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="add-routine">
      <h2>{isEdit ? "Edit Routine" : "Add Routine"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Routine Name
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Add Product
              {products.map((product, index) => (
                <div key={index} className="product-input">
                  <input
                    type="text"
                    value={product}
                    onChange={(e) => handleProductChange(index, e.target.value)}
                    required
                  />
                  {products.length > 1 && (
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => handleRemoveProduct(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  )}
                </div>
              ))}
            </label>

            <button
              type="button"
              className="add-btn"
              onClick={handleAddProduct}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          <div className="modal-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={onRequestClose}
            >
              <FontAwesomeIcon icon={faTimes} /> Cancel
            </button>
            <button type="submit">{isEdit ? "Save Changes" : "Add Routine"}</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default RoutineModal;
