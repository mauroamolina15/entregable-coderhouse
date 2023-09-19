import Service from "./class.service.js";
import TicketDaoMongo from "../persistence/daos/mongodb/ticketDao.js";
const ticketDao = new TicketDaoMongo();

export default class TicketService extends Service {
  constructor() {
    super(ticketDao);
  }
}
