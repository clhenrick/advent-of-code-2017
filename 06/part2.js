const fs = require('fs');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8' });
let data = input.split('\t').map(d => parseInt(d));
const slots = data.length;
let solved = false;
let tries = [];
let firstEncountered;

console.log('initial data:\n %s', data);

while (!solved) {
	// step 1: find the max value in the array,
	// if there are ties between the highest values, stop at the first one
	const maxValue = data.reduce((a, b) => Math.max(a, b));
	const firstMax = data.indexOf(maxValue);

	// set the firstMax bank to 0 as we're removing all it's blocks to redistribute
	data[firstMax] = 0;
	// start at the bank after firstMax
	let i = firstMax === slots - 1 ? 0 : firstMax + 1;
	// track the number of blocks we're distributing
	let numBlocks = maxValue;

	// add 1 block to each slot until numBlocks === 0
	while (numBlocks > 0) {
		if (i > slots - 1) i = 0; // if we reach the end of the array start over
		let value = data[i];
		data[i] = value + 1;
		numBlocks -= 1;
		i++;
	}

	console.log('data altered: %s', data);

	// serialize our result so that it can be compared to previous results
	const serialized = JSON.stringify(data);

	// check if the same result was previously encountered
	// note the array index of the first duplicate sequence
	tries.forEach((s, i) => {
		if (s === serialized) {
			solved = true;
			firstEncountered = i;
		}
	});

	// add the latest result the tries array so that it may be compared in the next loop iteration
	tries.push(serialized);
}

console.log('cycles between encountering the same sequence: %s', tries.length -1 - firstEncountered);
