import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: { type: Number },
      },
    ],
  },
  email: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
});

export const Cart = mongoose.model("carts", cartSchema);
