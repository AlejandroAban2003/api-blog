import { Schema, model } from "mongoose";

export const roleSchema = new Schema(
  {
    name: String,
    b_activo: {
      type: Boolean,
      default: true,
    },
  },

  {
    versionKey: false,
  }
);

export default model("Role", roleSchema);
