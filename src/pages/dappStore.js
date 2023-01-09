import React, { createRef } from 'react'
import {
    Sticky,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import { Grid } from '@mui/material'

import AccountSelector from '../AccountSelector'
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
        <div>
            <Sticky context={contextRef}>
                <AccountSelector />
            </Sticky>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <h1>xs=8</h1>
                </Grid>
                <Grid item xs={4}>
                    <h1>xs=4</h1>
                </Grid>
                <Grid item xs={4}>
                    <h1>xs=4</h1>
                </Grid>
                <Grid item xs={8}>
                    <h1>xs=8</h1>
                </Grid>
            </Grid>
        </div >
    )
}

DappStore.propTypes = {}

export default DappStore
