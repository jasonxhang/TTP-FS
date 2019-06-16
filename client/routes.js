import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {NotFound, Home, Login, Signup, StockPage} from './components'

import AppliedRoute from './components/containers/AppliedRoute'
import AuthenticatedRoute from './components/containers/AuthenticatedRoute'
import UnauthenticatedRoute from './components/containers/UnauthenticatedRoute'

const Routes = ({childProps}) => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute
      path="/stock/:ticker"
      exact
      component={StockPage}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/signup"
      exact
      component={Signup}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/login"
      exact
      component={Login}
      props={childProps}
    />
    {/* <AuthenticatedRoute
      path="/portfolio"
      exact
      component={Portfolio}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/transactions"
      exact
      component={Transactions}
      props={childProps}
    /> */}

    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
)

export default Routes
