import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  title: String,
  subject: String,
  fileUrl: String
}, { timestamps: true });

export default mongoose.model("Material", materialSchema);
