import Role from "../models/roles.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    ///! campos vacios
    if (!email || !password)
      return res.status(400).json({ message: "empty field" });

    const userFound = await User.findOne({ email: req.body.email });

    if (!userFound)
      return res
        .status(400)
        .json({ message: "email or password is incorrect" });

    if (password != userFound.password)
      return res.status(400).json({ message: "email or password is incorrect" });

    ///! integración token
    const token = jwt.sign({ id: userFound._id }, "process.env.SECRET_KEY", {
      expiresIn: 3600, // 1 Hora
    });

    const nameRol = await Role.findById(userFound.id_rol);

    return res.status(200).json({
      _id: userFound._id,
      name: userFound.name,
      email: userFound.email,
      rol: nameRol.name,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const SingUp = async (req, res) => {
  try {
    const { name, email, password, id_rol } = req.body;
    const defaultRole = await Role.findOne({ name: "user" });

    const responseData = await User.create({
      name,
      email,
      password,
      id_rol: defaultRole ? [defaultRole._id] : [],
    });
    res.send({ data: responseData });
  } catch (error) {
    console.error("Error interno del servidor:", error);
    return res.status(500).json({ Error: error });
  }
};
