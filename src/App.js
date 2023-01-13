import React, { createRef } from 'react'
// import { Routes, Route } from 'react-router-dom';
import {
  Dimmer,
  Loader,
  Grid,
  Message,
  Container,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import "./app.css"
import Menu from "./components/menu/menu";

import { SubstrateContextProvider, useSubstrateState } from './substrate-lib'
// import DappStore from "./pages/dappStore";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/home'
import DappStore from './pages/dappStore';
import Deploy from './pages/dappDeploy';
import LuckyWheel from './pages/dappTest/luckyWheel/App';
import FlappyBird from './pages/dappTest/flappyBird/App';

function Main() {
  const { apiState, apiError, keyringState } = useSubstrateState()

  const loader = text => (
    <Dimmer active>
      <Loader size="small">{text}</Loader>
    </Dimmer>
  )

  const message = errObj => (
    <Grid centered columns={2} padded>
      <Grid.Column>
        <Message
          negative
          compact
          floating
          header="Error Connecting to Substrate"
          content={`Connection to websocket '${errObj.target.url}' failed.`}
        />
      </Grid.Column>
    </Grid>
  )

  if (apiState === 'ERROR') return message(apiError)
  else if (apiState !== 'READY') return loader('Connecting to Substrate')

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    )
  }

  const contextRef = createRef()

  return (
    <div ref={contextRef}>
      <Container className="menu-wrap">
        <Menu contextRef={contextRef} />
      </Container>
      <Switch>
        <Route exact path="/store">
          <DappStore />
        </Route>
        <Route exact path="/deploy">
          <Deploy />
        </Route>
        <Route exact path="/dapp/lucky-wheel">
          <LuckyWheel />
        </Route>
        <Route exact path="/dapp/flappy-bird">
          <FlappyBird />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <SubstrateContextProvider>
        <Main />
      </SubstrateContextProvider>
    </Router>
  )
}
