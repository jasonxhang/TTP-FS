import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PORTFOLIO = 'GET_PORTFOLIO'

/**
 * INITIAL STATE
 */
const initState = {
  portfolio: []
}

/**
 * ACTION CREATORS
 */
const getPortfolio = portfolio => ({
  type: GET_PORTFOLIO,
  portfolio
})

/**
 * THUNK CREATORS
 */
export const fetchPortfolio = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/portfolio')
    const action = getPortfolio(data)
    dispatch(action)
  } catch (e) {
    console.error(e)
  }
}

/**
 * REDUCER
 */
export default function(state = initState, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return {...state, portfolio: action.portfolio}

    default:
      return state
  }
}
