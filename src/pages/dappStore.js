import React, { createRef } from 'react'
import { Grid, Container } from 'semantic-ui-react'

import Card from "../components/card/card";
import 'semantic-ui-css/semantic.min.css'
import "./dappStore.css"

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

const dappList = [
    {
        title: "Wildcash",
        tags: ["nft", "gamefi"],
        imageUrl: "https://play-lh.googleusercontent.com/SIGqx9zg70r_prkE8NytTNq_zHgm2hLnG3gzHHQeYICJLnn0I-_BHOObPPeYP9Pkgw",
        description: "Learn blockchain, earn"
    },
    {
        title: "Lucky Wheel",
        tags: ["gamefi"],
        imageUrl: "https://descartesnetwork.github.io/sen-lucky-wheel/static/asset/logo.5eecdd0c2a22d716.svg",
        description: "Spin and win $1000 NFTs"
    },
    {
        title: "Horizonland",
        tags: ["nft", "meta"],
        imageUrl: "https://accelerator.oct.network/projects/Horizonland.jpg",
        description: "Horizonland is a VR playground combining multiple esport games within one virtual universe. "
    },
    {
        title: "Yogain",
        tags: ["gamefi"],
        imageUrl: "https://accelerator.oct.network/projects/Yogain.jpg",
        description: "Yogain is a well-designed web3 mobile fitness app with the Fitness2Earn concept using AR and Blockchain technology. Users are equipped with NFT Mats – to practice yoga poses and earn rewards."
    },
    {
        title: "Plats Network",
        tags: ["utility"],
        imageUrl: "https://accelerator.oct.network/projects/PlatsNetwork.jpg",
        description: "Plats Network is a community-owned Web3 Marketing Platform for global users, influencers, and all businesses with three main products: Client Web Service, Referrer Web Service and User Mobile App. Our mission is to expose public users and mainstream influencers to the blockchain industry, provide traditional businesses maximum support of technology, and dispense values directly to targeted users. Plats Network provides both crypto and non-crypto clients an user-friendly web3 tools and libraries for to create and manage their own marketing campaigns."
    },
    {
        title: "Fusotao",
        tags: ["defi", "utility"],
        imageUrl: "https://accelerator.oct.network/projects/fusotao.svg",
        description: "Fusotao Protocol is DEX infrastructure for building DEXs with trading privacy, minimal gas fees, and lower trading costs."
    }
];


function DappStore() {
    const contextRef = createRef()
    return (
        <Container className="store-wrap" ref={contextRef}>
            <div className='store-content'>
                <h1 className='store-title'>DApp Store</h1>
                <Grid columns={4}>
                    {dappList.map((item, index) => {
                        return (
                            <Grid.Column key={index}>
                                <Card {...item} />
                            </Grid.Column>
                        )
                    })}
                </Grid>
            </div>
        </Container>
    )
}

DappStore.propTypes = {}

export default DappStore
