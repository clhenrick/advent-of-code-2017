var fs = require('fs');

fs.readFile('./input.txt', 'utf8', function(error, res) {
  if (error) throw error;

  // parse data
  var data = res.split('\n').map(row => row.split(/\s/));

  // iterate over each row, validating each row's strings
  var count = data.reduce((acc, cur) => {
    // flag, if there's a match we'll flip it
    let valid = true;
    // split each string of the array into its individual letters,
    // sort them alphabetically, then join them back
    // then sort entire array alphabetically
    cur = cur.map(s => s.split('').sort().join('')).sort();
    // iterate over strings comparing previous string to the current string
    cur.forEach((s, i) => {
      const prev = cur[i - 1];
      if (prev && prev === s) valid = false;
    });

    // up the tally if the row is valid
    if (valid) acc += 1;

    return acc;
  }, 0);

  console.log(`total passphrases: ${data.length}, valid passphrases: ${count}`);
});
