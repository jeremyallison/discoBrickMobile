import {Bt} from './bt';

const HELLO_FLASH_DURATION = 150;

const TURN_ON = new Uint8Array([0xcc, 0x23, 0x33]);

const TURN_OFF = new Uint8Array([0xcc, 0x24, 0x33]);

export const Presets = {
  FADE_SEVEN: 0x25,
  THROB_RED: 0x26,
  THROB_GREEN: 0x27,
  THROB_BLUE: 0x28,
  THROB_YELLOW: 0x29,
  STROBE_SEVEN: 0x30,
  STROBE_RED: 0x31,
  STROBE_GREEN: 0x32,
  STROBE_BLUE: 0x33,
  STROBE_YELLOW: 0x34,
  STROBE_CYAN: 0x35,
  STROBE_PURPLE: 0x36,
  STROBE_WHITE: 0x37,
  CUT_SEVEN: 0x38,
};

export const SequenceModes = {
  FADE: 0x3a,
  CUT: 0x3b,
  STROBE: 0x3c,
};

export const PayloadTemplates = {
  COLOR: {HEADER: [0x56], FOOTER: [0x00, 0xf0, 0xaa]},
  PRESET: {HEADER: [0xbb], FOOTER: [0x44]},
  SEQUENCE: {HEADER: [0x99], FOOTER: [0xff, 0x66]},
};

const encapsulate = (parts) => new Uint8Array([].concat(parts.flat()));

const buildColorPayload = (color) =>
  encapsulate([
    PayloadTemplates.COLOR.HEADER,
    Object.values(color),
    PayloadTemplates.COLOR.FOOTER,
  ]);

const buildPresetPayload = (preset, speed) =>
  encapsulate([
    PayloadTemplates.PRESET.HEADER,
    preset,
    speed,
    PayloadTemplates.PRESET.FOOTER,
  ]);

const buildSequencePayload = (colors, speed, mode) =>
  encapsulate([
    PayloadTemplates.SEQUENCE.HEADER,
    colors,
    speed,
    mode,
    PayloadTemplates.SEQUENCE.FOOTER,
  ]);

const clampSpeed = (speed) => Math.max(Math.min(parseInt(speed, 10), 5), 0);

export class MagicLightBt {
  static sayHello = (target) =>
    !!target &&
    new Promise((resolve) => {
      this.turnOff(target).then(setTimeout(resolve, HELLO_FLASH_DURATION));
    })
      .then(
        () =>
          new Promise((resolve) => {
            this.turnOn(target).then(setTimeout(resolve, HELLO_FLASH_DURATION));
          }),
      )
      .then(
        () =>
          new Promise((resolve) => {
            this.turnOff(target).then(
              setTimeout(resolve, HELLO_FLASH_DURATION),
            );
          }),
      )
      .then(
        () =>
          new Promise((resolve) => {
            this.turnOn(target).then(setTimeout(resolve, HELLO_FLASH_DURATION));
          }),
      );

  static turnOn = (target) => this.writeMessage(TURN_ON, target);

  static turnOff = (target) => this.writeMessage(TURN_OFF, target);

  static sendColor = (color, target) =>
    this.writeMessage(buildColorPayload(color), target);

  static sendPreset = (preset, speed, target) =>
    this.writeMessage(buildPresetPayload(preset, clampSpeed(speed)), target);

  static sendSequence = (colors, mode, speed, target) => {
    let res;

    try {
      if (colors.length === 0 || colors.length > 16) {
        throw new Error('Invalid sequence length');
      }

      // Pad to make complete 16 color sequence
      Array.prototype.push.apply(
        colors,
        new Array(16 - colors.length).fill({r: 1, g: 2, b: 3}),
      );

      const payloadColors = colors.reduce(
        (acc, color) => acc.concat(color.r, color.g, color.b),
        [],
      );

      res = this.writeMessage(
        buildSequencePayload(payloadColors, speed, mode),
        target,
      );
    } catch (e) {
      console.log(e.message);
    }

    return res;
  };

  static writeMessage = (msg, target) =>
    target instanceof Map
      ? Bt.broadcastMessage(target, msg)
      : Bt.writeMessage(target, msg);
}
