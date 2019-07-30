#!/usr/bin/env node
'use strict';
const meow = require('meow')
const pseudoword = require('./')

const cli = meow(`
    Usage
      $ pseudoword <max-chars: 1-50>

    Examples
      $ pseudoword 7
      vootifo

      $ pseudoword 5
      mozuc
`)

console.log(pseudoword(cli.input[0]))
