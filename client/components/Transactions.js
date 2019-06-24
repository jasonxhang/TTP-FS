import React, {Fragment, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {Row, Col, Image, Spinner} from 'react-bootstrap'
import {useFetchStock} from './containers/useFetchStock'
import NotFound from './NotFound'
import axios from 'axios'
import moment from 'moment'

const Transactions = props => {
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const fetchTransactions = async () => {
    setIsError(false)
    setIsLoading(true)
    try {
      const {data: transactionsData} = await axios.get('/api/transactions/all')
      setTransactions(transactionsData)
    } catch (e) {
      console.error(e)
      setTransactions([])
      setIsError(true)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const getTransactions = !transactions.length
    getTransactions && fetchTransactions()
  }, [])

  const renderLoading = () => {
    return (
      <div className="loading">
        Loading...
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }

  const renderTransactionTable = () => {
    return transactions.map(t => {
      return (
        <div className="tr" key={t.id}>
          <div className="td">
            <Link to={`/stock/${t.ticker}`}>{t.ticker}</Link>
          </div>
          <div className="td">{t.name}</div>
          <div className="td">{t.purchaseType}</div>
          <div className="td">{t.quantity}</div>
          <div className="td">{t.price}</div>
          <div className="td">
            {t.purchaseType === 'sell' ? '+' : '-'}
            {t.netVal}
          </div>
          <div className="td">{t.notes}</div>
          <div className="td">
            {moment(t.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
          </div>
        </div>
      )
    })
  }

  const renderTransactionData = () => {
    return transactions.length ? (
      <div className="page-container">
        <div id="table-view">
          <div className="table">
            <div className="thead">
              <div className="tr">
                <div className="td">Ticker</div>
                <div className="td">Company Name</div>
                <div className="td">Transaction Type</div>
                <div className="td">Quantity</div>
                <div className="td">Price at transaction</div>
                <div className="td">Net Cost/Gain</div>
                <div className="td">Notes</div>
                <div className="td">Transaction Date </div>
              </div>
            </div>
            <div className="tbody">{renderTransactionTable()}</div>
          </div>
        </div>
      </div>
    ) : (
      'No transaction data available.'
    )
  }

  return (
    <div>
      {isError && <NotFound />}

      {isLoading ? renderLoading() : renderTransactionData()}
    </div>
  )
}

export default withRouter(Transactions)
