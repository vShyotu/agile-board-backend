const knex = require("../connection");

const getAllTickets = () => knex("tickets").select("*");
const getTicketById = (id) => knex("tickets").select("*").where({ id });

module.exports = {
  getAllTickets,
  getTicketById,
};
