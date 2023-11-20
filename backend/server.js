const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const webPush = require ('web-push');
const Subscription = require('./models/Subscription');
var path = require('path');
// Importa tus modelos
const User = require('./models/User'); // Asegúrate de tener la ruta correcta

// Importa routers
const raceRouter = require('./routes/RaceRouter');
const runnerRouter = require('./routes/RunnerRouter');
const sponsorRouter = require('./routes/SponsorRouter');
const statusRouter = require('./routes/StatusRouter');
const userRouter = require('./routes/UserRouter');
const routeRouter = require('./routes/RouteRouter');
const demoRouter = require('./routes/DemoRouter');


const app = express();
const PORT = process.env.PORT || 3001;

// Conecta a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mitca', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/races', raceRouter);
app.use('/runners', runnerRouter);
app.use('/sponsors', sponsorRouter);
app.use('/status', statusRouter);
app.use('/users', userRouter);
app.use('/routes', routeRouter);
app.use('/demo', demoRouter);

app.post ('/subscribe', async (req, res, next) => {
  const newSubscription = await SubscriptionModel.create ({...req.body});
  // return res.send ('hallo');
  const options = {
    vapidDetails: {
      subject: 'mailto:myemail@example.com',
      publicKey: process.env.PUBLIC_KEY,
      privateKey: process.env.PRIVATE_KEY,
    },
  };
  try {
    const res2 = await webPush.sendNotification (
      newSubscription,
      JSON.stringify ({
        title: 'Hello from server',
        description: 'this message is coming from the server',
        image: 'https://cdn2.vectorstock.com/i/thumb-large/94/66/emoji-smile-icon-symbol-smiley-face-vector-26119466.jpg',
      }),
      options
    );
    res.sendStatus(200)
  } catch (error) {
    console.log (error);
    res.sendStatus (500);
  }
});



// Lógica de inicialización
const db = mongoose.connection;
db.once('open', async () => {
  console.log('Conexión exitosa a MongoDB');

  // Crea el usuario admin si no existe
  const adminUser = await User.findOne({ _id: 'admin@admin.com' });

  if (!adminUser) {
    await User.create({
      _id: 'admin@admin.com',
      password: 'admin1',
      DNI: '99999999z',
      name: 'admin',
      phone: '999999999',
      role: 'admin',
    });
    console.log('Usuario admin creado correctamente.');
  }
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`El servidor está ejecutándose en el puerto ${PORT}`);
});
