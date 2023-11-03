const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: { 
        type: String, 
        required: true, 
        unique: true, 
        validate: {
          validator: function(v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Expresión regular para validar el formato de correo electrónico
          },
          message: props => `${props.value} no es un correo electronico valido!`
        }
      },
  password: { type: String, required: true },
  DNI: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  admin: { type: Boolean, default:false}
});

const user = mongoose.model('user', userSchema);
module.exports = user;