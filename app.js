const Koa = require("koa");
const Router = require("@koa/router");
const app = new Koa();
const router = new Router();
const port = process.env.APP_PORT || 3000;
const env = process.env.NODE_ENV;

const ticketRoutes = require("./routes/tickets");

// Temporary heartbeat route
router.get("/heartbeat", async (ctx, next) => {
  ctx.status = 200;
  ctx.body = { serviceName: "agile-board-backend", status: ctx.status };
  await next();
});

app.use(router.routes());
app.use(ticketRoutes.routes());
app.use(router.allowedMethods());

if (process.env.NODE_ENV !== "test") {
  app.listen(port);
  console.log(`App listening on port ${port} in ${env} mode`);
}

module.exports = app;
