# Brain Teasers
## Compute to 100
Given the digits 123456789, build an expression by inserting "+" or "-" anywhere **BETWEEN** the digits so that it results to 100. Your answer should return all possible combinations.
```
Example: 1 + 23 - 4 + 5 + 6 + 78 - 9 = 100
```

## Array partition
Given a variable length array of integers, partition them such that the even integers precede the odd integers in the array. Your must operate on the array in-place, with a constant amount of extra space. The answer should scale linearly in time with respect to the size of the array.

## MapReduce
You are provided with a dataset which is an ASCII text file. You are to create a mapreduce program that processes the dataset.  The mapper should process each line and produce key-value pairs. The reducer should process the values corresponding to each key. The goal of the program is to find the occurrences of a given word in the text with the mapreduce pattern.

## Simple Queue
Design a queuing system. The queue should implement add, view and delete. A viewed message will be invisible to other workers for 1 second unless it is deleted. Messages should be returned in order they were added unless they have been deleted.

The add method takes a string as a message and returns a unique id for that message.  The view method takes no parameters and returns a hash containing the next message and the unique message id assigned in the add method.  The delete method takes the unique message id and returns true if the message was removed within 1 second or false if we were too slow.