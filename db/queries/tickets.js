const knex = require("../connection");

const getAllTickets = () => knex("tickets").select("*");
const getTicketById = (id) => knex("tickets").select("*").where({ id });
const addTicket = (ticket) => knex("tickets").insert(ticket).returning("*");
const updateTicket = (id, ticket) =>
  knex("tickets").update(ticket).where({ id }).returning("*");

module.exports = {
  getAllTickets,
  getTicketById,
  addTicket,
  updateTicket,
};
