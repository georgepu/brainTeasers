var fs = require('fs');

// helper functions
var count = 0;
var keywordToFind = 'TCP';

fs.readFile('./input.txt', 'utf8', function(err,data) {
	if (err) {
		return console.log('file not found');
	}
	//console.log(data);

	// fake map reduce calls
	var lines = data.split('\n');
	for (var i=0;i<lines.length;i++) {
		map(i, lines[i])
	}
	for (var key in context.map) {
		reduce(key, context.read(key));
	}
	// OUTPUT ALL KEYS AND THEIR FINAL COUNT
	//for (var key in result.map) {
	//	console.log(key, result.read(key))
	//}
	printResult();
});

// *** Start your code here *** //

var context = {
    map: {},
    read: function (key) {
        return this.map[key]
    }
};

var result = {
    map: {},
    read: function (key) {
        return this.map[key];
    }
};

function map(key, value) {
    context.map[key] = {};
    var words = value.match(/\w+/g);
    if (words) {
        words.forEach(function(word) {
            if (!context.map[key][word]) {
                context.map[key][word] = 0;
            }
            ++context.map[key][word];
        });
    }
}

function reduce(key, values) {
    for (var keys in values) {
        if (!values.hasOwnProperty(keys)) continue;
        result.map[keys] = result.map[keys] + values[keys] || values[keys];
    }
}

// *** End your code here *** //

function printResult() {
    // getting count of occurrence keywordToFind
    count = result.map[keywordToFind];
    console.log(count);
}
