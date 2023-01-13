import React, { createRef } from 'react'
import {
    Container,
    Dimmer,
    Loader,
    Grid,
    Message,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import { useSubstrateState } from '../substrate-lib'
import { DeveloperConsole } from '../substrate-lib/components'

import Balances from '../Balances'
import Events from '../Events'
import Interactor from '../Interactor'

function Deploy() {
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

            <Container>
                <Grid stackable columns="equal">
                    <Grid.Row stretched>
                        <Balances />
                    </Grid.Row>
                    <Grid.Row>
                        <Interactor />
                        <Events />
                    </Grid.Row>
                </Grid>
            </Container>
            <DeveloperConsole />
        </div>
    )
}

export default Deploy;
