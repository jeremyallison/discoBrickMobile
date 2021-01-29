import {isEmulatorSync} from 'react-native-device-info';
import {BleManager} from 'react-native-ble-plx';
import {Buffer} from 'buffer';

const base64encode = (str) => new Buffer(str).toString('base64');
const asyncFilter = async (arr, predicate) => {
  const results = await Promise.all(arr.map(predicate));

  return arr.filter((_v, index) => results[index]);
};

const __DEBUG__ = isEmulatorSync();

export class Bt {
  static manager = new BleManager();
  static subscription;

  static subscribe() {
    this.subscription = this.manager.onStateChange((state) => {}, true);
  }

  static async scanForDevices(addAvailableStrip) {
    return (
      !__DEBUG__ &&
      new Promise(async (resolve, reject) => {
        const state = await this.manager.state();

        if (state !== 'PoweredOn') {
          return reject('BT manager not ready, maybe BT is OFF?');
        }

        this.manager.stopDeviceScan();
        this.manager.startDeviceScan(null, null, async (error, device) => {
          if (error) {
            return reject(error);
          }

          if (device.name && device.name.startsWith('LEDBLE-')) {
            addAvailableStrip(device);
          }
        });
      })
    );
  }

  static stopScanning() {
    this.manager.stopDeviceScan();
  }

  static async connectToDevice(device) {
    return new Promise(async (resolve, reject) => {
      const char = await this.connectAndGetCharacteristic(device).catch(reject);

      resolve({
        device: device,
        characteristic: char,
      });
    });
  }

  static async connectAndGetCharacteristic(device) {
    await device.connect();
    await device.discoverAllServicesAndCharacteristics();

    return new Promise(async (resolve) => {
      await device
        .services()
        .then(async (services) => {
          await asyncFilter(services, async (service) => {
            const serviceChars = await service.characteristics();

            serviceChars.map(
              (c) => c.uuid.startsWith('0000ffe9') && resolve(c),
            );
          });
        })
        .catch(console.log);
    });
  }

  static broadcastMessage = async (strips, msg) => {
    strips.forEach(({characteristic}) =>
      this.writeMessage(characteristic, msg),
    );
  };

  static writeMessage = async (strip, msg) =>
    msg.length <= 20
      ? !__DEBUG__ && strip.writeWithoutResponse(base64encode(msg))
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
