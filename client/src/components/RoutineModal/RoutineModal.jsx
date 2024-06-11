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
  isEdit = false,
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
  }, [isOpen, initialData]);

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
      <div className="action">
        <h2 className="action__title">
          {isEdit ? "Edit Routine" : "Add Routine"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="action__sec">
            <label >Routine Name</label>
           
            <input
              className="action__input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="action__label">Add Product</label>
            <div className="action__section">
              {products.map((product, index) => (
                <div key={index} className="product-input">
                  <input
                    className="action__input"
                    type="text"
                    value={product}
                    onChange={(e) => handleProductChange(index, e.target.value)}
                    required
                  />
                  {products.length > 1 && (
                    <button
                      type="button"
                      className="action__remove"
                      onClick={() => handleRemoveProduct(index)}
                    >
                      <FontAwesomeIcon
                        className="action__delete"
                        icon={faTrash}
                      />
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="add-btn"
                onClick={handleAddProduct}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>

          <div className="modal-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={onRequestClose}
            >
              <FontAwesomeIcon icon={faTimes} /> Cancel
            </button>
            <button type="submit" className="submit-btn">
              {isEdit ? "Save Changes" : "Add Routine"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default RoutineModal;
