<p align='center'>
  <img src='https://github.com/nitreojs/puregram/blob/master/docs/logo.png' />
</p>

<p align='center'>
  <b>Powerful</b>
  <a href='nodejs.org'>Node.js</a>
  package that allows you to
  <b>easily</b>
  interact with
  <a src='https://core.telegram.org/bots/api'>Telegram API</a>
  🚀
</p>

<table align='center'>
  <tr>
    <th>
      <a href='https://github.com/nitreojs/puregram/tree/master/docs/examples'>
        🤖 Examples
      </a>
    </th>
    <th>
      <a href='https://github.com/nitreojs/puregram/tree/master/docs'>
        📖 Documentation
      </a>
    </th>
    <th>
      <a href='https://t.me/puregram_chat'>
        💬 Chat
      </a>
    </th>
    <th>
      <a href='https://t.me/puregram_channel'>
        💬 Channel
      </a>
    </th>
  </tr>
</table>

## Features

* 100% [**Telegram Bot API**](https://core.telegram.org/bots/api) coverage
* Works with JavaScript and TypeScript
* Has **57** tests and all of them passes every build

## Installation
> **[Node.js](https://nodejs.org/) 12.0.0 or newer is required**

```sh
$ yarn add puregram
$ npm i -S puregram
```

## Example usage

```js
import { Telegram } from 'puregram';

const telegram = new Telegram({
  token: process.env.TOKEN
});

telegram.updates.on(
  'message',
  (context) => context.send('Hello, World!')
);

telegram.updates.on(
  'callback_query',
  (context) => (
    context.message.editMessageText('*You just clicked the inline button!*', {
      parse_mode: 'Markdown'
    })
  )
);

telegram.updates.startPolling().catch(console.error);
```

[🤖 Click to see more examples!](https://github.com/nitreojs/puregram/tree/master/docs/examples)

## Community

### Packages that might be useful to you

- [**@puregram/hear**](https://github.com/nitreojs/puregram/tree/master/packages/hear): Simple implementation of hear system
- [**@puregram/scenes**](https://github.com/nitreojs/puregram/tree/master/packages/scenes): Simple implementation of middleware-based scene management
- [**@puregram/session**](https://github.com/nitreojs/puregram/tree/master/packages/session): Simple implementation of sessions
- [**@puregram/utils**](https://github.com/nitreojs/puregram/tree/master/packages/utils): _Almost_ useful utilities

## Thanks to
Biggest thanks to [Negezor](https://github.com/negezor) for his [vk-io](https://github.com/negezor/vk-io) library that helped me with this package!
