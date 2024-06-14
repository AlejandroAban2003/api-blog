import Post from "../models/posts.js";

// Obtener todas las publicaciones
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name");
    return res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener las publicaciones" });
  }
};

// Obtener una publicación por su ID
export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }
    return res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener la publicación por ID" });
  }
};

// Crear una nueva publicación
export const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newPost = await Post.create({ title, content, author });
    return res.status(201).json({ newPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al crear la publicación" });
  }
};

// Actualizar una publicación por su ID
export const updatePostById = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }
    return res.status(200).json({ updatedPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al actualizar la publicación por ID" });
  }
};

// Eliminar una publicación por su ID
export const deletePostById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }
    return res.status(200).json({ message: "Publicación eliminada correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar la publicación por ID" });
  }
};
