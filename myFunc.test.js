const { addTotalValue } = require('./myFunc')


describe('addTotalValue', () => {
  it('Adds totalValue key to each product', () => {
    const products = [
      {
        name: 'TV',
        price: 100,
        quantity: 4,
      },
      {
        name: 'Xbox',
        price: 500,
        quantity: 2,
      }
    ]

    const expected = [
      {
        name: 'TV',
        price: 100,
        quantity: 4,
        totalValue: 400
      },
      {
        name: 'Xbox',
        price: 500,
        quantity: 2,
        totalValue: 1000,
      }
    ]
    const actual = addTotalValue(products)
    expect(actual).toEqual(expected)
  })

  it('Returns 0 if there is no price', () => {
    const products = [
      {
        name: 'TV',
        quantity: 4,
      },
    ]

    const expected = [
      {
        name: 'TV',
        quantity: 4,
        totalValue: 'Unknown'
      }
    ]

    const actual = addTotalValue(products)

    expect(actual).toEqual(expected)
  })

})