// Input
var numbers = [7,7,4,0,9,8,2,4,1,9];
console.log('start', numbers);

// *** Start your code here *** //

var evenIndex = 0;
for (var idx = 0; idx < numbers.length; idx++) {
    if (numbers[idx] % 2 === 0 && idx != evenIndex) {
        swapElementsInNumbersArray(idx, evenIndex);
        ++evenIndex;
    }
}

function swapElementsInNumbersArray(first, second) {
    var temp = numbers[first];
    numbers[first] = numbers[second];
    numbers[second] = temp;
}

// *** End your code here *** //
console.log(numbers);