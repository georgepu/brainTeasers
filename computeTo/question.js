// Input
var digits = 123456789;
console.log('start', digits);

// *** Start your code here *** //

// Class responsible for determining all combinations with repetitions. Returns an array with arrays of given length
// containing only elements from given set.
// e.g. for elements: [0, 1] and size: 2 it returns: [[0,0], [0,1], [1,0], [1,1]]

function Combinations(elements, size) {
    this.elements = elements;
    this.size = size;
}

Combinations.prototype.process = function(input) {
    if (input.length >= this.size) {
        return input;
    }

    var result = [];
    var that = this;
    this.elements.forEach(function(element) {
        var processed = that.process(input.concat(element));
        if (Array.isArray(processed[0])) {
            result = result.concat(processed);
        } else {
            result.push(processed);
        }
    });
    return result;
};

Combinations.prototype.getAll = function() {
    return this.process([]);
};

// Class responsible for checking if created equations from given array of operations (blank, +, -) and given digits are
// computed to given value. If yes, returns human readable equations.

var Operation = {
    BLANK: '',
    PLUS: ' + ',
    MINUS: ' - '
};

function ComputeTo(sumTo, operations, digits) {
    this.sumTo = sumTo;
    this.operations = operations;
    this.result = [];
    this.digits = digits;
}

ComputeTo.prototype.getHumanReadableEquation = function(operations) {
    var equation = this.digits[0];
    for (var idx = 0; idx < operations.length; idx++) {
        equation += operations[idx];
        equation += this.digits[idx + 1];
    }
    equation += ' = ' + this.sumTo;
    return equation;
};

ComputeTo.prototype.testOperations = function(operations) {
    var current = parseInt(this.digits[0]);
    var sum = 0;
    var sign = 0;

    for (var idx = 0; idx < operations.length; idx++) {
        if (operations[idx] === Operation.BLANK) {
            current = current * 10 + parseInt(this.digits[idx + 1]);
        } else {
            sum = sum + (sign === Operation.MINUS ? -current : current);
            current = parseInt(this.digits[idx + 1]);
            sign = operations[idx];
        }
    }

    sum = sum + (sign === Operation.MINUS ? -current : current);
    if (sum === this.sumTo) {
        this.result.push(this.getHumanReadableEquation(operations));
    }
};

ComputeTo.prototype.countAll = function() {
    for (var idx = 0; idx < this.operations.length; ++idx) {
        this.testOperations(this.operations[idx]);
    }
    return this.result;
};

// solution:
digits = digits.toString();
var combinations = new Combinations([Operation.BLANK, Operation.PLUS, Operation.MINUS], digits.length - 1);
var allOperations = combinations.getAll();

var compute = new ComputeTo(100, allOperations, digits);
digits = compute.countAll();

// *** End your code here *** //
console.log(digits);
