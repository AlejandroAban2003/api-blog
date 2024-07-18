import Evento from "../models/events.js";

// OBTENER TODOS LOS EVENTOS
export const getAllEventos = async (req, res) => {
  try {
    const eventos = await Evento.find();
    return res.status(200).json({ eventos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener los eventos" });
  }
};

// OBTENER UN EVENTO POR SU ID
export const getEventoById = async (req, res) => {
  const { id } = req.params;

  try {
    const evento = await Evento.findById(id);
    if (!evento) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    return res.status(200).json({ evento });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener el evento por ID" });
  }
};

// CREAR UN NUEVO EVENTO
export const createEvento = async (req, res) => {
  try {
    const { nombre, fecha, hora, descripcion, invitados, costo, lugar, estado, imagen, lat, lng } = req.body;
    const newEvento = new Evento({ nombre, fecha, hora, descripcion, invitados, costo, lugar, estado, imagen, lat, lng });
    await newEvento.save();
    return res.status(201).json(newEvento);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al crear el evento" });
  }
};

// ACTUALIZAR UN EVENTO POR SU ID
export const updateEventoById = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedEvento = await Evento.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedEvento) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    return res.status(200).json({ updatedEvento });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al actualizar el evento por ID" });
  }
};

// ELIMINAR UN EVENTO POR SU ID
export const deleteEventoById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvento = await Evento.findByIdAndDelete(id);
    if (!deletedEvento) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    return res.status(200).json({ message: "Evento eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar el evento por ID" });
  }
};

// ASISTIR A UN EVENTO
export const asistirEvento = async (req, res) => {
  const { id } = req.params;

  try {
    const evento = await Evento.findById(id);
    if (!evento) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    evento.asistentes += 1;
    await evento.save();

    return res.status(200).json({ message: "Asistencia registrada correctamente", evento });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al registrar la asistencia" });
  }
};
