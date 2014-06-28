# pull-cartesian

A pull-stream that performs cartesian multiplication on json objects.

`pull-cartesian` accepts one argument, which is a `readable` pull stream that will act as a multiplier.

## Example

```js
var pull = require("pull-stream");
var cartesian = require("pull-cartesian");

var events = [
  {eventName:"Some Event"},
  {eventName:"Another Event"}
];

var subscribers = [
  {recepient: "Some Subscriber"},
  {recepient: "Another Subscriber"}
];

pull(
  pull.values(events),
  cartesian(pull.values(subscribers)),
  pull.drain(console.log)
)
```

**Result:**

```
 { eventName: 'Some Event', recepient: 'Some Subscriber' }
 { eventName: 'Some Event', recepient: 'Another Subscriber' }
 { eventName: 'Another Event', recepient: 'Some Subscriber' }
 { eventName: 'Another Event', recepient: 'Another Subscriber' }
```

## install

With [npm](https://npmjs.org) do:

```
npm install pull-cartesian
```

## license

MIT