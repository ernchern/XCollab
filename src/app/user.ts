export class User {
  uid:string;
  name: string;
  signature: string;
  coins: number;
  unlocked: string[];
  concerned: string[];
  constructor(
    uid:string
  ) {
    var fruits = ['banana', 'cherry', 'apple', 'peach', 'kiwi', 'pineapple', 'pear', 'avocado', 'berry', 'coconut', 'melon', 'mango', 'pumpkin', 'papaya', 'tangerine', 'apricot', 'fig', 'plum']
    var f_ind = Math.floor(Math.random() * fruits.length);
    var colors = ['orange', 'blue', 'purple', 'green', 'yellow', 'pink', 'black', 'white']
    var c_ind = Math.floor(Math.random() * colors.length);
    this.uid = uid;
    this.signature = '';
    this.name = colors[c_ind] + " " + fruits[f_ind];
  }
}
