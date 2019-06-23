import React, {Fragment, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {Row, Col, Image, Spinner, Accordion} from 'react-bootstrap'
import PortfolioItem from './PortfolioItem'
import NotFound from './NotFound'
// import fetchPortfolio from '../store'

const Portfolio = props => {
  console.log('props portfolio', props.portfolio)
  const [portfolio, setPortfolio] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [portfolioValue, setPortfolioValue] = useState('')
  console.log('isLoading', isLoading)

  const fetchPortfolio = async () => {
    setIsError(false)
    setIsLoading(true)
    try {
      const {data: portfolioData} = await axios.get('/api/portfolio')
      setPortfolio(portfolioData)

      const total = portfolioData.reduce((accum, curr) => {
        let netVal = curr.latestPrice * curr.numShares
        accum += netVal
        return accum
      }, 0)

      setPortfolioValue(total.toFixed(2))
    } catch (e) {
      console.error(e)
      setPortfolio([])
      setIsError(true)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const getPortfolio = !portfolio.length
    getPortfolio && fetchPortfolio()
  }, [])

  const renderLoading = () => {
    return (
      <div className="loading">
        {' '}
        Loading...
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }

  const renderPortfolio = () => {
    return portfolio.length ? (
      <div className="page-container">
        <h3>Portfolio Value: ${portfolioValue}</h3>
        <div className="portfolio-container">
          <Accordion>
            {portfolio.map(item => {
              return (
                <PortfolioItem key={item.id} stock={item} eventKey={item.id} />
              )
            })}
          </Accordion>
        </div>
      </div>
    ) : (
      'No items in your portfolio.'
    )
  }

  return (
    <div>
      {isError && <NotFound />}

      {isLoading ? renderLoading() : renderPortfolio()}
    </div>
  )
}

const mapState = ({portfolio}) => ({
  portfolio
})

export default withRouter(connect(mapState)(Portfolio))
