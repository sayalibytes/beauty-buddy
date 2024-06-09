import React, { useState, useEffect } from "react";
import { getRoutines, updateRoutine, deleteRoutine } from "../../utilities/api";
import AddRoutine from "../AddRoutine/AddRoutine";
import "./Routines.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

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

  const handleSaveRoutine = async (updatedRoutine) => {
    try {
      const response = await updateRoutine(editingRoutine.id, updatedRoutine);
      setRoutines(
        routines.map((routine) =>
          routine.id === editingRoutine.id ? response.data : routine
        )
      );
      setIsModalOpen(false);
      setEditingRoutine(null);
    } catch (error) {
      console.error("Error updating routine:", error);
    }
  };

  return (
    <div className="routines">
      <h2>Routines</h2>
      <ul>
        {routines.map((routine) => (
          <li key={routine.id}>
            <span>{routine.title} ({routine.products.length})</span>
            <button onClick={() => handleEditRoutine(routine)}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button onClick={() => handleDeleteRoutine(routine.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>
      <AddRoutine
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveRoutine}
        initialData={editingRoutine || { title: "", products: [""] }}
      />
    </div>
  );
}

export default Routines;
