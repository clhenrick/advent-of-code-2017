const fs = require('fs');

const input = fs.readFileSync('./test-input.txt', { encoding: 'utf8' });
const data = input.split('\n').map(d => Number(d));

function makeJumps(idx, arr, jumps) {
	console.log('array index: %s', idx);

	const value = arr[idx];
	const len = arr.length;

	if (idx < arr.length - 1) {
		jumps++; // increment jumps count
		arr[idx] = value + 1; // increment the array value

		console.log('value: %s, value incremented: %s, total jumps: %s', value, arr[idx], jumps);

		// move to the next position in the array using the original array value
		return makeJumps(idx + value, arr, jumps);
	} else {
		// if we are out of bounds return the number of jumps
		return jumps;
	}
}

console.log(makeJumps(0, data, 0));
