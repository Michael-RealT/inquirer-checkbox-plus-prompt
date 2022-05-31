/**
 * Checkbox Plus Example
 * 
 * @author Mohammad Fares <faressoft.com@gmail.com>
 */

import inquirer from 'inquirer';
const { registerPrompt, prompt } = inquirer;

import fuzzy from 'fuzzy';

import CheckboxPlusPrompt from './index.js'

registerPrompt('checkbox-plus', CheckboxPlusPrompt);

var colors = [
  { name: 'The red color', value: 'red', short: 'red', disabled: false },
  { name: 'The blue color', value: 'blue', short: 'blue', disabled: true },
  { name: 'The green color', value: 'green', short: 'green', disabled: false },
  { name: 'The yellow color', value: 'yellow', short: 'yellow', disabled: false },
  { name: 'The black color', value: { name: 'black' }, short: 'black', disabled: false }
];

prompt([
  {
    type: 'checkbox-plus',
    message: 'Enter colors',
    name: 'colors',
    pageSize: 10,
    highlight: true,
    searchable: true,
    default: ['yellow', 'red', { name: 'black' }],
    validate: function (answer) {
      if (answer.length < 1) {
        return 'You must choose at least one topping.';
      }
      return true;
    },
    source: function (answersSoFar, input) {
      input = input || '';

      const result = new Promise(function (resolve) {
        var fuzzyResult = fuzzy.filter(input, colors, {
          extract: function (item) {
            return item['name'];
          }
        });
        var data = fuzzyResult.map(function (element) {
          return element.original;
        });
        resolve(colors);
      });
      return result

    }

  },
])
  .then(function (answers) {
    console.log(answers.colors);
  });