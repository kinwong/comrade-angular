type ClassConstructor<T> = new(...args: any[]) => T;

function withDebug<C extends ClassConstructor<{
  getDebugValue(): object
}>>(Class: C) {
  return class extends Class {
    debug() {
      const Name = Class.constructor.name;
      const value = this.getDebugValue();
      return Name + '(' + JSON.stringify(value) + ')';
    }
  };
}
