export const count = async (baseCurValue, baseCur, targetCurrency) => {
  const request = await fetch(`https://api.exchangeratesapi.io/latest?base=${baseCur}`)
  const response = await request.json()

  return (baseCurValue * response.rates[targetCurrency]).toFixed(2)
}

export const count2 = async (baseCurValue, baseCur, targetCurrency) => {
  const request = await fetch(`https://api.exchangeratesapi.io/latest?base=${baseCur}`)
  const response = await request.json()

  return (baseCurValue / response.rates[targetCurrency]).toFixed(2)
}