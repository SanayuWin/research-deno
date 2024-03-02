import { Application, } from "./deps.ts";
import apiRouter from "./routes/api.ts";


const app = new Application();
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

await app.listen({ port: 8087 });