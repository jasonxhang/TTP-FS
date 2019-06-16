import React, {Fragment, useState} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Row, Col, Image, Spinner} from 'react-bootstrap'
import {useFetchStock} from './containers/useFetchStock'
import NotFound from './NotFound'

const StockPage = props => {
  const ticker = props.match.params.ticker
  const [{stockData, isLoading, isError}] = useFetchStock(ticker)

  const {info, logo, quote, stats} = stockData
  const renderLoading = () => {
    return (
      <div>
        {' '}
        Loading...
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }

  const renderStockInfo = () => {
    return (
      <Row>
        <Col xs={6} md={4}>
          {logo && <Image src={logo.url} rounded />}
        </Col>
      </Row>
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
