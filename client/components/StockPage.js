import React from 'react'
import {withRouter} from 'react-router-dom'
import {Spinner} from 'react-bootstrap'
import {useFetchStock} from './containers/useFetchStock'
import NotFound from './NotFound'
import StockTransaction from './StockTransaction'
import {formatter} from './containers/currency'

const StockPage = props => {
  const ticker = props.match.params.ticker
  const [{stockData, isLoading, isError}] = useFetchStock(ticker)

  const {info, logo, quote, stats} = stockData
  const renderLoading = () => {
    return (
      <div className="loading">
        {' '}
        Loading...
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }

  const renderStockInfo = () => {
    return (
      info &&
      logo &&
      quote &&
      stats && (
        <div className="stockpage-container">
          <div className="company-container">
            <h1>{info.symbol}</h1>
            <h5>{info.companyName}</h5>
            <h5>Price: {quote.latestPrice}</h5>
            <div className="stock-details">
              <h6>Opening price: {quote.open}</h6>
              <h6>High: {quote.high}</h6>
              <h6>Low: {quote.low}</h6>
              <h6>Previous close: {quote.previousClose}</h6>
              <h6>Change: {quote.change}</h6>
              <h6>Avg total volume: {quote.avgTotalVolume}</h6>
              <h6>P/E ratio: {quote.peRatio}</h6>
              <h6>52 week high: {quote.week52High}</h6>
              <h6>52 week low: {quote.week52Low}</h6>
            </div>
          </div>
          <StockTransaction
            price={quote.latestPrice}
            ticker={info.symbol}
            name={info.companyName}
          />
        </div>
      )
    )
  }
  return (
    <div>
      {isError && <NotFound />}

      {isLoading ? renderLoading() : renderStockInfo()}
    </div>
  )
}

export default withRouter(StockPage)
