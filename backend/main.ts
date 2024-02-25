import { Application, Context, oakCors } from "./deps.ts";
import apiRouter from "./routes/api.ts";

const app = new Application();
const PORT = 8087;


app.use(oakCors()); 

// Error handling middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = "Internal Server Error";
  }
});

// Logger middleware
app.use(async (ctx: Context, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// X-Response-Time middleware
app.use(async (ctx: Context, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Router middleware
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

// Start the server
console.log(`Server started on port ${PORT}`);
await app.listen({ port: PORT });
