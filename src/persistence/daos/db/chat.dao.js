import Dao from "./class.dao.js";
import { ChatModel } from "./models/chat.model.js";

export default class ChatDaoMongo extends Dao {
  constructor() {
    super(ChatModel);
  }
}
