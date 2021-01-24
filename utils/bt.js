import {BleManager} from 'react-native-ble-plx';
import {Buffer} from 'buffer';

const base64encode = (str) => new Buffer(str).toString('base64');
const asyncFilter = async (arr, predicate) => {
  const results = await Promise.all(arr.map(predicate));

  return arr.filter((_v, index) => results[index]);
};

export class Bt {
  static manager = new BleManager();
  static subscription;

  static subscribe() {
    this.subscription = this.manager.onStateChange((state) => {}, true);
  }

  static async scanAndConnect() {
    return new Promise(async (resolve, reject) => {
      const state = await this.manager.state();

      if (state !== 'PoweredOn') {
        return reject('BT manager not ready, maybe BT is OFF?');
      }

      this.manager.startDeviceScan(null, null, async (error, device) => {
        if (error) {
          return reject(error);
        }

        if (device.name === 'LEDBLE-385C5590') {
          this.manager.stopDeviceScan();

          const char = await this.connectAndGetCharacteristic(device);

          resolve({
            device: device,
            characteristic: char,
          });
        }
      });
    });
  }

  static async connectAndGetCharacteristic(device) {
    await device.connect();
    const services = await device.discoverAllServicesAndCharacteristics();

    return new Promise(async (resolve, reject) => {
      await device.services().then(async (services) => {
        await asyncFilter(services, async (service) => {
          const serviceChars = await service.characteristics();

          serviceChars.map((c) => c.uuid.startsWith('0000ffe9') && resolve(c));
        });
      });

      reject('Device not found');
    });
  }

  static broadcastMessage = async (strips, msg) => {
    strips.forEach(({characteristic}) =>
      this.writeMessage(characteristic, msg),
    );
  };

  static writeMessage = async (strip, msg) =>
    msg.length <= 20
      ? strip.writeWithoutResponse(base64encode(msg))
      : this.writeLongMessage(strip, msg);

  static writeLongMessage = async (strip, msg) => {
    const arr = Array.from(msg);
    const queue = [];

    while (arr.length) {
      queue.push(Uint8Array.from(arr.splice(0, 20)));
    }

    return this.reduceMsgQueue(strip, queue);
  };

  static reduceMsgQueue = async (strip, queue) =>
    queue.reduce(
      (acc, msg) => acc.then(() => this.writeMessage(strip, msg)),
      Promise.resolve(),
    );
}
