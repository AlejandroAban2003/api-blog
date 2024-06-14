import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

// Importa las rutas y el middleware
import { createAdmin, createRoles } from './libs/initialSetup.js';
import loginRoute from './routes/login.routes.js';
import userRoute from './routes/user.routes.js';
import roleRoute from './routes/roles.routes.js';
import commentRoute from './routes/comment.routes.js';
import postRoute from './routes/post.routes.js';
import { verifyToken } from './middleware/verifyToken.js'; // Importa el middleware de autenticación

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '5mb' }));

dotenv.config();

// Función asíncrona para inicializar roles y admin (como en tu código)
async function initializeApp() {
  await createRoles();
  await createAdmin();
}
initializeApp();

// Aquí se montan las rutas
app.use('/api', loginRoute);
app.use('/api', userRoute);
app.use('/api', roleRoute);
app.use('/api', commentRoute);
app.use('/api', postRoute);

// Middleware para manejar rutas protegidas con autenticación
app.use('/api', verifyToken); // Monta el middleware para todas las rutas que lo necesiten

// Rutas protegidas que requieren autenticación
app.use('/api', userRoute); // Ejemplo, ajusta según las rutas protegidas que tengas

// Manejador de ruta no encontrada
app.use((req, res) => {
  res.status(404).json('Ruta no encontrada');
});

export default app;
