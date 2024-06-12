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
    LifeAfterOpening: "",
    expiryDate: "",
  },
  isEdit = false,
}) {
  const [name, setName] = useState(initialData.name);
  const [startDate, setStartDate] = useState(initialData.startDate);
  const [LifeAfterOpening, setLifeAfterOpening] = useState(initialData.LifeAfterOpening);
  const [expiryDate, setExpiryDate] = useState(initialData.expiryDate);

  useEffect(() => {
    setName(initialData.name);
    setStartDate(initialData.startDate);
    setLifeAfterOpening(initialData.LifeAfterOpening);
    setExpiryDate(initialData.expiryDate);
  }, [isOpen, initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, startDate, LifeAfterOpening, expiryDate });
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
      <div className="action">
      <h2 className="action__title">{isEdit ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="action__sec">
        <label className="action__label">Name</label>
        <input
        className="action__input"
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        </div>
        <div className="action__sec">
          <label className="action__label">Open Date</label>
          <input
          className="action__input"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="action__sec">
          <label className="shelf-life-label">
              <FontAwesomeIcon icon={faJar} className="shelf-life-icon" />
              Life After Opening
          </label>
          <input
          className="action__input"
            type="text"
            value={LifeAfterOpening}
            onChange={(e) => setLifeAfterOpening(e.target.value)}
            placeholder="e.g., 12 months"
            required
          />
        </div>
        <div className="action__sec">
          <label className="action__label">Expiry Date</label>
          <input
          className="action__input"
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </div>

        <div className="modal-buttons">
          <button type="button" className="cancel-btn" onClick={onRequestClose}>
            <FontAwesomeIcon icon={faTimes} /> Cancel
          </button>
          <button type="submit" className="submit-btn">
            {isEdit ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </form>
      </div>
    </Modal>
  );
}

export default ProductModal;
