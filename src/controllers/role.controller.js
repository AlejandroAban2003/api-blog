import { sendResponse } from "../helpers/validateResponse.js";
import Role from "../models/roles.js"; // Asegúrate de tener el modelo de roles adecuado

export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    sendResponse(res, 200, roles, 'roles');
  } catch (error) {
    sendResponse(res, 500, 'Roles', error.message);
  }
};

export const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return sendResponse(res, 404, 'role');
    }
    sendResponse(res, 200, role, 'role');
  } catch (error) {
    sendResponse(res, 500, 'Roles', error.message);
  }
};
