import Dao from "./class.dao.js";
import { TicketModel } from "./models/ticket.model.js";

export default class TicketDaoMongo extends Dao {
  constructor() {
    super(TicketModel);
  }
}
