const Router = require("@koa/router");
const queries = require("../db/queries/tickets");

const router = new Router();
const BASE_URL = `/api/v1/tickets`;

router.get(BASE_URL, async (ctx, _) => {
  try {
    const tickets = await queries.getAllTickets();
    ctx.body = {
      data: tickets,
    };
  } catch (err) {
    console.log(err);
  }
});

router.get(`${BASE_URL}/:id`, async (ctx, _) => {
  try {
    const id = parseInt(ctx.params.id);
    const tickets = await queries.getTicketById(id);
    if (tickets.length > 0) {
      ctx.body = {
        data: tickets[0],
      };
    } else {
      ctx.status = 404;
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
