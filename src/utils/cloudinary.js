import { v2 as cloudinary } from "cloudinary";
import { cloud_name, api_key, api_secret } from "../config.js";

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
  secure: true,
});

export async function uploadImage(file) {
  // Verificar si `file` es un string base64
  if (file.startsWith('data:image')) {
    return await cloudinary.uploader.upload(file, {
      folder: "ganadoLink",
    });
  }
  // Si no es base64, manejar como un path de archivo u otro método
}


export async function deleteImage(publicId) {
  // Nota: Asegúrate de que `publicId` sea el ID correcto de Cloudinary
  return await cloudinary.uploader.destroy(publicId);
}

