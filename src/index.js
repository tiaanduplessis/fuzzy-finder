import escape from 'escape-string-regexp'

const fuzzyFinder = (str = '', args = []) => {
  const escaped = escape(str)
  const regex = new RegExp(`${escaped.split(/(\.|)/).filter(x => x.length).join('(.*)')}.*`)

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
