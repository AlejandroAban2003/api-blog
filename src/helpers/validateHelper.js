import { validationResult } from "express-validator";

export const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const verificarExistenciaYAgregarMensaje = async (
  Modelo,
  id,
  tipo,
  errorMessages
) => {
  const existe = await Modelo.findById(id);
  if (!existe) {
    errorMessages.push(`${tipo} con el ID ${id} erroneos o no encontrado`);
  }
};

export const validarTipoDeDato = async (
  campo,
  nombreCampo,
  esArreglo,
  errorMessages
) => {
  if (esArreglo) {
    if (
      !Array.isArray(campo) ||
      !campo.every((item) => typeof item === "object")
    ) {
      errorMessages.push(
        `El objeto '${nombreCampo}' es erroneo`
      );
    }
  } else {
    if (typeof campo !== "object" || campo === null || Array.isArray(campo)) {
      errorMessages.push(`El objeto '${nombreCampo}' es erroneo`);
    }
  }
};
