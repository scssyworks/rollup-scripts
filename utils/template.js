const { resolvePath } = require("rollup-scripts-utils");
const { readFileSync } = require("node:fs");
const Handlebars = require("handlebars");

const defaultTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <style>*{padding:0;margin:0;outline:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;font-size:16px;min-height:100vh;color:#333}.root{max-width:1440px;margin:0 auto}h1,h2,h3,h4,h5,h6{font-weight:300;letter-spacing:1px;margin:0}.center{margin:0 auto;text-align:center}.m-1{margin:8px}.mt-1{margin-top:8px}.mb-1{margin-bottom:8px}.ml-1{margin-left:8px}.mr-1{margin-right:8px}.m-2{margin:16px}.mt-2{margin-top:16px}.mb-2{margin-bottom:16px}.ml-2{margin-left:16px}.mr-2{margin-right:16px}.m-3{margin:24px}.mt-3{margin-top:24px}.mb-3{margin-bottom:24px}.ml-3{margin-left:24px}.mr-3{margin-right:24px}.m-4{margin:32px}.mt-4{margin-top:32px}.mb-4{margin-bottom:32px}.ml-4{margin-left:32px}.mr-4{margin-right:32px}.m-5{margin:40px}.mt-5{margin-top:40px}.mb-5{margin-bottom:40px}.ml-5{margin-left:40px}.mr-5{margin-right:40px}</style>
    <style>header{padding:20px 0;margin-top:20px}section div{text-align:center;color:#999;margin-bottom:36px}app-root{display:block;border-radius:4px;background-color:#eee;padding:40px;font-size:20px;text-align:center;max-width:1200px;margin:0 auto}app-root div{margin:0}</style>
    {{#each js}}
    <script src="{{this.fileName}}" defer></script>
    {{/each}}
  </head>
  <body>
    <div class="root">
    <header>
        <h1 class="center">Rollup Boilerplate</h1>
    </header>
    <section>
        <div>Create modern plugins and libraries in TypeScript, JavaScript and React</div>
        <app-root></app-root>
    </section>
    </div>
  </body>
</html>`;

module.exports = {
  getTemplate(props, htmlTemplatePath) {
    const { js } = props.files;
    if (typeof htmlTemplatePath === "string") {
      const userTemplatePath = resolvePath(htmlTemplatePath);
      const hbs = readFileSync(userTemplatePath, { encoding: "utf-8" });
      const compiledHbs = Handlebars.compile(hbs);
      return compiledHbs(props);
    }
    const compiledTemplate = Handlebars.compile(defaultTemplate);
    return compiledTemplate({ js });
  },
};
