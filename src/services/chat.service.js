import Service from "./class.service.js";
import ChatDao from "../persistence/daos/db/chat.dao.js";

export default class ChatService extends Service {
  constructor() {
    super(ChatDao);
  }
}
