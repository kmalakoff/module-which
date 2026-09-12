# module-which

Finds a module using path and node conventions.

```bash
npm install module-which
```

```js
var which = require('module-which');

which('node', function (err, commandPath) {
  if (err) throw err;
  console.log(commandPath);
});
```

The default export also returns a Promise when no callback is supplied. Pass `{ cwd, env, root }` to control lookup context. The named `prependEnvPath(options)` helper returns the path variable name and a value with local module bins prepended.

## Documentation

[API Docs](https://kmalakoff.github.io/module-which/)
