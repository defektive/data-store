var EventEmitter = require('wolfy87-eventemitter/EventEmitter')

var DataStore = module.exports = (function (){
  function DataStore(attrs){
    this._store = (function (){
      var PRIVATE_STORE = {}
      return {
        set: function (key, value){
          if(PRIVATE_STORE[key] != value){
            PRIVATE_STORE[key] = value;
            return true;
          }
          return false;
        },
        get: function (key){
          if(key === undefined) {
            return PRIVATE_STORE;
          }
          return PRIVATE_STORE[key];
        }
      }
    })();

    this.attrs(attrs);
  }

  DataStore.prototype = Object.create(EventEmitter.prototype);

  DataStore.prototype.attr = function (key, value, silent){
    var index = arguments.length;
    if(!silent && index === 3) {
      index--;
    }
    return [function (){}, _get, _set, _setSilent][index].apply(this, arguments);
  }

  DataStore.prototype.attrs = function (attrs, silent){
    if(!attrs) return this._store.get();
    var keys = Object.keys(attrs),
        numberOfKeys = keys.length,
        currentKey;

    while(numberOfKeys--){
      currentKey = keys[numberOfKeys];
      this.attr(currentKey, attrs[currentKey], silent)
    }
    return this._store.get();
  }

  DataStore.prototype.emitError = function (error){
    return this.emitEvent('error', [error])
  }

  function _set(key, value) {
      var oldValue = this._store.get(key);
      if(this._store.set(key, value)){
        this.emitEvent("changed:"+ key, [{
          key: key,
          oldValue: oldValue,
          value: value
        }, this]);

        this.emitEvent("changed", [{}, this]);
      } else {
        this.emitEvent("set:"+ key, [{}, this]);
      }
      return this
  }

  function _setSilent(key, value) {
    this._store.set(key, value);
    return this;
  }

  function _get(key) {
    return this._store.get(key);
  }

  return DataStore
})();
