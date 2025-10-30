import express from 'express';
import fs from 'fs';

const PORT = 3000;
const app = express();

app.get('/', (req, res) => {
  res.send("Welcome to Product API");
});

app.get('/product', (req, res) => {
  fs.readFile('product.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
    } else {
      res.send(data);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
