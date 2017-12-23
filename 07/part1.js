const fs = require('fs');
const input = fs.readFileSync('./input.txt', { encoding: 'utf8' });
const tree = {};

function parseInput(txt) {
	// parses the input and returns a hashmap data structure
	// alternatively could keep this as an array
	return txt.split('\n').reduce((acc, line) => {
		const id = line.match(/([^\s]+)/)[0];
		const weight = parseInt(line.match(/[0-9]+/));
		const children = line.indexOf("->") > -1
			? line.split("->")[1]
				.split(",")
				.map(d => ({ id: d.trim() }))
			: [];
		acc[id] = {
			id,
			children,
			weight,
		};

		return acc;
	}, {});
}

function findRoot(data) {
	// use two ES6 Sets to find the root node
	// Set a will store every "id" of the original list's nodes
	// Set b will store every child id of any parent node
	const a = new Set();
	const b = new Set();

	Object.keys(data).forEach(key => {
		const item = data[key];
		const children = data[key].children;
		a.add(key);
		if (children.length) {
			children.forEach(child => b.add(child.id));
		}
	});

	// the difference of the two Sets will leave us with the id of the single node,
	// the node that doesn't have a parent node
	// this could be used to build a tree JSON structure
	return a.difference(b);
}

// Set.difference method taken from MDN:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
Set.prototype.difference = function(setB) {
    var difference = new Set(this);
    for (var elem of setB) {
        difference.delete(elem);
    }
    return difference;
}

console.log(findRoot(parseInput(input)));
