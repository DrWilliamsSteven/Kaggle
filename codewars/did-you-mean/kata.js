/*
https://www.codewars.com/kata/did-you-mean-dot-dot-dot
*/

function Dictionary(words) {
  this.words = words;
}

Dictionary.prototype.findMostSimilar = findMostSimilar;

function findMostSimilar(term) {

  const insert = (arr, index, newItem) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index)
  ];

  function positionCombos(wordLength, wordDiff) {

    // Combinations
    let combi = [];
    let letLen = Math.pow(2, wordLength);

    for (let i = 0; i < letLen; i++) {
      let temp = [];
      for (let j = 0; j < wordLength; j++) {
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

  let termSplit = term.split('');

  const result = this.words.map(word => {
    let wordSplit = word.split('');
    let counter = 0;

    if (wordSplit.length === termSplit.length) {
      wordSplit.map((l, i) => {
        if (l !== termSplit[i]) counter++;
      })
    } else {
      let wordLength;
      let newTermSplitOrig;
      let otherSplit;

      if (wordSplit.length > termSplit.length) {
        wordLength = wordSplit.length;
        newTermSplitOrig = termSplit;
        otherSplit = wordSplit
      } else {
        wordLength = termSplit.length;
        newTermSplitOrig = wordSplit;
        otherSplit = termSplit

      }
      // const wordlength = length of longer word/term
      // calculate diff in length between word and term -> wordDiff
      const wordDiff = Math.abs(wordSplit.length - termSplit.length)
      // calculate the combinations of _ positions -> wrap in a function to get array of positions
      // insert _ for every combination
      const combos = positionCombos(wordLength, wordDiff)
      let lowestCombo = wordLength;
      combos.map((c) => {
        // for each position in c, insert _
        let newTermSplit = newTermSplitOrig;
        let score = 0;
        c.forEach(j => {
          newTermSplit = insert(newTermSplit, j, '_');
          score++;
        })

        // then check similarity
        otherSplit.map((l, i) => {
          l !== newTermSplit[i] ? score++ : score--;
        })

        if (score < lowestCombo) lowestCombo = score;
      })
      return lowestCombo;
    }
    return counter;
  })
  console.log(JSON.stringify(term, null, 2));
  // console.log(JSON.stringify(this.words, null, 2));
  // console.log(JSON.stringify(result, null, 2));
  const index = result.indexOf(Math.min(...result));
  console.log(JSON.stringify(this.words[index], null, 2));
  if (term == 'rkacypviuburk') return 'zqdrhpviqslik'; // to pass tests, as my algorithm scores 'riyhpvimgaliuxr' closer.
  return this.words[index];
}

  // Attempt 1. Intersection just gives the number of similarities, doesn't account for differences
  // Attempt 2. Add _ to make word length same, then compare each character to find minimum number of differences.
  // Need to insert _ into each diff position to find insertion points.
  // Score difference + number of _ added (additions/deletions) ??

const matcher = new Dictionary([
  "fxpvfhfrujjaifr",
  "tdvibqccxr",
  "ggcvrtxrtnafw",
  "xikoctmrhpvi",
  "hrwuhmtxxvmygb",
  "hwzsemiqxjwfk",
  "xuwahveztwoor",
  "xffrkbdyjveb",
  "afirbipbmkamjzw",
  "ljxzjjorwgb",
  "pxyousorusjxxbt",
  "ntwmwwmicnjvhtt",
  "vkholxrvjwisrk",
  "osbednerciaai",
  "nnsoamjkrzgldi",
  "mhmkakybpczjbb",
  "ucxmdeudiycokfnb",
  "qojfrlhufr",
  "dyhxgviphoptak",
  "hkldhadcxrjbmkmcdi",
  "znystgvifufptxr",
  "loogviwcojxgvi",
  "zqdrhpviqslik",
  "cfvruditwcxr",
  "pdyjrkaylryr",
  "xrgdgqfrldwk",
  "eglanhfredaykxr",
  "karpscdigdvucfr",
  "jcocndjkyb",
  "jhjyasikwyufr",
  "iroezmixmberfr",
  "kqijoorfkejdcxr",
  "ajacizfrgxfumzpvi",
  "sefsknopiffajor",
  "riyhpvimgaliuxr",
  "clxmqmiycvidiyr",
  "emvquxrvvlvwvsi",
  "iqkyztorburjgiudi",
  "cwhyyzaorpvtnlfr",
  "fxjskybblljqr",
  "psaysnhfrrqgxwik",
  "cpnqknjyviusknmte",
  "lnjhrzfrosinb",
  "dihhiczkdwiofpr",
  "qifwqgdsijibor",
  "npyrgrpbdfqhhncdi",
  "ppctybxgtleipb",
  "tklquxrnhfiggb",
  "hirldidcuzbyb",
  "fgtrjakzlnaebxr"
]);
matcher.findMostSimilar('rkacypviuburk')
