const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serves index.html, etc.

app.get('/api/products', (req, res) => {
  fs.readFile('products.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error loading products');
    res.json(JSON.parse(data));
  });
});

app.post('/api/purchase', (req, res) => {
  const cart = req.body.cart;
  console.log("Order received:", cart);
  res.json({ message: "Purchase successful!" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
