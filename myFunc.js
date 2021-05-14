const addTotalValue = products => {
  return products.map(product => {
    const totalValue = product.price ? product.price * product.quantity : 'Unknown'

    return {
      ...product,
      totalValue
    }
  })
}


module.exports = {
  addTotalValue,
}