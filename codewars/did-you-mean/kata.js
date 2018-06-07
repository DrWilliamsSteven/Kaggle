/*
https://www.codewars.com/kata/did-you-mean-dot-dot-dot
*/

const R = require('ramda');

function Dictionary(words) {
  this.words = words;
}

function positionCombos(wordLength, wordDiff) {

  // Combinations
  var combi = [];
  var temp = [];
  var letLen = Math.pow(2, wordLength);

  for (var i = 0; i < letLen; i++) {
    temp = [];
    for (var j = 0; j < wordLength; j++) {
      if ((i & Math.pow(2, j))) {
        temp.push(j)
      }
    }
    if (temp.length > 0) {
      combi.push(temp);
    }
  }

  return combi.filter((x) => x.length === wordDiff);
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
      // const wordlength = length of longer word/term
      const wordLength = wordSplit.length;
      // calculate diff in length between word and term -> wordDiff
      const wordDiff = wordSplit.length - termSplit.length
      // calculate the combinations of _ positions -> wrap in a function to get array of positions
      // for each combination 
      // insert _ for every combination
      const combos = positionCombos(wordLength, wordDiff)
      let lowestCombo = wordLength;
      combos.map((c) => {
        // for each position in c, insert _
        let newTermSplit = termSplit;
        let score = 0;
        c.forEach(j => {
          newTermSplit = R.insert(j, '_', newTermSplit)
        })

        // then check similarity
        wordSplit.map((l, i) => {
          if (l !== newTermSplit[i]) score++;
        })

        if (score < lowestCombo) lowestCombo = score;
      })
      return lowestCombo;
    }
    return counter;
  })
  const index = R.indexOf(Math.min(...result), result)
  console.log(JSON.stringify(words[index], null, 2));
  return words[index];
}

findMostSimilar('berry', ['cherry', 'pineapple', 'melon', 'strawberry', 'raspberry']);


// Attempt 1. Intersection just gives the number of similarities, doesn't account for differences
// Attempt 2. Add _ to make word length same, then compare each character to find minimum number of differences.
// Need to insert _ into each diff position to find insertion points.
// Score difference + number of _ added (additions/deletions) ??


// Combinations
// var letters = [0, 1, 2, 3, 4, 5]; // 0 -> length of word
// var combi = [];
// var temp = "";
// var letLen = Math.pow(2, letters.length);

// for (var i = 0; i < letLen; i++) {
//   temp = "";
//   for (var j = 0; j < letters.length; j++) {
//     if ((i & Math.pow(2, j))) {
//       temp += letters[j]
//     }
//   }
//   if (temp !== "") {
//     combi.push(temp);
//   }
// }

// const wordDiff = 4; // number of _ to be inserted
// console.log(combi.filter((x) => x.length === wordDiff).join("\n"));
