// deno-lint-ignore-file
import { Esbuild } from "../build/esbuild.ts";
import { denoPlugins, esbuild, React, ReactDOMServer } from "./deps.ts";
import {
  BUILD_ID,
  Component,
  Fastro,
  FunctionComponent,
  RenderOptions,
} from "./server.ts";

function isJSX(res: JSX.Element) {
  return res && res.props != undefined && res.type != undefined;
}

export class Render {
  #options: RenderOptions;
  #element: Component;
  #nest: Record<string, any>;
  #development: boolean;
  #server: Fastro;
  #staticPath: string;
  #reqUrl?: string;

  constructor(
    element: Component,
    options: RenderOptions,
    nest: Record<string, any>,
    server: Fastro,
    request?: Request,
  ) {
    this.#options = this.#initOptions(options);
    this.#element = element;
    this.#nest = nest;
    this.#development = server.getDevelopmentStatus();
    this.#server = server;
    this.#staticPath = `${this.#server.getStaticPath()}/js`;
    this.#reqUrl = request?.url;
  }

  #initOptions = (opt: RenderOptions) => {
    opt.status = opt.status ?? 200;
    opt.pageFolder = opt.pageFolder ?? "pages";
    opt.cache = opt.cache ?? true;
    opt.development = opt.development ?? true;
    opt.html = opt.html ?? {};
    opt.html.head = opt.html.head ?? {
      meta: [],
      script: [],
      link: [],
    };

    const meta = [{ charset: "utf-8" }, {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    }];
    if (opt.html.head.descriptions) {
      meta.push({
        name: "description",
        content: opt.html.head.descriptions,
      });
    }
    opt.html.head.meta = opt.html.head.meta ?? meta;
    opt.html.head.script = opt.html.head.script ?? [];

    opt.html.body = opt.html.body ?? {
      script: [],
    };

    const options = { ...opt };
    return this.#options = options;
  };

  #initHtml = (element: Component, props?: any) => {
    let el:
      | React.DetailedReactHTMLElement<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >
      | JSX.Element;

    if (isJSX(element as JSX.Element)) {
      el = element as JSX.Element;
    } else {
      el = React.createElement(
        element as FunctionComponent,
        this.#options.props,
      );
    }

    return (
      <html
        lang={this.#options.html?.lang}
        className={this.#options.html?.class}
      >
        <head>
          <title>{this.#options.html?.head?.title}</title>
          {this.#options.html?.head?.meta
            ? this.#options.html?.head?.meta.map((m) => (
              <meta
                property={m.property}
                name={m.name}
                content={m.content}
                itemProp={m.itemprop}
                charSet={m.charset}
              />
            ))
            : ""}
          {this.#options.html?.head?.link
            ? this.#options.html?.head?.link.map((l) => (
              <link
                href={l.href}
                integrity={l.integrity}
                rel={l.rel}
                media={l.media}
                crossOrigin={l.crossorigin}
              >
              </link>
            ))
            : ""}
          {this.#options.html?.head?.script
            ? this.#options.html?.head?.script.map((s) => (
              <script
                src={s.src}
                type={s.type}
                crossOrigin={s.crossorigin}
                nonce={s.nonce}
                integrity={s.integrity}
              />
            ))
            : ""}
        </head>
        <body className={this.#options.html?.body?.class}>
          <div id="root" className={this.#options.html?.body?.rootClass}>
            {el}
          </div>
          {props ? <script></script> : ""}
          {this.#options.html?.body?.script
            ? this.#options.html?.body?.script.map((s) => (
              <script
                src={s.src}
                type={s.type}
                crossOrigin={s.crossorigin}
                nonce={s.nonce}
              />
            ))
            : ""}
        </body>
      </html>
    );
  };

  #refreshJs = (refreshUrl: string, buildId: string) => {
    return `const es = new EventSource('${refreshUrl}');
es.onmessage = function(e) {
  if (e.data !== "${buildId}") {
    location.reload();
  };
};`;
  };

  #createHydrate(component: string, props?: any) {
    return `import { hydrateRoot } from "https://esm.sh/react-dom@18.2.0/client?dev";
import { createElement } from "https://esm.sh/react@18.2.0?dev";
import ${component} from "../pages/${component}.tsx";
const props = window.__INITIAL_DATA__ || {};
delete window.__INITIAL_DATA__ ;
const el = createElement(${component}, props);
hydrateRoot(document.getElementById("root") as Element, el);
`;
  }

  createBundle = async (elementName: string) => {
    const es = new Esbuild(elementName);
    const buildRes = await es.build();
    console.log("buildRes", buildRes.outputFiles);

    const cwd = Deno.cwd();
    const hydrateTarget =
      `${cwd}/hydrate/${elementName.toLowerCase()}.hydrate.tsx`;
    const bundlePath =
      `${cwd}/${this.#server.getStaticFolder()}/js/${elementName.toLowerCase()}.js`;

    const absWorkingDir = Deno.cwd();
    const esbuildRes = await esbuild.build({
      plugins: [...denoPlugins()],
      entryPoints: [hydrateTarget],
      format: "esm",
      jsxImportSource: "react",
      absWorkingDir,
      outfile: bundlePath,
      bundle: true,
      treeShaking: true,
      write: true,
      minify: true,
      minifySyntax: true,
      minifyWhitespace: true,
    });

    if (esbuildRes.errors.length > 0) {
      throw esbuildRes.errors;
    }

    this.#nest[this.#getRenderId(elementName)] = true;
  };

  #getRenderId = (el: string) => {
    return `render${el}`;
  };

  createHydrateFile = async (elementName: string) => {
    try {
      const target =
        `${Deno.cwd()}/hydrate/${elementName.toLowerCase()}.hydrate.tsx`;
      await Deno.writeTextFile(
        target,
        this.#createHydrate(elementName, this.#options.props),
      );
    } catch (error) {
      throw error;
    }
  };

  #renderToString = async (component: Component, cached?: boolean) => {
    let compID = "";
    this.#handleDevelopment();
    if (isJSX(component as JSX.Element)) {
      // TEST
      const es = new Esbuild("app");
      const buildRes = await es.build();
      console.log("buildRes", buildRes.outputFiles);
      // END OF TEST

      compID = `default${this.#reqUrl}`;
      if (cached && this.#nest[compID]) return this.#nest[compID];
      const html = ReactDOMServer.renderToString(this.#initHtml(component));
      return this.#nest[compID] = `<!DOCTYPE html>${html}`;
    }

    const c = component as FunctionComponent;
    compID = `${c.name}${this.#reqUrl}`;
    if (cached && this.#nest[compID]) return this.#nest[compID];

    this.#handleComponent(c);
    const layout = this.#initHtml(this.#element, this.#options.props);
    let html = ReactDOMServer.renderToString(layout);
    return this.#nest[compID] = `<!DOCTYPE html>${this.#setInitialProps(html)}`;
  };

  #handleComponent = (c: FunctionComponent) => {
    if (!this.#options.html?.body) return;
    this.#options.html?.body.script?.push({
      src: `${this.#staticPath}/${c.name.toLocaleLowerCase()}.js`,
    });
  };

  #setInitialProps = (layout: string) => {
    return layout.replace(
      `<script></script>`,
      `<script>window.__INITIAL_DATA__ = ${
        JSON.stringify(this.#options.props)
      }</script>`,
    );
  };

  #handleDevelopment = () => {
    if (!this.#development) return;
    const refreshPath = `${this.#staticPath}/refresh.js`;
    this.#server.push(
      "GET",
      refreshPath,
      () =>
        new Response(this.#refreshJs("/refresh", BUILD_ID), {
          headers: {
            "Content-Type": "application/javascript",
          },
        }),
    );

    if (this.#options.html?.head?.script) {
      this.#options.html?.head.script?.push({
        src: refreshPath,
      });
    }
  };

  render = async () => {
    const html = await this.#renderToString(
      this.#element,
      this.#options.cache,
    );
    return new Response(html, {
      status: this.#options.status,
      headers: {
        "content-type": "text/html",
      },
    });
  };
}
