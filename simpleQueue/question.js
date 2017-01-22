/* 

 Write a simple queuing system in pure javascript.

 The queue should implement add, view and delete methods.
 A viewed message will become invisible to other workers for 1 second unless it is deleted.
 Messages should be returned in order they were added unless they have been deleted.

 The add method takes a string as a message and returns a unique id for that message.

 The view method takes no parameters and returns a hash containing the unique message
 id assigned in the add method and the message itself.

 The delete method takes the unique message id and returns true if the message was removed
 within 1 second or false if we were too slow and the message is back in the queue.

 Write your implementation in this file below.

 Extra points: Do you see any problems with running this kind of queue in a production environment?

 */

// *** Write your Queue class here *** //

// Simple uid generator
function generateUid() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function Message(text) {
    this.message = text;
    this.messageId = generateUid();
    this.viewedTime = 0;
    this.viewedBy = null;
}

Message.prototype.markAsViewedBy = function(worker) {
    this.viewedBy = worker;
    this.viewedTime = new Date().getTime();
};

Message.prototype.isVisibleFor = function(worker) {
    return worker === this.viewedBy || new Date().getTime() - this.viewedTime > 1000;
};

Message.prototype.canDelete = function() {
    return new Date().getTime() - this.viewedTime <= 1000;
};

function Queue() {
    this.storage = {};
    this.storageKeys = [];
    this.currentMessageId = {};
    this.prevMessageId = {};

    this.worker = generateUid();
    this.currentMessageId[this.worker] = null;
    this.prevMessageId[this.worker] = null;
}

Queue.prototype.add = function (messageText) {
    var message = new Message(messageText);
    this.storageKeys.push(message.messageId);
    this.storage[message.messageId] = message;
    return message.messageId;
};

Queue.prototype.getMessageFromStore = function () {
    var index = 0;
    if (this.currentMessageId[this.worker]) {
        index = this.storageKeys.indexOf(this.currentMessageId[this.worker]) + 1;
    }
    if (this.storageKeys.length > index) {
        for (var idx = index; idx < this.storageKeys.length; idx++) {
            if (this.storage[this.storageKeys[idx]].isVisibleFor(this.worker)) {
                return this.storage[this.storageKeys[idx]];
            }
        }
    }
    return null;
};

Queue.prototype.view = function () {
    var message = this.getMessageFromStore();
    if (message) {
        this.prevMessageId[this.worker] = this.currentMessageId[this.worker];
        this.currentMessageId[this.worker] = message.messageId;
        message.markAsViewedBy(this.worker);
    } else {
        this.currentMessageId[this.worker] = null
    }
    return message;
};

Queue.prototype.remove = function (id) {
    var message = this.storage[id];
    if (message && message.canDelete()) {
        if (id === this.currentMessageId[this.worker]) {
            this.currentMessageId[this.worker] = this.prevMessageId[this.worker];
        }
        this.storageKeys = this.storageKeys.filter(function (el) {
            return id !== el;
        });
        delete this.storage[id];
        return true;
    }
    return false;
};

// *** Finish your code here *** //

// Test code. Should output the following
/*
 Hey there world. How are you?
 Hey there world. How are you?
 Hey world. How are you?
 Hey world. How you?
 Hey world. How you?
 */
var queue = new Queue();
queue.add('Hey');
queue.add('there');
queue.add('world.');
queue.add('How');
queue.add('are');
queue.add('you?');

printQueue();

setTimeout(function () {
    printQueue();
}, 200);

setTimeout(function () {
    printQueue(1);
}, 1500);

setTimeout(function () {
    printQueue(3);
}, 3000);

setTimeout(function () {
    printQueue();
}, 4500);

// Private function
function printQueue(index) {
    var i = 0;
    var messageHash = queue.view();
    var output = '';
    while (messageHash) {
        if (i++ === index) {
            queue.remove(messageHash.messageId);
        } else {
            output += messageHash.message;
            output += ' ';
        }
        messageHash = queue.view();
    }
    if (output) console.log(output);
}