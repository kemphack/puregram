# `Dice`

```ts
import { Dice } from 'puregram';
```

## Constructor

```ts
const dice = new Dice(payload);
```

| Параметр  |      Тип       |
| :-------: | :------------: |
| `payload` | `TelegramDice` |

## Геттеры структуры

### Содержание

* [`emoji`](#emoji)
* [`value`](#value)

---

### `emoji`

**Эмодзи «костей»**

```ts
dice.emoji // => DiceEmoji
```

### `value`

**Значение «костей»**

* _`1-6` для эмодзи `🎲` и `🎯`_
* _`1-5` для эмодзи `🏀` и `⚽️`_
* _`1-64` для эмодзи `🎰`_

```ts
dice.value // => number
```