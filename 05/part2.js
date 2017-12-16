const fs = require('fs');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8' });
const data = input.split('\n').map(d => Number(d));
const len = data.length;
let index = 0;
let total = 0;

while (index < data.length && index >= 0) {
	const value = data[index];
	data[index] += value >= 3 ? -1 : 1;
	total += 1;
	index += value;
}

console.log('array index: %s, total jumps: %s', index, total);
