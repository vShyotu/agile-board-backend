const Koa = require("koa");
const Router = require("@koa/router");
const app = new Koa();
const router = new Router();
const port = process.env.APP_PORT || 3000;
const env = process.env.NODE_ENV;

// Temporary heartbeat route
router.get("/heartbeat", async (ctx, next) => {
  ctx.status = 200;
  ctx.body = { serviceName: "agile-board-backend", status: ctx.status };
  await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(port);
console.log(`App listening on port ${port} in ${env}mode`);

module.exports = server;
