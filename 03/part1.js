// puzzle input
const input = 325489;

// find the next perfect square that is greater than the square of the input value
const t = Math.ceil(Math.sqrt(input));

// we know that the manhattan distance to the perfect square is always n - 1
// thus, we can subtract the input value from the square to find the number of steps
// it would take to get from the center of the spiral
const d = t * t - input;

console.log(`the number of steps are: ${d}`);
// 552
