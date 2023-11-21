import mongoose, { Schema, model } from "mongoose";

const ticketSchema = new Schema({
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts", required: true },
  code: { type: String, required: true, unique: true },
  purchase_datetime: { type: Date, required: true, default: Date.now },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
});

export const TicketModel = model("tickets", ticketSchema);
