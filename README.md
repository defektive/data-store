# defektive-data-store
Super simple data store. Uses [wolfy87-eventemitter](https://github.com/Olical/EventEmitter) for event delegation.
## Installation


```
npm install --save defektive-data-store
```

## Usage
```js
var DataStore = require('defektive-data-store'),
    myStore = new DataStore({
      color: "red",
      status: "not-borked"
    });
    
myStore.addListener('changed:color', function (event){
  console.log("color changed", event)
});

myStore.attr('color', 'blue');
```

## Extending
```js
var DataStore = require('defektive-data-store');

function Session(){
  DataStore.apply(this, arguments)  
}

Session.prototype = Object.create(DataStore.prototype);

Session.prototype.isLoggedIn = function () {
  return this.attr('loggedIn')
}
```
