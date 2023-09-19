import Controller from "./class.controller.js";
import TicketService from "../services/ticket.service.js";
const ticketServices = new TicketService();

export default class TicketController extends Controller {
  constructor() {
    super(ticketServices);
  }
}
