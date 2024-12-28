## module-which

Finds a module using path and node conventions.

```typescript
import which from 'module-which';

which('biome', (err, biome) => {
  // biome = path to biome
})
```

```typescript
import { whichAll } from 'module-which';

whichAll(['biome', 'which'], (err, commands) => {
  // commands[0] = path to biome
  // commands[1] = path to which
})
```

### Documentation

[API Docs](https://kmalakoff.github.io/module-which/)
