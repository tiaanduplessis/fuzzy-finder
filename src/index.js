import escape from 'escape-string-regexp'

const fuzzyFinder = (str = '', args = []) => {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string')
  }

  // Split before escaping so fuzzy gaps never break an escape sequence.
  const escaped = str.split('').map(escape)
  const regex = new RegExp(`${escaped.join('(.*)')}.*`)

  return args.reduce((acc, possibleMatch) => {
    const result = regex.exec(possibleMatch)

    if (result) {
      acc.push({
        match: possibleMatch,
        rank: result.index
      })
    }
    return acc
  }, [])
}

export default fuzzyFinder
