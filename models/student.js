import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  usn: { type: String, required: true, unique: true },
  department: String,
  score: Number
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);
