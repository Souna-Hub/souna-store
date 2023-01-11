import React, { createRef } from 'react'
import { Grid, Container } from 'semantic-ui-react'

import Card from "../components/card/card";
import 'semantic-ui-css/semantic.min.css'

// import AccountSelector from '../AccountSelector'
// import Balances from '../Balances'
// import BlockNumber from '../BlockNumber'
// import Events from '../Events'
// import Interactor from '../Interactor'
// import Metadata from '../Metadata'
// import NodeInfo from '../NodeInfo'
// import TemplateModule from '../TemplateModule'
// import Transfer from '../Transfer'
// import Upgrade from '../Upgrade'


function DappStore() {
    const contextRef = createRef()
    return (
        <Container ref={contextRef}>
            <h1>DApp Store</h1>
            <Grid columns={4} divided>
                <Grid.Row>
                    <Grid.Column>
                        <Card />
                    </Grid.Column>
                    <Grid.Column>
                        <Card />
                    </Grid.Column>
                    <Grid.Column>
                        <Card />
                    </Grid.Column>
                    <Grid.Column>
                        <Card />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Card />
                    </Grid.Column>
                    <Grid.Column>
                        <Card />
                    </Grid.Column>
                    <Grid.Column>
                        <Card />
                    </Grid.Column>
                    <Grid.Column>
                        <Card />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

DappStore.propTypes = {}

export default DappStore
