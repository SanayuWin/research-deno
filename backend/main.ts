import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import apiRouter from "./routes/api.ts";

const app = new Application();
const PORT = 8087;

// Logger middleware
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});


// X-Response-Time middleware
app.use(async (ctx, next) => {
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
