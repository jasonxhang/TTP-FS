import React, {Fragment, useState} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Row, Col, Image, Spinner} from 'react-bootstrap'
import {useFetchStock} from './containers/useFetchStock'
import NotFound from './NotFound'
import StockTransaction from './StockTransaction'

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
