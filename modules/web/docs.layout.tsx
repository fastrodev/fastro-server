import { Footer } from "$fastro/components/footer.tsx";
import { InlineNav } from "../../components/inline-nav.tsx";

const toc = [
  {
    title: "Get Started",
    url: "/docs/start",
  },
  {
    title: "App Structure",
    url: "/docs/structure",
  },
  {
    title: "Hello World",
    url: "/docs/hello",
  },
  {
    title: "Hello World Context",
    url: "/docs/hello-context",
  },
  {
    title: "Hello JSON",
    url: "/docs/json",
  },
  {
    title: "Routing",
    url: "/docs/route",
  },
  {
    title: "URL Params",
    url: "/docs/url-params",
  },
  {
    title: "Query Params",
    url: "/docs/query-params",
  },
  {
    title: "App Middleware",
    url: "/docs/app-middleware",
  },
  {
    title: "Route Middleware",
    url: "/docs/route-middleware",
  },
  {
    title: "Markdown Middleware",
    url: "/docs/markdown",
  },
  {
    title: "Tailwind Middleware",
    url: "/docs/tailwind",
  },
  {
    title: "Static File",
    url: "/docs/static",
  },
  {
    title: "Hello TSX",
    url: "/docs/tsx",
  },
  {
    title: "TSX Component",
    url: "/docs/tsx-component",
  },
  {
    title: "Function Component",
    url: "/docs/fn-component",
  },
  {
    title: "Server Side Rendering",
    url: "/docs/ssr",
  },
  {
    title: "OAuth",
    url: "/docs/oauth",
  },
  {
    title: "MySQL",
    url: "/docs/mysql",
  },
  {
    title: "Postgres",
    url: "/docs/postgres",
  },
  {
    title: "Redis",
    url: "/docs/redis",
  },
  {
    title: "Mongo",
    url: "/docs/mongo",
  },
  {
    title: "Deno KV",
    url: "/docs/kv",
  },
  {
    title: "Grouping",
    url: "/docs/group",
  },
  {
    title: "Deployment",
    url: "/docs/deploy",
  },
  {
    title: "Benchmarks",
    url: "/docs/benchmarks",
  },
];

export default function (
  props: {
    CSS: string;
    markdown: string;
    attrs: Record<string, unknown>;
  },
) {
  const title = props.attrs.title as string;
  const description = props.attrs.description as string;
  const image = props.attrs.image as string;
  const previous = props.attrs.previous as string;
  const next = props.attrs.next as string;

  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
        <meta property="og:image" content={image} />
        <title>{`${title} | Fastro`}</title>
        <link
          href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css"
          rel="stylesheet"
        />
        <style>
          {props.CSS}
        </style>
        <link href="/styles.css" rel="stylesheet" />
        <link href="/markdown.css" rel="stylesheet" />
      </head>
      <body class="bg-white dark:bg-gray-900 text-slate-900 dark:text-white">
        <main
          class={"grow md:grid md:grid-cols-10 p-6 md:p-0 "}
        >
          <div
            class={`hidden md:flex md:flex-col md:grow md:gap-y-3 md:col-span-2 md:items-end md:text-right md:pr-6 md:pt-6 md:pb-6`}
          >
            {toc.map((v) => {
              return <a href={v.url}>{v.title}</a>;
            })}
          </div>
          <div
            class={`md:col-span-6 md:border-l md:border-l-gray-800 md:pl-5 md:pt-6 flex flex-col gap-y-3 md:gap-y-6 max-w-4xl`}
          >
            <div class={`flex flex-col gap-y-3`}>
              <div class={`block`}>
                <InlineNav
                  title="Fastro"
                  description="Documentation"
                  destination="/docs"
                />
              </div>
              <h1 class="text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl dark:text-white">
                {title}
              </h1>
            </div>
            <hr class="h-px bg-gray-200 border-0 dark:bg-gray-800" />
            <div
              data-color-mode="auto"
              data-light-theme="light"
              data-dark-theme="dark"
              class={`markdown-body`}
            >
              {props.markdown}
            </div>

            <div
              class={`flex justify-between py-3`}
            >
              {previous && (
                <a href={previous}>
                  Previous
                </a>
              )}
              {next && (
                <a href={next}>
                  Next
                </a>
              )}
            </div>
          </div>
        </main>
        <Footer />
        <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-core.min.js" />
        <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/autoloader/prism-autoloader.min.js" />
      </body>
    </html>
  );
}
