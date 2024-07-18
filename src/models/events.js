import { Schema, model } from "mongoose";

const eventoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    hora: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    invitados: [String],
    costo: {
      type: Number,
      required: true,
    },
    lugar: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      enum: ["próximos", "en curso", "concluidos", "cancelados"],
      required: true,
    },
    imagen: {
      type: String, // URL de la imagen
      required: false,
    },
    lat: {
      type: Number,
      required: false,
    },
    lng: {
      type: Number,
      required: false,
    },
    asistentes: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("Evento", eventoSchema);
