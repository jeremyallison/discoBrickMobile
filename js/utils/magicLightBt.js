import {Bt} from './bt';

const HELLO_FLASH_DURATION = 150;

const TURN_ON = new Uint8Array([0xcc, 0x23, 0x33]);

const TURN_OFF = new Uint8Array([0xcc, 0x24, 0x33]);

export const Presets = [
  {name: 'Séquence multi', type: 'cut', code: 0x38, color: '#000000'},
  {name: 'Fondu multi', type: 'fade', code: 0x25, color: '#000000'},
  {name: 'Fondu rouge', type: 'throb', code: 0x26, color: '#FF0000'},
  {name: 'Fondu vert', type: 'throb', code: 0x27, color: '#00FF00'},
  {name: 'Fondu bleu', type: 'throb', code: 0x28, color: '#0000FF'},
  {name: 'Fondu jaune', type: 'throb', code: 0x29, color: '#FFFF00'},
  {name: 'Éclairs multi', type: 'strobe', code: 0x30, color: '#000000'},
  {name: 'Éclairs rouge', type: 'strobe', code: 0x31, color: '#FF0000'},
  {name: 'Éclairs vert', type: 'strobe', code: 0x32, color: '#00FF00'},
  {name: 'Éclairs bleu', type: 'strobe', code: 0x33, color: '#0000FF'},
  {name: 'Éclairs jaune', type: 'strobe', code: 0x34, color: '#FFFF00'},
  {name: 'Éclairs cyan', type: 'strobe', code: 0x35, color: '#00FFFF'},
  {name: 'Éclairs violet', type: 'strobe', code: 0x36, color: '#FF00FF'},
  {name: 'Éclairs blanc', type: 'strobe', code: 0x37, color: '#000000'},
];

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
    [color.r, color.g, color.b],
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
    target instanceof Array
      ? Bt.broadcastMessage(target, msg)
      : Bt.writeMessage(target, msg);
}
