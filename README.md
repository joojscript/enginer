<h1 align="center">
  <img src="https://github.com/joojscript/voodoo/blob/master/.github/assets/logo.png?raw=true" height="200" /> <br />
  Voodoo
</h1>

An utility js/ts library to make Javscript conccurent!

## Motivation

While trying to make high-scalable and performant systems, I end up being in contact with node.js' **worker_threads** which were trully nice! But unfortunelly, at least in my search, I could not find any implementations that support typescript.

I end up trying some work arounds, but, as a developer that likes a lot concurrency, I decided to make my own implementation. So here it is! Hope it helps! :)

## Usage

### Single Worker

```typescript
const filepath = resolve(__dirname, "file.ts");

new Worker({ filepath });
```

### Worker Pool

```typescript
const filepath = resolve(__dirname, "file.ts");

new Pool({
  max: 4,
  workers: [
    new Worker({ filepath }),
    new Worker({ filepath }),
    new Worker({ filepath }),
    new Worker({ filepath }),
    new Worker({ filepath }),
    new Worker({ filepath }),
    new Worker({ filepath }),
    new Worker({ filepath }),
    new Worker({ filepath }),
  ],
});
```
