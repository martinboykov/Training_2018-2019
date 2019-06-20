function reverse(str) {
  str = str.split('');
  let l = 0;
  let r = str.length - 1;
  while (l <= r) {
    const tempL = str[l];
    const tempR = str[r];
    str[l] = tempR;
    str[r] = tempL;
    console.log(str[l], str[r]);
    l += 1;
    r -= 1;
  }
  return str.join('');
}
console.log(reverse('str'));
