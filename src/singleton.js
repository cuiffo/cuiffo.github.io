var instances = {};

export default class {
  getInstance() {
    let className = this.constructor.name;
    if (instances[className]) {
      return instances[className];
    } else {
      instances[className] = this;
    }
  }
}


