import fastro, { render } from "../server/mod.ts";
import App from "./pages/app.tsx";
import Hello from "./pages/hello.tsx";
import User from "./pages/user.tsx";

// define a hello component to render
// attach this to page declaration
const hello = render(<Hello />)
  // used for SSR hydration process
  // if you don't specify, the default is "./pages"
  .dir("./examples/pages");

const app = render(<App />)
  .dir("./examples/pages");

const user = render(<User />)
  .dir("./examples/pages");

const f = fastro()
  // set static endpoint url
  // default folder is at ./public
  // this is a place where hydrated files generated
  .static("/static")
  // set endpoint for app page
  .page("/", hello, (req, res) => {
    // you can access the http request object
    // console.log(req.url);
    return res.ssr(hello)
      // add css
      .link(
        `rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"`,
      )
      // you can inject react props from server
      .render();
  })
  .page("/:user", user, (req, res) => {
    // console.log(req.match);
    // you can access the http request object
    const u = req.match?.pathname.groups.user;
    return res.ssr(user)
      // you can inject react props from server
      .props({ data: u })
      .link(
        `rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"`,
      )
      .render();
  })
  // set endpoint for hello page
  .page("/:user/count", app, (req, res) => {
    const user = req.match?.pathname.groups.user;
    return res.ssr(app)
      // and set the html title and other meta data
      // for seo purpose
      .title(`Hello ${user}`)
      .link(
        `rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"`,
      )
      .props({ data: user })
      .meta(`name="viewport" content="width=device-width"`)
      .render();
  });

await f.serve();
