/*
https://www.codewars.com/kata/did-you-mean-dot-dot-dot
*/

const R = require('ramda');

function Dictionary(words) {
  this.words = words;
}

function findMostSimilar(term, words) {
  let termSplit = term.split('');

  const result = words.map(word => {
    let wordSplit = word.split('');
    let counter = 0;

    if (wordSplit.length === termSplit.length) {
      wordSplit.map((l, i) => {
        if (l !== termSplit[i]) counter++;
      })
    } else if (wordSplit.length > termSplit.length) {

      for (let j = 0; j < termSplit.length; j++) {
        // calculate the combinations of _ positions
        // insert _ for every combination
        let newTermSplit = R.insert(j, '_', termSplit) 
        // console.log(JSON.stringify(newTermSplit, null, 2))
        wordSplit.map((l, i) => {
          if (l !== newTermSplit[i]) counter++;
        })

      }
    }
    return counter;
  })
  console.log(JSON.stringify(result, null, 2));
  return result;
}

// findMostSimilar('berry', ['cherry', 'pineapple', 'melon', 'strawberry', 'raspberry']);


// Attempt 1. Intersection just gives the number of similarities, doesn't account for differences
// Attempt 2. Add _ to make word length same, then compare each character to find minimum number of differences.
// Need to insert _ into each diff position to find insertion points.
// Score difference + number of _ added (additions/deletions) ??

// Combinations
var letters = [0, 1, 2, 3, 4, 5]; // 0 -> length of word
var combi = [];
var temp = "";
var letLen = Math.pow(2, letters.length);

for (var i = 0; i < letLen; i++) {
  temp = "";
  for (var j = 0; j < letters.length; j++) {
    if ((i & Math.pow(2, j))) {
      temp += letters[j]
    }
  }
  if (temp !== "") {
    combi.push(temp);
  }
}

const wordDiff = 4; // number of _ to be inserted
console.log(combi.filter((x) => x.length === wordDiff).join("\n"));
