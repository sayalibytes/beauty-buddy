import React, { useState, useEffect } from "react";
import {
  getRoutines,
  addRoutine,
  updateRoutine,
  deleteRoutine,
} from "../../utilities/api";
import Header from "../Header/Header";
import RoutineModal from "../RoutineModal/RoutineModal";
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
          routines.map((r) => (r.id === editingRoutine.id ? response.data : r))
        );
      } catch (error) {
        console.error("Error updating routine:", error);
      }
    } else {
      try {
        const response = await addRoutine(routine);
        setRoutines([...routines, response.data]);
      } catch (error) {
        console.error("Error adding routine:", error);
      }
    }
    setIsModalOpen(false);
    setEditingRoutine(null);
  };

  return (
    <div className="bb">
      <Header />
      <div className="routines">
        <div className="main__display">
          <h2 className="main__title">Routines</h2>
          <button onClick={handleAddRoutine}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <ul>
          {routines.map((routine) => (
            <li key={routine.id}>
              <span>
                {routine.title} ({routine.products.length})
              </span>
              <button onClick={() => handleEditRoutine(routine)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button onClick={() => handleDeleteRoutine(routine.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
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
