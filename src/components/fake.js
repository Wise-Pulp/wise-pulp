// Expression bodies
var odds = evens.map(v => v + 1);
var nums = evens.map((v, i) => v + i);
var pairs = evens.map(v => ({
  even: v,
  odd: v + 1
}));
​
// Statement bodies
nums.forEach(v => {
  if (v % 5 === 0)
    fives.push(v);
});
​
// Lexical this
var bob = {
  _name: "Bob",
  _friends: [],
  printFriendjs() {
    this._friends.forEach(f =>
      console.log(this._name + " knows " + f));
  }
}