import * as eventoController from "../controllers/event.controller.js";
import { Router } from "express";

const router = Router();

router.get("/eventos", eventoController.getAllEventos);
router.get("/eventos/:id", eventoController.getEventoById);
router.post("/eventos", eventoController.createEvento);
router.put("/eventos/:id", eventoController.updateEventoById);
router.delete("/eventos/:id", eventoController.deleteEventoById);

// Nueva ruta para asistir a un evento
router.post("/eventos/:id/asistir", eventoController.asistirEvento);

export default router;
