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
    var fruits = ['Banana', 'Cherry', 'Apple', 'Peach', 'Kiwi', 'Pineapple', 'Pear', 'Avocado', 'Berry', 'Coconut', 'Melon', 'Mango', 'Pumpkin', 'Papaya', 'Tangerine', 'Apricot', 'Fig', 'Plum']
    var f_ind = Math.floor(Math.random() * fruits.length);
    var colors = ['Orange', 'Blue', 'Purple', 'Green', 'Yellow', 'Pink', 'Black', 'White']
    var c_ind = Math.floor(Math.random() * colors.length);
    this.uid = uid;
    this.signature = '';
    this.name = colors[c_ind] + " " + fruits[f_ind];
  }
}
