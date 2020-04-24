let { inspect } = require('util');

class Dice {
  constructor(payload) {
    this.payload = payload;
  }

  get emoji() {
    return this.payload.emoji;
  }

  get value() {
    return this.payload.value;
  }

  get isDice() {
    return this.emoji === '🎲';
  }

  get isDarts() {
    return this.emoji === '🎯';
  }

  [inspect.custom](depth, options) {
    let { name } = this.constructor;

    let payloadToInspect = {
      value: this.value,
      emoji: this.emoji,
      isDice: this.isDice,
      isDarts: this.isDarts
    };

    let payload = inspect(payloadToInspect, { ...options, compact: false });

    return `${options.stylize(name, 'special')} ${payload}`;
  }
}

module.exports = Dice;
