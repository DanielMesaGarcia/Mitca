// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Conectar a la base de datos
mongoose.connect('mongodb://localhost:27017/nombre_basedatos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definir un esquema de ejemplo
const ejemploSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

// Compilar el modelo a partir del esquema
const Ejemplo = mongoose.model('Ejemplo', ejemploSchema);

app.get('/', async (req, res) => {
  // Ejemplo de operación de base de datos
  const ejemplo = new Ejemplo({ name: 'Ejemplo', age: 25 });
  await ejemplo.save();
  res.send('Datos guardados en MongoDB a través de Mongoose.');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
