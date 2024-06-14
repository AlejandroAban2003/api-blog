import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

// Configuración de Multer para guardar las imágenes en la carpeta public/img
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public', 'img'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Middleware para servir archivos estáticos y CORS
app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));

// Ruta para manejar la subida de archivos
app.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.status(200).json({
      message: 'Imagen subida exitosamente',
      imageUrl: `/public/img/${req.file.filename}`,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error subiendo la imagen' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
