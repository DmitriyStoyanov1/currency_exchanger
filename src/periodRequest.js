export const monthRates = async (baseCur) => {
    const date = new Date
    const date1 = new Date('2010-09-05')
    console.log(date.getDate(), 'day')
    console.log(date.getFullYear(), 'year')
    console.log(date.getMonth(), 'month')
    console.log(date1, 'birthday')
    const request = await fetch(`https://api.exchangeratesapi.io/history?start_at=${date.getFullYear()}-${date.getMonth()}-${date.getDate()}&end_at=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}&base=${baseCur}`)
    const response = await request.json()
    return response
}