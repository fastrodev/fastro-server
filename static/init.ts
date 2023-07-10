const version = "v0.73.0";
export { version };

const init = async (name?: string, version?: string) => {
  const projectName = name ?? "my-project";
  try {
    const v = version ?? "v0.73.0";
    // vscode
    await Deno.mkdir(".vscode");
    await Deno.writeTextFile(
      ".vscode/settings.json",
      `{
  "deno.enable": true,
  "deno.lint": true,
  "deno.unstable": true,
  "deno.codeLens.test": true,
  "editor.defaultFormatter": "denoland.vscode-deno",
  "[typescript]": {
    "editor.defaultFormatter": "denoland.vscode-deno",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.organizeImports": true
    }
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "denoland.vscode-deno",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.organizeImports": true
    }
  },
  "[yaml]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features"
  }
}`,
    );
    // main entry point
    await Deno.writeTextFile(
      "main.ts",
      `import fastro, {
  Context,
  HttpRequest,
} from "https://deno.land/x/fastro@${v}/mod.ts";
import App from "./pages/app.tsx";

const f = new fastro();

f.get("/api", () => Response.json({ msg: "hello" }));
f.static("/static", { folder: "static", maxAge: 90 });
f.page(
  "/",
  App,
  (_req: HttpRequest, ctx: Context) => {
    const options = {
      status: 200,
      html: { head: { title: "React Component" } },
    };
    return ctx.props({ data: "Guest" }).render(options);
  },
);

await f.serve();
      
  `,
    );
    // github action
    await Deno.mkdir(".github/workflows", { recursive: true });
    await Deno.writeTextFile(
      ".github/workflows/build.yml",
      `name: build
  on:
    push:
        branches:
        - main
  jobs:
    build:
      runs-on: ubuntu-latest
  
      permissions:
        id-token: write
        contents: write
        packages: write
  
      steps:
        - name: Clone repository
          uses: actions/checkout@v3
  
        - uses: denoland/setup-deno@v1
          with:
            deno-version: vx.x.x
  
        - name: Deploy to Deno Deploy
          uses: denoland/deployctl@v1
          with:
            project: ${projectName}
            entrypoint: main.ts    
`,
    );
    // deno.json
    await Deno.writeTextFile(
      "deno.json",
      `{
  "lock": false,
  "imports": {
    "react/": "https://esm.sh/react@18.2.0/"
  },
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "lib": [
      "dom",
      "dom.iterable",
      "dom.asynciterable",
      "deno.ns",
      "deno.unstable"
    ]
  },
  "tasks": {
    "dev": "deno run -A --watch main.ts --development",
    "start": "deno run -A main.ts",
    "test": "rm -rf cov && deno test -A --coverage=cov && deno coverage cov"
  }
}`,
    );
    // readme.md
    await Deno.writeTextFile(
      "readme.md",
      `# Readme

How to start development:
\`\`\`
deno task dev
\`\`\`
It will reload your browser automatically if changes occur.

How to start production:
\`\`\`
deno task start
\`\`\`

`,
    );
  } catch (error) {
    throw error;
  }
};
export default init;
