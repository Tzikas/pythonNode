# pseudoword-js
Generates a random pseudoword

## Definition
"A pseudoword or non-word is a unit of speech or text that appears to be an actual word in a certain language, while in fact it has no meaning in the lexicon. It is a kind of non-lexical vocable."
[Wikipedia](https://en.wikipedia.org/wiki/Pseudoword)

## Usage

```
$ npm install --save pseudoword
```

```js
const pseudoword = require('pseudoword');

pseudoword(7);
//=> 'noorija'

pseudoword(5);
//=> 'atuyo'
```

## CLI

```
$ npm install --global pseudoword
```

```
$ pseudoword --help
```

## License

MIT © [Celso Endo](https://github.com/celsoendo)
