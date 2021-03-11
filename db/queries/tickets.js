const knex = require("../connection");

const getAllTickets = () => knex("tickets").select("*");
const getTicketById = (id) => knex("tickets").select("*").where({ id });
const addTicket = (ticket) => knex("tickets").insert(ticket).returning("*");
const updateTicket = (id, ticket) =>
  knex("tickets").update(ticket).where({ id }).returning("*");
const deleteTicket = (id) => knex("tickets").del().where({ id }).returning("*");
const countTickets = async () => {
  const countResult = await knex("tickets").count("id");
  return parseInt(countResult[0].count);
};

module.exports = {
  getAllTickets,
  getTicketById,
  addTicket,
  updateTicket,
  deleteTicket,
  countTickets,
};
