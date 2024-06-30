// Original source: https://medium.com/recoding/rendering-html-css-in-deno-using-view-engine-e07469613598
// Modifications: Stanisław Polak <polak@agh.edu.pl>

import {
  Application,
  Router,
  Context,
} from "https://deno.land/x/oak/mod.ts";
import {
  dejsEngine,
  oakAdapter,
  viewEngine,
} from "https://deno.land/x/view_engine/mod.ts";
import logger from "https://deno.land/x/oak_logger/mod.ts";


const app: Application = new Application();
const router: Router = new Router({
});


app.use(logger.logger);
app.use(logger.responseTime);


app.use(viewEngine(oakAdapter, dejsEngine, { viewRoot: "./views" }));

router.get("/", async (ctx: Context) => {
  await ctx.render("index.ejs", {
    data: { title: "First Oak application in Deno" },
  });
});

router.post("/", async (ctx: Context) => {
  const reqBodyValue = await ctx.request.body().value;
  ctx.response.body = `Hello '${reqBodyValue.get("name")}'`;
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log("App is listening to port: 8000");
await app.listen({ port: 8000 });