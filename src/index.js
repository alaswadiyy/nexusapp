const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: process.env.GREETING || 'Hello from NexusApp' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
