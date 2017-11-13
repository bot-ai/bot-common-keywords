'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Avoid a file system hit every time we call tag.all by listing ahead of time
// all the tag files
const files = ['angry.txt', 'apology.txt', 'beg.txt', 'bored.txt', 'disgust.txt', 'goodbye.txt', 'happy.txt', 'hello.txt', 'help.txt', 'howisit.txt', 'ignorance.txt', 'intent_get.txt', 'intent_move.txt', 'laugh.txt', 'maybe.txt', 'misunderstand.txt', 'mutual.txt', 'no.txt', 'pain.txt', 'protest.txt', 'sad.txt', 'skeptic.txt', 'slack_emoji_nature.txt', 'slack_emoji_objects.txt', 'slack_emoji_people.txt', 'slack_emoji_places.txt', 'slack_emoji_symbols.txt', 'stop.txt', 'surprise.txt', 'thanks.txt', 'yes.txt'];

const testRegexpArray = msg => {
  const splitMsg = msg.toLowerCase().split(' ');
  const set = [];
  for (let i = 0; i < splitMsg.length; i++) {
    const word = splitMsg[i];
    let replacements = _util2.default.replacements[word];
    if (!replacements) {
      const cleanedWord = _util2.default.cleanWord(word);
      replacements = _util2.default.replacements[cleanedWord];
    }
    if (replacements) {
      const replacementsMade = replacements.filter(phrase => !!msg.match(phrase.phraseRegex));
      replacementsMade.forEach(phrase => set.push(phrase.source));
    }
  }
  return _util2.default.uniq(set);
};

const filterTag = (a = []) => {
  const set = a.filter(x => x.indexOf('tag') !== -1);
  return set.map(x => x.replace('tag/', ''));
};

const all = function all(input) {
  for (let i = 0; i < files.length; i++) {
    _util2.default.prepFile(`tag/${files[i]}`);
  }

  return filterTag(testRegexpArray(input));
};

const test = function test(fileString, input) {
  if (fileString.slice(-4) !== '.txt') {
    fileString += '.txt';
  }
  _util2.default.prepFile(`tag/${fileString}`);
  const res = filterTag(testRegexpArray(input));
  const source = fileString.replace('.txt', '');

  return res.indexOf(source) !== -1;
};

exports.default = {
  all,
  test
};