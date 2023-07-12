import fastro, { Context, HttpRequest } from "../mod.ts";
import app from "../pages/app.tsx";

const f = new fastro();

f.get("/api", () => Response.json({ msg: "hello" }));
f.static("/static", { folder: "static", maxAge: 90 });
f.page(
  "/",
  app,
  (_req: HttpRequest, ctx: Context) => {
    const options = {
      props: { data: "Guest" },
      status: 200,
      html: { head: { title: "React Component" } },
    };
    return ctx.render(options);
  },
);

await f.serve();
