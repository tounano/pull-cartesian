var pull = require("pull-stream");
var cartesian = require("../");

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

// Result
/*
 { eventName: 'Some Event', recepient: 'Some Subscriber' }
 { eventName: 'Some Event', recepient: 'Another Subscriber' }
 { eventName: 'Another Event', recepient: 'Some Subscriber' }
 { eventName: 'Another Event', recepient: 'Another Subscriber' }
 */