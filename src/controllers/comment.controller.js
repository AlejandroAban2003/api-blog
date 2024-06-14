import Comment from "../models/comments.js";


// OBTENER TODOS LOS COMENTARIOS
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate("user", "name").populate("post", "title");
    return res.status(200).json({ comments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener los comentarios" });
  }
};

// OBTENER UN COMENTARIO POR SU ID
export const getCommentById = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }
    return res.status(200).json({ comment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener el comentario por ID" });
  }
};

// CREAR UN NUEVO COMENTARIO
export const createComment = async (req, res) => {
  try {
    const { user, post, content } = req.body;
    const newComment = await Comment.create({ user, post, content });
    return res.status(201).json({ newComment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al crear el comentario" });
  }
};

// ACTUALIZAR UN COMENTARIO POR SU ID
export const updateCommentById = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedComment) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }
    return res.status(200).json({ updatedComment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al actualizar el comentario por ID" });
  }
};

// ELIMINAR UN COMENTARIO POR SU ID
export const deleteCommentById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }
    return res.status(200).json({ message: "Comentario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar el comentario por ID" });
  }
};
