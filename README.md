# puregram

`puregram` is a powerful Node.js package that allows you to easily interact with [Telegram API](https://core.telegram.org/bots/api) 🚀

| [Examples](docs/examples) |
| ------------------------- |

## Features

* 100% Telegram API coverage
* Works with JavaScript and TypeScript
* Typings

## Installation
> **[Node.js](https://nodejs.org/) 12.0.0 or newer is required**

### Yarn
```
yarn add puregram
```

### NPM
```
npm i puregram
```

## Example usage

```ts
import { Telegram, MessageContext } from 'puregram';

const telegram: Telegram = new Telegram({
  token: process.env.TOKEN
});

telegram.updates.on('message', (context: MessageContext) => {
  context.send('Hi!');
});

telegram.updates.startPolling().catch(console.error);
```

## Thanks to
Biggest thanks to [Negezor](https://github.com/negezor) for his [vk-io](https://github.com/negezor/vk-io) library that helped me with this package!

### [Telegram chat](https://t.me/puregram_chat)
