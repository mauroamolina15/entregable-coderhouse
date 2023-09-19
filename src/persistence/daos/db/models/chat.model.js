import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
});

export const ChatModel = mongoose.model("chats", chatSchema);
