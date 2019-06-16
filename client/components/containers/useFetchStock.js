import {useState, useEffect} from 'react'
import axios from 'axios'

export const useFetchStock = ticker => {
  const [stockData, setStockData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  // const [ticker, setTicker] = useState(
  //   '',
  // );

  const getData = async () => {
    setIsError(false)
    setIsLoading(true)
    try {
      const {data} = await axios.get(`/api/stocks/${ticker}`)
      setStockData(data)
    } catch (e) {
      setStockData([])
      setIsError(true)
    }

    setIsLoading(false)
  }

  useEffect(
    () => {
      getData()
    },
    [ticker]
  )

  return [{stockData, isLoading, isError}]
}
