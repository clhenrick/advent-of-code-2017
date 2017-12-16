const fs = require('fs');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8' });
const data = input.split('\n').map(d => Number(d));
const len = data.length;
let notSolved = true;
let index = 0;
let total = 0;

while (notSolved) {
	let value = data[index];
	total += 1;
	data[index] = value + 1;
	index = index + value;

	console.log('array index: %s, total jumps: %s', index, total);

	if (index > len - 1) {
		notSolved = false;
	}
}
