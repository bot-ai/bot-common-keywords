'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _clean = require('./clean');

var _clean2 = _interopRequireDefault(_clean);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testRegexpArray = (msg = '') => {
  msg = _clean2.default.pre(msg);

  const splitMsg = msg.toLowerCase().split(' ');
  splitMsg.forEach(word => {
    let replacements = _util2.default.replacements[word];
    // in cases like 'kgs.' we don't want to strip punctuation, so only clean if
    // the replacement in its basic form doesn't exist
    if (!replacements) {
      const cleanedWord = _util2.default.cleanWord(word);
      replacements = _util2.default.replacements[cleanedWord];
    }
    if (replacements) {
      replacements.forEach(phrase => {
        // console.log(`Testing "${cleanedWord} - ${phrase.phrase}"`);
        if (phrase.source.indexOf('replace') !== -1) {
          const prevMsg = msg;
          msg = msg.replace(phrase.phraseRegex, phrase.replacementRegex);
          if (msg === '' || msg === ' ') {
            msg = prevMsg;
          }
        }
      });
    }
  });

  msg = _clean2.default.post(msg);

  return msg.trim();
};

const british = function british(input) {
  _util2.default.prepFile('replace/british.txt');
  return testRegexpArray(input);
};

const contraction = function contraction(input) {
  _util2.default.prepFile('replace/contractions.txt');
  return testRegexpArray(input);
};

const emoji = function emoji(input) {
  _util2.default.prepFile('replace/emoji.json');
  return testRegexpArray(input);
};

const frivolous = function frivolous(input) {
  _util2.default.prepFile('replace/frivolous.txt');
  return testRegexpArray(input);
};

const spellfix = function spellfix(input) {
  _util2.default.prepFile('replace/spellfix.txt');
  return testRegexpArray(input);
};

const substitutes = function substitutes(input) {
  _util2.default.prepFile('replace/substitutes.txt');
  return testRegexpArray(input);
};

const all = function all(input) {
  _util2.default.prepFile('replace/british.txt');
  _util2.default.prepFile('replace/contractions.txt');
  _util2.default.prepFile('replace/emoji.json');
  _util2.default.prepFile('replace/frivolous.txt');
  _util2.default.prepFile('replace/spellfix.txt');
  _util2.default.prepFile('replace/substitutes.txt');
  return testRegexpArray(input);
};

exports.default = {
  all,
  british,
  contraction,
  emoji,
  frivolous,
  spellfix,
  substitutes
};