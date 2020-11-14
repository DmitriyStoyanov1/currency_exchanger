import React, { useEffect, useState } from 'react';
import './App.css';
import { currencyMap } from './constants';
import { count, count2 } from './count';
import { currentMonth } from './month';
import { monthRates } from './periodRequest';
import Chart from './Chart';

function App() {
  const [baseCurrency, setBaseCurrency] = useState('')
  const [baseValue, setBaseValue] = useState('')

  const [targetCurrency, setTargetCurrency] = useState('')
  const [targetValue, setTargetValue] = useState('')

  // храним список доступных валют
  const [currencies, setCurrencies] = useState(['EUR'])

   //запросы на месяц
  const [monthlyCurrencies, setmonthlyCurrencies] = useState([])
  const [monthlyRates, setmonthlyRates] = useState([])

  // выполняется при запуске компонента один раз
  useEffect(() => {
    const onAppMounted = async () => {
      const { base, rates } = await fetchLatestCourse()
      setBaseCurrency(base)
      const arr = Object.keys(rates)
      arr.unshift('EUR')
      setCurrencies(arr)
    }

    onAppMounted()
  }, [])

  const onBaseCurrencyValueChanged = async (baseValue) => {
    if(baseValue === 0 && baseCurrency && targetCurrency) {
      setBaseValue('');
      setTargetValue('');
      return;
    }

    if(baseValue === 0) {
      setBaseValue('');
      return;
    }

    if(!baseCurrency || !targetCurrency) {
      setBaseValue(baseValue)
    }

    if(baseCurrency && targetCurrency && baseValue > 0) {
      const counted = await count(baseValue, baseCurrency, targetCurrency)
      setTargetValue(counted)
      setBaseValue(baseValue)
      
    }
  }

  const onTargetCurrencyValueChanged = async (targetValue) => {
    if(targetValue === 0 && baseCurrency && targetCurrency) {
      setBaseValue('');
      setTargetValue('');
      return;
    }

    if(targetValue === 0) {
      setTargetValue('');
      return;
    }

    if(!baseCurrency || !targetCurrency) {
      setTargetValue(targetValue)
    }
    
    if(baseCurrency && targetCurrency && targetValue > 0) {
      const counted = await count2(targetValue, baseCurrency, targetCurrency)

      setBaseValue(counted)
      setTargetValue(targetValue)
    }
  }

  const onBaseCurrencyChanged = async (baseCurrency) => {
    if(baseValue > 0 && baseCurrency && targetCurrency) {
      
      const counted = await count(baseValue, baseCurrency, targetCurrency)
      setBaseCurrency(baseCurrency)
      setTargetValue(counted)
      
    } else {
      setBaseCurrency(baseCurrency)
    }
  }

  const onTargetCurrencyChanged = async (targetCurrency) => {
    
    if(baseValue > 0 && baseCurrency && targetCurrency) {
      const counted = await count(baseValue, baseCurrency, targetCurrency)
      setTargetCurrency(targetCurrency)
      setTargetValue(counted)
    } else {
      setTargetCurrency(targetCurrency)
    }
  }

  // Функция для запроса данных
  const fetchLatestCourse = async () => {
    const request = await fetch('https://api.exchangeratesapi.io/latest')
    const response = await request.json()
    return response
  }

  // Делаем специальную функцию, чтобы генерировать опции для селекта
  // Функцию оборачиваем в useCallback чтобы не было лишних ререндеров
  // const currencySelectOptions = React.useCallback(() => {
  //   return currencies.map(currency => ({
  //     value: currency,
  //     label: currencyMap[currency]
  //   }))
  // }, [currencies])
  
  const getMonthlyRates = async (base) => {
    const { rates } = await monthRates(base)
    setmonthlyRates(Object.entries(rates))
    setmonthlyCurrencies(Object.keys(rates).sort())
    console.log(monthlyRates)
    console.log(monthlyCurrencies, 'currencies')
  }

  const getxAxisValues = () => {
    return monthlyCurrencies.map((item, i) => {
      return (Number(item.substr(8, 2)) + ' ' + currentMonth[item.substr(5, 2)])
    })
  }
  const getyAxisValues = () => {
    if(targetCurrency) {
    return monthlyRates.map((item, i) => {
      return item[1][targetCurrency]
    })
    }
  }

  console.log(currencies)

  return (
    <div className="app">
      <div className="exchange-wrapper">
        <div className="headers">
          {baseCurrency && targetCurrency && baseValue > 0 &&(
            <p>{baseValue} {currencyMap[baseCurrency]}</p>
          )}
          {baseCurrency && targetCurrency && baseValue > 0 &&(
            <h1>{targetValue} {currencyMap[targetCurrency]}</h1>
          )}
        </div>

        <div className="currencies">
          <div className="currency">
            <input
              type="number"
              value={baseValue}
              onChange={(event) => {
                onBaseCurrencyValueChanged(Number(event.target.value))
              }}
              placeholder={0}
            />
            
            <select onChange={(selectEvent) => {
              onBaseCurrencyChanged(selectEvent.target.value)
              getMonthlyRates(selectEvent.target.value)
            }}
            >
              <option hidden value="">set currency</option>
              {currencies.map((item, i) => {
                return <option value={item} key={i}>{currencyMap[item]}</option>
              })}
            </select>
          </div>

          <div className="currency">
            <input
              type="number"
              value={targetValue}
              onChange={(event) => {
                onTargetCurrencyValueChanged(Number(event.target.value))
              }}
              placeholder={0}
            />
          <select onChange={(selectEvent) => {
            onTargetCurrencyChanged(selectEvent.target.value)
            }}
          >
            <option hidden value="">set currency</option>
            {currencies.map((item, i) => {
              return <option value={item} key={i}>{currencyMap[item]}</option>
            })}
          </select>
          </div>
        </div>
      </div>
      <div className="graphic-wrapper">
        <Chart func={getxAxisValues}
               func2={getyAxisValues}
        />
      </div>
    </div>
  );
}

export default App;
