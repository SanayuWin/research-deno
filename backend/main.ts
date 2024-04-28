import { Application, Context} from "./deps.ts";
import apiRouter from "./routes/api.ts";

const app = new Application();

app.use(async (ctx: Context, next) => {
    await next();

    ctx.response.headers.set("X-Powered-By", "Deno Oak");
    ctx.response.headers.set("Connection", "keep-alive");
    ctx.response.headers.set("Keep-Alive", "timeout=5");
    ctx.response.headers.set("Access-Control-Allow-Origin", "*");
});


app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

await app.listen({ port: 8087 });