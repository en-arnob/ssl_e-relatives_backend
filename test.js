const one = Math.floor(100000 + Math.random() * 900000);
console.log('One:', one);

const two = Math.random().toString(36).substring(2, 10);

console.log('Two:', two);

const three = String(
  Date.now().toString(32) +
    Math.random().toString(32) +
    Math.random().toString(32)
)
  .substring(2, 10)
  .replace(/\./g, '');

console.log('three:', three);

const four = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));

console.log('four:', four);
