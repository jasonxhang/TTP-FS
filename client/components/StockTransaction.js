import React, {Fragment, useState, useEffect} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {Form, Button, Alert} from 'react-bootstrap'
import {connect} from 'react-redux'
import {me, fetchPortfolio} from '../store'
import {formatter} from './containers/currency'

const StockTransaction = (
  {price, ticker, name, balance, reloadInitialData, portfolio},
  props
) => {
  const [purchaseType, setPurchase] = useState('')
  const [quantity, setQuantity] = useState('')
  const [notes, setNotes] = useState('')
  const [netVal, setNetVal] = useState(0)
  const [ownedShares, setOwnedShares] = useState(0)
  // const [message, setMessage] = useState('')
  // const [variant, setVariant] = useState('')
  // const [cost, setCost] = useState('')

  // console.log('quantity', quantity)
  // console.log('purchasetype', purchaseType)
  // console.log('notes', notes)
  // console.log('netVal', netVal)
  // console.log('balance', balance)
  // console.log('bool', netVal > balance)
  // console.log('typeof', props.portfolio)
  // console.log('portfolio?', props.portfolio.length)

  console.log('owned shares', ownedShares)

  const calcOwnedShares = () => {
    const num = portfolio.reduce((accum, curr) => {
      if (curr.ticker === ticker) {
        accum = curr.numShares
      }

      return accum
    }, 0)
    setOwnedShares(num)
  }

  useEffect(() => {
    portfolio.length && calcOwnedShares()
  }, [])

  const handleOrder = async () => {
    try {
      const order = {purchaseType, quantity, price, ticker, name, notes, netVal}
      const res = await axios.post('/api/stocks/order', order)
      setPurchase('')
      setQuantity(0)
      setNotes('')
      setNetVal(0)
      reloadInitialData()
    } catch (e) {
      alert(e.response.data)
      console.error(e)
    }
  }

  const onChange = e => {
    const re = /^[0-9\b]+$/

    // if value is not blank, then test the regex

    if (e.target.value === '' || re.test(e.target.value)) {
      setQuantity(e.target.value)
      setNetVal((e.target.value * price).toFixed(2))
    }
  }

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

    return (
      <div>
        <p>
          Total {str}: {formatter.format(netVal)}
        </p>
        <Button
          size="lg"
          disabled={purchaseType === ''}
          onClick={handleOrder}
          variant={variant}
        >
          {message}
        </Button>
      </div>
    )
  }

  const renderInsufficient = () => {
    return (
      <Fragment>
        <p>Total cost: {formatter.format(netVal)}</p>
        <Alert variant="warning">Insufficient funds!</Alert>
      </Fragment>
    )
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
        <div>Currently owned: {ownedShares}</div>
        <Form.Label>Number of shares to transact:</Form.Label>
        <Form.Control
          value={quantity}
          type="shares"
          placeholder="0"
          onChange={onChange}
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
      {purchaseType === 'buy' && netVal > balance
        ? renderInsufficient()
        : renderConfirmButton()}
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
