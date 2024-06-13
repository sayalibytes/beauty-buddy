const express = require('express');
const router = express.Router();
const path = require("path");
const { readJsonFile, writeJsonFile } = require('../utility/utils');

const ROUTINES_FILE_PATH = path.join(__dirname, "..", "data", "routines.json");

const generateUniqueId = (routines) => {
  const maxId = routines.reduce((max, routine) => Math.max(max, routine.id), 0);
  return maxId + 1;
};

router.get('/', (req, res) => {
  const routines = readJsonFile(ROUTINES_FILE_PATH);
  res.json(routines);
});

router.post('/', (req, res) => {
    const { title, products } = req.body;

  if (!title || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: 'Title and products are required, and products must be a non-empty array.' });
  }

  const routines = readJsonFile(ROUTINES_FILE_PATH);
  const newRoutine = { id: generateUniqueId(routines), title, products };
  routines.push(newRoutine);
  writeJsonFile(ROUTINES_FILE_PATH, routines);
  res.status(201).json({ message: 'Routine added', routine: newRoutine });
});

router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const { title, products } = req.body;
  
    if (!title || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Title and products are required, and products must be a non-empty array.' });
    }
  
    const routines = readJsonFile(ROUTINES_FILE_PATH);
    const routineIndex = routines.findIndex(r => r.id === id);
    if (routineIndex !== -1) {
      routines[routineIndex] = { id, title, products };
      writeJsonFile(ROUTINES_FILE_PATH, routines);
      res.json({ message: 'Routine updated', routine: routines[routineIndex] });
    } else {
      res.status(404).json({ message: 'Routine not found' });
    }
  });

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  let routines = readJsonFile(ROUTINES_FILE_PATH);
  routines = routines.filter(r => r.id !== id);
  writeJsonFile(ROUTINES_FILE_PATH, routines);
  res.json({ message: 'Routine deleted' });
});

module.exports = router;
