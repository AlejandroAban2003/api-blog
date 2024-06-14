import user from "../models/user.js";

// OBTENER TODOS LOS USUARIOS
export const getAll = async (req, res) => {
  try {
    const users = await user.find().populate("id_rol", "name");
    const userFiltered = users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      rol: user.id_rol.map((role) => role.name).join(","),
      b_activo: user.b_activo,
    }));

    return res.status(200).json({ users: userFiltered });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al obtener los usuarios" });s
  }
};

//OBTENER UN USUARIO POR ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const foundUser = await user.findById(id);
    if (!foundUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({ users: foundUser });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al obtener el usuario por ID" });
  }
};

//ACTUALIZAR UN USUARIO POR SU ID
export const updateUserById = async (req, res) => {
  const { id } = req.params;
  let updatedUserData = req.body; // Datos actualizados del usuario

  // Validación para asegurar que id_rol está presente
  if (!updatedUserData.id_rol) {
    return res.status(400).json({ message: "El campo 'id_rol' es requerido" });
  }

  try {
    // Si se proporciona id_rol como string único, conviértelo en un array para cumplir con el esquema
    if (typeof updatedUserData.id_rol === "string") {
      updatedUserData = {
        ...updatedUserData,
        id_rol: [updatedUserData.id_rol],
      };
    }

    // Buscar y actualizar el usuario por su ID
    const updatedUser = await user.findByIdAndUpdate(id, updatedUserData, {
      new: true,
    });

    // Verificar si el usuario se encontró y se actualizó correctamente
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Si el usuario se actualizó correctamente, enviarlo como respuesta
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al actualizar el usuario por ID" });
  }
};


// ELIMINAR UN USUARIO POR SU ID
export const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar y eliminar el usuario por su ID
    const deletedUser = await user.findByIdAndDelete(id);

    // Verificar si el usuario se encontró y se eliminó correctamente
    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Si el usuario se eliminó correctamente, enviar una respuesta exitosa
    return res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al eliminar el usuario por ID" });
  }
};
