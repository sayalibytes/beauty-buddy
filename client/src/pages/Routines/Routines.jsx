import React, { useState, useEffect } from "react";
import {
  getRoutines,
  addRoutine,
  updateRoutine,
  deleteRoutine,
} from "../../utilities/api";
import Header from "../../components/Header/Header";
import RoutineModal from "../../components/RoutineModal/RoutineModal";
import "./Routines.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

function Routines() {
  const [routines, setRoutines] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState(null);

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const response = await getRoutines();
        setRoutines(response.data);
      } catch (error) {
        console.error("Error fetching routines:", error);
      }
    };

    fetchRoutines();
  }, []);

  const handleAddRoutine = () => {
    setEditingRoutine(null);
    setIsModalOpen(true);
  };

  const handleEditRoutine = (routine) => {
    setEditingRoutine(routine);
    setIsModalOpen(true);
  };

  const handleDeleteRoutine = async (id) => {
    try {
      await deleteRoutine(id);
      setRoutines(routines.filter((routine) => routine.id !== id));
    } catch (error) {
      console.error("Error deleting routine:", error);
    }
  };

  const handleSaveRoutine = async (routine) => {
    if (editingRoutine) {
      try {
        const response = await updateRoutine(editingRoutine.id, routine);

        setRoutines(
          routines.map((r) => (r.id === editingRoutine.id ? response.data.routine : r))
        );
      } catch (error) {
        console.error("Error updating routine:", error);
      }
    } else {
      try {
        const response = await addRoutine(routine);
        setRoutines([...routines, response.data.routine]);
      } catch (error) {
        console.error("Error adding routine:", error);
      }
    }
    setIsModalOpen(false);
    setEditingRoutine(null);
  };

  return (
    <div>
      <Header />
      <div className="routines">
        <div className="main-page__display">
          <h2 className="main-page__title">Routines</h2>
          <button className="main-page__add-button" onClick={handleAddRoutine}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <ul className="main-page__list">
          {routines.map((routine) => (
            <li className="page__item" key={routine.id}>
              <div className="main-page__item-display">
                <h3 className="page__title">{routine.title}</h3>
                {routine.products && routine.products.map((product, index) => (
                  <p className="page__items"  key={`${routine.id}-${index}-${product}`}>
                    {product}
                  </p>
                ))}
              </div>
              <div className="page__buttons">
                <button
                  className="page__button page__button--edit"
                  onClick={() => handleEditRoutine(routine)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="page__button page__button--delete"
                  onClick={() => handleDeleteRoutine(routine.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <RoutineModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onSubmit={handleSaveRoutine}
          initialData={editingRoutine || { title: "", products: [""] }}
          isEdit={!!editingRoutine}
        />
      </div>
    </div>
  );
}

export default Routines;
