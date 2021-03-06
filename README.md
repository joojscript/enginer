<h1 align="center">
  <img src="https://github.com/joojscript/enginer/blob/master/.github/assets/logo.png?raw=true" height="200" /> <br />
  Enginer
</h1>

An utility js/ts library to make Javacript conccurent!

## Motivation

While trying to make high-scalable and performant systems, I end up being in contact with node.js' **worker_threads** which were trully nice! But unfortunelly, at least in my search, I could not find any implementations that support typescript.

I end up trying some work arounds, but, as a developer that likes a lot concurrency, I decided to make my own implementation. So here it is! Hope it helps! :)

## Installation

```shell
npm install enginer
```

or

```shell
yarn add enginer
```

⚠ **warning**: Typescript is **not** a required dependecy, as this library works without it. But if your code is in ts, you need to have it installed. 

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

## ToDo

- 🕐 Support commands as well as files/scripts.

## License

[MIT](https://choosealicense.com/licenses/mit/)
