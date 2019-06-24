import React, {Fragment, useState, useEffect} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {Form, Button, Alert} from 'react-bootstrap'
import {connect} from 'react-redux'
import {me, fetchPortfolio} from '../store'
import {formatter} from './containers/currency'

const StockTransaction = ({
  price,
  ticker,
  name,
  balance,
  reloadInitialData,
  portfolio
}) => {
  const [purchaseType, setPurchase] = useState('')
  const [quantity, setQuantity] = useState('')
  const [notes, setNotes] = useState('')
  const [netVal, setNetVal] = useState(0)
  const [ownedShares, setOwnedShares] = useState(0)

  const calcOwnedShares = () => {
    const num = portfolio.reduce((accum, curr) => {
      if (curr.ticker === ticker) {
        accum = curr.numShares
      }
      if (curr.numShares === 0) accum = 0
      return accum
    }, 0)
    setOwnedShares(num)
  }

  useEffect(() => {
    calcOwnedShares()
  })

  const handleOrder = async () => {
    try {
      const order = {purchaseType, quantity, price, ticker, name, notes, netVal}
      const res = await axios.post('/api/stocks/order', order)
      setPurchase('')
      setQuantity('')
      setNotes('')
      setNetVal(0)
      reloadInitialData()
      calcOwnedShares()
    } catch (e) {
      alert(e.response.data)
      console.error(e)
    }
  }

  const onChange = e => {
    //only accept whole integers client side
    const re = /^[0-9\b]+$/
    // if value is not blank, then test the regex

    if (e.target.value === '' || re.test(e.target.value)) {
      setQuantity(e.target.value)
      setNetVal((e.target.value * price).toFixed(2))
    }
  }

  //if trying to sell more shares than owned or buy with insufficient funds, render error. otherwise display dynamic confirmation
  const renderConfirmButton = () => {
    let message, variant, str

    if (purchaseType === 'buy') {
      message = 'Confirm purchase'
      variant = 'success'
      str = 'cost'
    } else if (purchaseType === 'sell') {
      message = 'Confirm sale'
      variant = 'danger'
      str = 'gain'
    } else {
      message = 'Please choose a transaction type'
      variant = 'info'
      str = ''
    }

    if (purchaseType === 'buy' && netVal > balance) {
      return (
        <Fragment>
          <p>Total cost: {formatter.format(netVal)}</p>
          <Alert variant="warning">Insufficient funds!</Alert>
        </Fragment>
      )
    } else if (purchaseType === 'sell' && quantity > ownedShares) {
      return (
        <Fragment>
          <p>Total cost: {formatter.format(netVal)}</p>
          <Alert variant="warning">Insufficient shares to sell!</Alert>
        </Fragment>
      )
    } else {
      return (
        <div>
          <p>
            Total {str}: {formatter.format(netVal)}
          </p>
          <Button
            size="lg"
            disabled={purchaseType === '' || quantity === ''}
            onClick={handleOrder}
            variant={variant}
          >
            {message}
          </Button>
        </div>
      )
    }
  }

  const renderTransactionButtons = () => {
    return (
      <Fragment>
        <Button size="lg" onClick={() => setPurchase('buy')} variant="light">
          Buy
        </Button>
        <Button size="lg" onClick={() => setPurchase('sell')} variant="light">
          Sell
        </Button>
      </Fragment>
    )
  }

  return (
    <Form className="transaction-container">
      <Form.Group controlId="shares">
        <div>Shares currently owned: {ownedShares}</div>
        <Form.Label>Number of shares to transact:</Form.Label>
        <Form.Control
          value={quantity}
          type="shares"
          onChange={onChange}
          placeholder="0"
        />
      </Form.Group>

      {renderTransactionButtons()}

      <Form.Group controlId="transaction-notes">
        <Form.Label>Transaction notes (optional)</Form.Label>
        <Form.Control
          value={notes}
          onChange={event => setNotes(event.target.value)}
          as="textarea"
          rows="3"
        />
      </Form.Group>
      {renderConfirmButton()}
    </Form>
  )
}

const mapState = state => ({
  balance: state.user.balance,
  portfolio: state.portfolio.portfolio
})

const mapDispatch = dispatch => {
  return {
    reloadInitialData() {
      dispatch(me())
      dispatch(fetchPortfolio())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(StockTransaction))
