var instances = {};

class Singleton {

  getInstance() {
    let className = this.constructor.name;
    if (instances[className]) {
      return instances[className];
    } else {
      instances[className] = this;
    }
  }
}

module.exports = Singleton;
