const express = require('express');
const router = express.Router();
const moment = require('moment');

// Sample data for demonstration
let productTracking = [
  { id: 1, name: 'Cleanser', startDate: '2024-01-01', LifeAfterOpening: '12 months', expiryDate: '2025-12-31' },
  { id: 2, name: 'Moisturiser', startDate: '2024-02-01', LifeAfterOpening: '6 months', expiryDate: '2025-08-01' },
  { id: 3, name: 'Sunscreen', startDate: '2024-03-01', LifeAfterOpening: '18 months', expiryDate: '2026-09-01' }
];

const calculateExpiryStatus = (product) => {
  const startDate = moment(product.startDate);
  const lifeAfterOpening = parseInt(product.LifeAfterOpening.split(' ')[0]); 
  const expiryDate = startDate.add(lifeAfterOpening, 'months');
  const currentDate = moment();

  const timeLeft = expiryDate.diff(currentDate, 'months', true);
  const isExpiringSoon = timeLeft <= 1; 

  return { ...product, expiryDate: expiryDate.format('YYYY-MM-DD'), isExpiringSoon };
};

router.get('/', (req, res) => {
  const productsWithExpiryStatus = productTracking.map(calculateExpiryStatus);
  res.json(productsWithExpiryStatus);
});

router.post('/', (req, res) => {
  const { name, startDate, LifeAfterOpening } = req.body;
  const newProduct = {
    id: productTracking.length + 1,
    name,
    startDate,
    LifeAfterOpening,
    expiryDate: ''
  };
  productTracking.push(newProduct);
  res.status(201).json({ message: 'Product tracking added', product: newProduct });
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name, startDate, LifeAfterOpening } = req.body;
  const productIndex = productTracking.findIndex(p => p.id === id);
  if (productIndex !== -1) {
    productTracking[productIndex] = { id, name, startDate, LifeAfterOpening, expiryDate: '' };
    res.json({ message: 'Product tracking updated', product: productTracking[productIndex] });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  productTracking = productTracking.filter(p => p.id !== id);
  res.json({ message: 'Product tracking deleted' });
});

module.exports = router;
