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
    var choices = ['banana', 'cherry', 'apple', 'peach', 'kiwi', 'pineapple', 'pear', 'avocado']
    var index = Math.floor(Math.random() * choices.length);
    this.uid = uid;
    this.signature = '';
    this.name = choices[index];
  }
}
