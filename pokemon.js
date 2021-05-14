const superagent = require('superagent')

const getAllPokemonNames = async () => {
  let names = []
  let next = null

  const { body } = await superagent.get('https://pokeapi.co/api/v2/pokemon')
  next = body.next

  names.push(...body.results.map(x => x.name))

  while (next) {
    const { body } = await superagent.get(next)
    next = body.next

    names.push(...body.results.map(x => x.name))
  }

  return names
}

module.exports = {
  getAllPokemonNames
}