function Node(letter, freq, used, father, code) {
    this.letter = letter;
    this.freq = freq;
    this.used = used;
    this.father = father;
    this.code = code;
}

let fs = require('fs');
let arg = process.argv;
let str = fs.readFileSync(arg[2])+ '';
let alph = new Array();

for (let i = 0; i < str.length; i++) {
    alph[str.charAt(i)] = 0;
}
for (let i = 0; i < str.length; i++) {
    alph[str.charAt(i)]++;
}
//console.log(alph);


let tree = new Array();

for (let i in alph) {
    let n = new Node(i, alph[i], 0, null, '');
    tree.push(n);
}

let treeLength = tree.length;

for (let i = 0; i < treeLength - 1; i++) {
   let ind = -1;
   let ind2 = -1;
   let minFreq = str.length;
   let minFreq2 = str.length;
    for (let j = 0; j < tree.length; j++) {

        if ((tree[j].used == 0) && (tree[j].freq <= minFreq2)) {
            minFreq = minFreq2;
            ind = ind2;
            ind2 = j;
            minFreq2 = tree[j].freq;
        } else if (tree[j].used == 0 && tree[j].freq <= minFreq) {
            minFreq = tree[j].freq;
            ind = j;
        }
    }
        tree[ind].used = 1;
        tree[ind2].used = 1;
        tree[ind].father = tree.length;
        tree[ind2].father = tree.length;
        tree[ind].code = '0';
        tree[ind2].code = '1';
        let newNode = new Node(tree[ind2].letter + tree[ind].letter, tree[ind].freq + tree[ind2].freq, 0, null, '');
        tree.push(newNode);
}
for (let i = tree.length - 2; i > -1; i--) {
    tree[i].code = tree[tree[i].father].code + tree[i].code;
}

let codedStr = '';
for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < tree.length; j++) {
        if (str[i] == tree[j].letter) {
            codedStr += tree[j].code;
        }
    }
}
console.log (`Coded string: ${codedStr}`);



let decodedStr = '';
let codeOfSymbol = '';

for (let i = 0; i < codedStr.length; i++) {
    codeOfSymbol += codedStr[i];
    for (let j = 0; j < treeLength; j++) {
        if (codeOfSymbol == tree[j].code) {
            decodedStr += tree[j].letter;
            codeOfSymbol = '';
        }
    }
}

console.log(`Decoded string: ${decodedStr}`);
console.log(tree);