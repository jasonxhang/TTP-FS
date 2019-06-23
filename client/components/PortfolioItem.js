import React, {Fragment, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {Card, Accordion} from 'react-bootstrap'
import {useFetchStock} from './containers/useFetchStock'
import moment from 'moment'
import {formatter} from './containers/currency'

const PortfolioItem = ({stock, eventKey}) => {
  // console.log(stock)
  const {
    ticker,
    numShares,
    companyName,
    updatedAt,
    createdAt,
    latestPrice,
    daysOpenPrice
  } = stock

  const [valueStyle, setValueStyle] = useState({})
  // const [{stockData, isLoading, isError}] = useFetchStock(ticker)
  // const {info, logo, quote, stats} = stockData

  // const renderLoading = () => {
  //   return (
  //     <div>
  //       {' '}
  //       Loading...
  //       <Spinner animation="border" variant="primary" />
  //     </div>
  //   )
  // }

  useEffect(() => {
    const style = {
      color: ''
    }

    if (latestPrice > daysOpenPrice) {
      style.color = 'green'
    } else if (latestPrice === daysOpenPrice) {
      style.color = 'grey'
    } else if (latestPrice < daysOpenPrice) {
      style.color = 'red'
    }

    setValueStyle(style)
  }, [])

  const renderPortfolioItem = () => {
    return (
      stock && (
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey={`${eventKey}`}>
            <p>
              {ticker} - Shares Owned: {numShares} - Total Value:{' '}
              <span style={valueStyle}>
                {formatter.format(latestPrice * numShares)}
              </span>
            </p>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={`${eventKey}`}>
            <Card.Body>
              <p>Company: {companyName}</p>
              <p>Shares owned: {numShares}</p>
              <p>Current Price: ${latestPrice}</p>
              <p>Days Open: ${daysOpenPrice}</p>
              <p>
                Last bought:{' '}
                {moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}
              </p>
              <Link to={`/stock/${ticker}`}>
                <p>Go to stock page</p>
              </Link>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )
    )
  }
  return (
    <div>
      {/* {isError && 'Failed to load'} */}
      {/* {isLoading ? renderLoading() : renderPortfolioItem()} */}
      {renderPortfolioItem()}
    </div>
  )
}

export default withRouter(PortfolioItem)
