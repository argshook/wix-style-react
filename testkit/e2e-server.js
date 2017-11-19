const express = require('express');
const {resolve} = require('path');
const promisify = require('../scripts/tools/promisify');
const glob = promisify(require('glob'));
const app = express();
const bundler = require('./e2e-server-bundler');

const PORT = 6006;
const staticFiles = './storybook-static';

const makePath = (path = '') =>
  resolve(__dirname, '..', 'src', path);

const getTemplate = ({name, source}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${name}</title>
  <script>
${source}
  </script>
</head>
<body>
  <div id="root"></div>
  hello ${name}
</body>
</html>
`;

glob('**/templates/*.js', {cwd: makePath()})
  .then(files =>
    files
      .map(f => {
        const [, componentName, templateName] = f.match(/(\w*?)\/templates\/(\w*?)\.js$/);

        console.log(componentName, templateName);

        return {
          name: componentName,
          templateName,
          path: f
        };
      })
      .reduce((router, componentMetadata) =>
        router.get(`/${componentMetadata.name}`, (req, res) => {
          console.log(componentMetadata);
          const component = require(resolve(__dirname, '..', 'dist', 'src', componentMetadata.path));
          res.send(getTemplate({ ...componentMetadata, source: component }));
          // bundler(componentMetadata)
          // .then(source => res.send(getTemplate({...componentMetadata, source})))
            // .catch(err => console.log(`ERROR: Unable to bundle ${componentMetadata.name}`, err));
        }),
        express.Router()
      ))

  .catch(err => console.warn('ERROR: glob failed', err))

  .then(componentsRouter => {
    app.use('/', express.static(staticFiles));
    app.use('/components', componentsRouter);

    app.listen(PORT, () => {
      console.log(`e2e is running at http://localhost:${PORT}, serving files from ${staticFiles}`);
    });
  });
