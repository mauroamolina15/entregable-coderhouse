import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  thumbnails: [{ type: String }],
  code: { type: String, required: true, unique: true },
  status: { type: Boolean, required: true },
  category: { type: String, required: true },
});

export const Product = mongoose.model("products", productSchema);
