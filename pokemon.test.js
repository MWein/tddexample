const superagent = require('superagent')
const { getAllPokemonNames } = require('./pokemon')


describe('getAllPokemonNames', () => {
  beforeEach(() => {
    superagent.get = jest.fn()
  })


  it('Makes the initial call to the pokemon api', async () => {
    superagent.get.mockReturnValue({
      body: {
          next: null,
          results: []
      } 
    })

    await getAllPokemonNames()

    expect(superagent.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon')
  })

  it('Keeps calling the next URL after each call, stops when next is null', async () => {
    superagent.get.mockReturnValueOnce({
      body: {
        next: 'someurl',
        results: []
      }
    })

    superagent.get.mockReturnValueOnce({
      body: {
        next: null,
        results: []
      }
    })

    await getAllPokemonNames()

    expect(superagent.get).toHaveBeenCalledTimes(2)
    expect(superagent.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon')
    expect(superagent.get).toHaveBeenCalledWith('someurl')
    expect(superagent.get).not.toHaveBeenCalledWith(null)
  })

  it('Returns all of the pokemon names', async () => {
    superagent.get.mockReturnValueOnce({
      body: {
        next: 'someurl',
        results: [
          {
              "name": "bulbasaur",
              "url": "https://pokeapi.co/api/v2/pokemon/1/"
          },
          {
              "name": "ivysaur",
              "url": "https://pokeapi.co/api/v2/pokemon/2/"
          },
        ]
      }
    })

    superagent.get.mockReturnValueOnce({
      body: {
        next: null,
        results: [
          {
              "name": "venusaur",
              "url": "https://pokeapi.co/api/v2/pokemon/1/"
          },
          {
              "name": "charmander",
              "url": "https://pokeapi.co/api/v2/pokemon/2/"
          },
        ]
      }
    })

    const actual = await getAllPokemonNames()
    const expected = [ 'bulbasaur', 'ivysaur', 'venusaur', 'charmander' ]
    expect(actual).toEqual(expected)
  })
})