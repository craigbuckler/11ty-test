// main script
import { count } from './count.js';

console.log('hello');
console.log('Craig');

let c = count(20);
let d = document.getElementById(`x${c}`);
if (d) {
  d.remove();
}

console.log(c);
