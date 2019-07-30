'use strict';
const MAX_CHARS = 50

const dictRules = [
  {
    name: 'V',
    length: 1,
    chars: ['a', 'e', 'i', 'o', 'u'],
    allowedAfter: ['C', 'CC', 'VC']
  },
  {
    name: 'VC',
    length: 2,
    chars: ['ab', 'ac', 'ad', 'af', 'ag', 'aj', 'ak', 'al', 'am', 'an', 'ap', 'ar', 'as', 'at', 'av', 'ax', 'ay', 'az',
            'eb', 'ec', 'ed', 'ef', 'eg', 'ej', 'ek', 'el', 'em', 'en', 'ep', 'er', 'es', 'et', 'ev', 'ex', 'ey', 'ez',
            'ib', 'ic', 'id', 'if', 'ig', 'ij', 'ik', 'il', 'im', 'in', 'ip', 'ir', 'is', 'it', 'iv', 'ix', 'iz',
            'ob', 'oc', 'od', 'of', 'og', 'oj', 'ok', 'ol', 'om', 'on', 'op', 'or', 'os', 'ot', 'ov', 'ox', 'oy', 'oz',
            'ub', 'uc', 'ud', 'uf', 'ug', 'uj', 'uk', 'ul', 'um', 'un', 'up', 'ur', 'us', 'ut', 'uv', 'ux', 'uy', 'uz'],
    allowedAfter: ['C', 'VC']
  },
  {
    name: 'C',
    length: 1,
    chars: ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'x', 'z'],
    allowedAfter: ['V', 'CVV', 'CV']
  },
  {
    name: 'CVV',
    length: 3,
    chars: ['bee', 'boo',
            'dee', 'doo',
            'fee', 'foo',
            'goo',
            'hoo',
            'lee', 'loo',
            'mee', 'moo',
            'nee', 'noo',
            'pee', 'poo',
            'tee',
            'voo',
            'wee', 'woo'],
    allowedAfter: ['V', 'CV']
  },
  {
    name: 'CV',
    length: 2,
    chars: ['ba', 'be', 'bi', 'bo', 'bu',
            'ca', 'ce', 'ci', 'co', 'cu',
            'da', 'de', 'di', 'do', 'du',
            'fa', 'fe', 'fi', 'fo', 'fu',
            'ga', 'ge', 'gi', 'go', 'gu',
            'ha', 'he', 'hi', 'ho', 'hu',
            'ja', 'je', 'ji', 'jo', 'ju',
            'ka', 'ke', 'ki', 'ko', 'ku',
            'la', 'le', 'li', 'lo', 'lu',
            'ma', 'me', 'mi', 'mo', 'mu',
            'na', 'ne', 'ni', 'no', 'nu',
            'pa', 'pe', 'pi', 'po', 'pu',
            'ra', 're', 'ri', 'ro', 'ru',
            'sa', 'se', 'si', 'so', 'su',
            'ta', 'te', 'ti', 'to', 'tu',
            'va', 've', 'vi', 'vo', 'vu',
            'za', 'ze', 'zi', 'zo', 'zu'],
    allowedAfter: ['CVV', 'V']
  }
]

const getGroup = (lastGroupName, pseudowordMaxLength, pseudowordCurrentLength) => {
  const groupMaxChar = pseudowordMaxLength - pseudowordCurrentLength
  let dictFilter;

  if (lastGroupName === '') {
    dictFilter = dictRules
      // Remove groups that are not allowed at the start of the pseudoword
      .filter(group => (group.allowedAtStart !== undefined ? group.allowedAtStart : true))
  } else {
    dictFilter = dictRules
      .filter(group => group.allowedAfter.indexOf(lastGroupName) >= 0)
  }

  dictFilter = dictFilter
    // Remove groups with more than the allowed characters
    .filter(group => group.length <= groupMaxChar)
    // Remove groups not allowed at the end of the pseudoword
    .filter(group => {
      if (pseudowordCurrentLength + group.length === pseudowordMaxLength) {
        return (group.allowedAtEnd !== undefined ? group.allowedAtEnd : true)
      }

      return true
    })

  return dictFilter[Math.floor(Math.random() * dictFilter.length)]
}

const generate = (maxLength, pseudoword, lastGroupName) => {
  maxLength = maxLength || 1
  pseudoword = pseudoword || ''
  lastGroupName = lastGroupName || ''

  const currentLength = pseudoword.length
  if (currentLength === maxLength) {
    return pseudoword
  }

  // Get the group to be used in this iteration
  const dictGroup = getGroup(lastGroupName, maxLength, currentLength)

  // Add a random character from this group to the pseudoword
  pseudoword = pseudoword + dictGroup.chars[Math.floor(Math.random() * dictGroup.chars.length)]

  // Set the last group name
  lastGroupName = dictGroup.name

  return generate(maxLength, pseudoword, lastGroupName)
}

module.exports = (length) => generate((length > MAX_CHARS ? MAX_CHARS : length))
