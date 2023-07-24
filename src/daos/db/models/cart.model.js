import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      default: [],
    },
  ],
});

export const Cart = mongoose.model("cart", cartSchema);
