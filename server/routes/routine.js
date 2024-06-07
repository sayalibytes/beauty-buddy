const express = require('express');
const router = express.Router();

// Dummy data for demonstration purposes
let routines = [
  { id: 1, name: 'Morning Routine' },
  { id: 2, name: 'Evening Routine' },
  { id: 3, name: 'Weekly Routine' }
];

router.get('/', (req, res) => {
  res.json(routines);
});

router.post('/', (req, res) => {
  const routine = req.body;
  routines.push({ id: routines.length + 1, ...routine });
  res.status(201).json({ message: 'Routine added' });
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const updatedRoutine = req.body;
  const routineIndex = routines.findIndex(r => r.id === id);
  if (routineIndex !== -1) {
    routines[routineIndex] = { id, ...updatedRoutine };
    res.json({ message: 'Routine updated' });
  } else {
    res.status(404).json({ message: 'Routine not found' });
  }
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  routines = routines.filter(r => r.id !== id);
  res.json({ message: 'Routine deleted' });
});

module.exports = router;
