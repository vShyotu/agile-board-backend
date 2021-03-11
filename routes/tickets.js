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
      ctx.body = {
        errors: ["Could not find a ticket with that ID"],
      };
    }
  } catch (err) {
    console.log(err);
  }
});

router.post(BASE_URL, async (ctx, _) => {
  try {
    const tickets = await queries.addTicket(ctx.request.body);

    if (tickets.length > 0) {
      ctx.status = 201;
      ctx.body = {
        data: tickets[0],
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        errors: ["Something went wrong whilst trying to create the ticket"],
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      errors: ["Something went wrong whilst trying to create the ticket"],
    };
  }
});

router.put(`${BASE_URL}/:id`, async (ctx, _) => {
  try {
    const id = parseInt(ctx.params.id);
    const tickets = await queries.updateTicket(id, ctx.request.body);

    if (tickets.length > 0) {
      ctx.status = 200;
      ctx.body = {
        data: tickets[0],
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        errors: ["Could not find a ticket with that ID"],
      };
    }
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = {
      errors: ["Something went wrong whilst trying to update the ticket"],
    };
  }
});

router.delete(`${BASE_URL}/:id`, async (ctx, _) => {
  try {
    const id = parseInt(ctx.params.id);
    const tickets = await queries.deleteTicket(id);

    if (tickets.length > 0) {
      ctx.status = 200;
      ctx.body = {
        data: tickets[0],
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        errors: ["Could not find a ticket with that ID"],
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      errors: ["Something went wrong whilst trying to delete the ticket"],
    };
  }
});

module.exports = router;
