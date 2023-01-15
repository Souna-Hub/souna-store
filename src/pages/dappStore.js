import React, { createRef, useEffect, useState } from 'react'
import { Grid, Container } from 'semantic-ui-react'

import Card from "../components/card/card";
import 'semantic-ui-css/semantic.min.css'
import "./dappStore.css"
import { useSubstrateState } from '../substrate-lib'
import { useHistory } from "react-router-dom";


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

// const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

// Import the API, Keyring and some utility functions
import { ApiPromise, WsProvider } from '@polkadot/api';

const dappListFake = [
    {
        id: 1,
        title: "Wildcash",
        tags: ["nft", "gamefi"],
        logoUrl: "https://play-lh.googleusercontent.com/SIGqx9zg70r_prkE8NytTNq_zHgm2hLnG3gzHHQeYICJLnn0I-_BHOObPPeYP9Pkgw",
        description: "Learn blockchain, earn",
        isInstalled: false,
        linkToApp: ""
    },
    {
        id: 2,
        title: "Lucky Wheel",
        tags: ["mini", "gamefi"],
        logoUrl: "https://descartesnetwork.github.io/sen-lucky-wheel/static/asset/logo.5eecdd0c2a22d716.svg",
        description: "Spin and win $1000 NFTs",
        isInstalled: false,
        linkToApp: "lucky-wheel"
    },
    {
        id: 3,
        title: "Horizonland",
        tags: ["nft", "meta"],
        logoUrl: "https://accelerator.oct.network/projects/Horizonland.jpg",
        description: "Horizonland is a VR playground combining multiple esport games within one virtual universe. ",
        isInstalled: false,
        linkToApp: ""
    },
    {
        id: 4,
        title: "Yogain",
        tags: ["gamefi"],
        logoUrl: "https://accelerator.oct.network/projects/Yogain.jpg",
        description: "Yogain is a well-designed web3 mobile fitness app with the Fitness2Earn concept using AR and Blockchain technology. Users are equipped with NFT Mats – to practice yoga poses and earn rewards.",
        isInstalled: false,
        linkToApp: ""
    },
    {
        id: 5,
        title: "Plats Network",
        tags: ["utility"],
        logoUrl: "https://accelerator.oct.network/projects/PlatsNetwork.jpg",
        description: "Plats Network is a community-owned Web3 Marketing Platform for global users, influencers, and all businesses with three main products: Client Web Service, Referrer Web Service and User Mobile App. Our mission is to expose public users and mainstream influencers to the blockchain industry, provide traditional businesses maximum support of technology, and dispense values directly to targeted users. Plats Network provides both crypto and non-crypto clients an user-friendly web3 tools and libraries for to create and manage their own marketing campaigns.",
        isInstalled: false,
        linkToApp: ""
    },
    {
        id: 6,
        title: "Fusotao",
        tags: ["defi", "utility"],
        logoUrl: "https://accelerator.oct.network/projects/fusotao.svg",
        description: "Fusotao Protocol is DEX infrastructure for building DEXs with trading privacy, minimal gas fees, and lower trading costs.",
        isInstalled: false,
        linkToApp: ""
    }
];


function DappStore() {

    let history = useHistory();
    const contextRef = createRef()
    const { currentAccount } = useSubstrateState()
    const accountAddr = currentAccount.address;
    console.log(accountAddr)

    const [dappList, setDappList] = useState(dappListFake);

    useEffect(() => {
        readStorageAndUpdateState()
    }, [accountAddr]);

    async function installDapp(currentAccount, itemIndex) {
        if (dappList[itemIndex].isInstalled === true) {
            console.log(dappList[itemIndex])

            return history.push("/dapp/" + dappList[itemIndex].linkToDapp);
        }
        // Construct
        const wsProvider = new WsProvider('ws://127.0.0.1:9944');
        // const keyring = new Keyring({ type: 'sr25519' });
        //const alice = keyring.addFromUri('//Alice');

        //console.log(alice)
        const api = await ApiPromise.create({ provider: wsProvider });

        try {
            const submitExtrinsic = api.tx.dappStoreModule.installDapp(dappList[itemIndex].id);
            submitExtrinsic.signAndSend(currentAccount);
            let newList = [
                ...dappList
            ]
            newList[itemIndex].isInstalled = true;
            setDappList(newList);
        }
        catch (error) {
            console.log(error);
        }
    }

    async function readStorageAndUpdateState() {
        const wsProvider = new WsProvider('ws://127.0.0.1:9944');
        const api = await ApiPromise.create({ provider: wsProvider });

        // Retrieve the last block header, extracting the hash and parentHash
        const { hash, parentHash } = await api.rpc.chain.getHeader();

        console.log(`last header hash ${hash.toHex()}`);

        // Retrieve the balance at the preceding block for Alice using an at api
        const apiAt = await api.at(parentHash);
        const dappIdList = await apiAt.query.dappStoreModule.dappIdList();
        const dappsInstalled = await apiAt.query.dappStoreModule.dappsInstalled(accountAddr);
        let dappListConverted = [];

        for (let i = 0; i < dappIdList.length; i++) {
            let item = await apiAt.query.dappStoreModule.dapps(dappIdList[i].toHuman());
            dappListConverted.push(item.toHuman());
        }

        for (let i = 0; i < dappsInstalled.length; i++) {
            const item = dappsInstalled[i].toString();
            console.log(item)
            console.log('start compare')
            for (let index = 0; index < dappListConverted.length; index++) {
                const element = dappListConverted[index];
                console.log(element)
                console.log(item)
                if (element.id === item) {
                    console.log('hiii')
                    dappListConverted[index].isInstalled = true;
                    break;
                }
            }
        }

        console.log(dappListConverted);

        setDappList(dappListConverted);

    }


    return (
        <Container className="store-wrap" ref={contextRef}>
            <div className='store-content'>
                <h1 className='store-title'>DApp Store</h1>
                <Grid columns={4}>
                    {dappList.map((item, index) => {
                        return (
                            <Grid.Column key={index}>
                                <Card {...item} installDapp={installDapp} currentAccount={currentAccount} itemIndex={index} />
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
