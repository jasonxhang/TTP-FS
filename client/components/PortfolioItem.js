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
              <span style={valueStyle}>{ticker}</span> - Shares Owned:{' '}
              {numShares} - Current price:{' '}
              <span style={valueStyle}>{formatter.format(latestPrice)}</span> -
              Total value: {formatter.format(latestPrice * numShares)}
            </p>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={`${eventKey}`}>
            <Card.Body className="portfolio-item-body">
              <p>Company: {companyName}</p>
              <p>Shares owned: {numShares}</p>
              <p>Current Price: ${latestPrice}</p>
              <p>Day's Open: ${daysOpenPrice}</p>
              <p>
                Last bought:{' '}
                {moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}
              </p>
              <p>
                <Link to={`/stock/${ticker}`}>Go to stock page</Link>
              </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )
    )
  }
  return <div>{renderPortfolioItem()}</div>
}

export default withRouter(PortfolioItem)
