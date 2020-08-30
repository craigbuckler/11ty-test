export function count(toNum = 10) {

  let counter = 0;
  for (let inc = 0; inc <= toNum; inc++) {
    counter += inc;
  }

  return counter;

}
