const Koa = require("koa");
const app = new Koa();
const port = process.env.APP_PORT || 3000;
const env = process.env.NODE_ENV || "";

app.use(async (ctx) => {
  ctx.body = "Hello World";
});

app.listen(port);

console.log(`App listening on port ${port} in ${env}mode`);
