import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./ProductModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faJar } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root"); // Ensure accessibility

function ProductModal({
  isOpen,
  onRequestClose,
  onSubmit,
  initialData = {
    name: "",
    startDate: "",
    lifeAfterOpening: "",
    expiryDate: "",
  },
  isEdit = false
}) {
  const [name, setName] = useState(initialData.name);
  const [startDate, setStartDate] = useState(initialData.startDate);
  const [lifeAfterOpening, setLifeAfterOpening] = useState(
    initialData.lifeAfterOpening
  );
  const [expiryDate, setExpiryDate] = useState(initialData.expiryDate);

  useEffect(() => {
    setName(initialData.name);
    setStartDate(initialData.startDate);
    setLifeAfterOpening(initialData.lifeAfterOpening);
    setExpiryDate(initialData.expiryDate);
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, startDate, lifeAfterOpening, expiryDate });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={isEdit ? "Edit Product" : "Add Product"}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>{isEdit ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Open Date
          <input
            type="text"
            value={startDate}
            placeholder="DD-MM-YYYY"
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>
        <label className="shelf-life-label">
          <span>
            <FontAwesomeIcon icon={faJar} className="shelf-life-icon" />
            Life After Opening
          </span>
          <input
            type="text"
            value={lifeAfterOpening}
            onChange={(e) => setLifeAfterOpening(e.target.value)}
            placeholder="e.g., 12 months"
            required
          />
        </label>
        <label>
          Expiry Date
          <input
            type="text"
            value={expiryDate}
            placeholder="DD-MM-YYYY"
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </label>
        <div className="modal-buttons">
          <button type="button" className="cancel-btn" onClick={onRequestClose}>
            <FontAwesomeIcon icon={faTimes} /> Cancel
          </button>
          <button type="submit">{isEdit ? "Save Changes" : "Add Product"}</button>
        </div>
      </form>
    </Modal>
  );
}

export default ProductModal;
