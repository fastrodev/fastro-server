import fastro, { Context, HttpRequest } from "../server/mod.ts";

const f = new fastro();

f.get(
  "/",
  (_req: HttpRequest, ctx: Context) => {
    return ctx.send(<h1>Hello, jsx!</h1>, 200);
  },
);

await f.serve();
