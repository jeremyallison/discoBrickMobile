export class Bt {
  static strips = [];
  static stripMap = new Map();

  static connect = () =>
    navigator.bluetooth
      .requestDevice({
        acceptAllDevices: true,
        optionalServices: [0xffe5],
      })
      .then((device) => device.gatt.connect())
      .then((server) => server.getPrimaryService(0xffe5))
      .then((service) => service.getCharacteristic(0xffe9))
      .then((characteristic) => {
        const {device} = characteristic.service;

        if (!this.stripMap.has(device.id)) {
          this.stripMap.set(device.id, characteristic);
          device.addEventListener('gattserverdisconnected', () =>
            this.onDisconnect(device.id),
          );
        }

        return characteristic;
      })
      .catch(console.log);

  static disconnectAll = () => {
    this.stripMap.forEach((strip) => strip.service.device.gatt.disconnect());
    console.log('All strips disconnected');
  };

  static onDisconnect = (id) => this.stripMap.delete(id);

  static broadcastMessage = async (msg) => {
    this.stripMap.forEach((strip) => this.writeMessage(strip, msg));
  };

  static writeMessage = async (strip, msg) =>
    msg.length <= 20
      ? strip.writeValueWithoutResponse(msg)
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
