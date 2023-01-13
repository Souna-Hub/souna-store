import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {
    Link
} from "react-router-dom";
import {
    Sticky,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import "./menu.css"

import AccountSelector from '../../AccountSelector'

export default class MenuExampleSecondary extends Component {
    state = { activeItem: 'home' }


    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <div>
                <Menu className='menu' secondary>
                    <Menu.Item
                        as={Link}
                        name='home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                        to="/"
                    />
                    <Menu.Item
                        as={Link}
                        name='store'
                        active={activeItem === 'store'}
                        onClick={this.handleItemClick}
                        to="/store"
                    />
                    <Menu.Item
                        as={Link}
                        name='deploy'
                        active={activeItem === 'deploy'}
                        onClick={this.handleItemClick}
                        to="/deploy"
                    />
                    <Sticky context={this.props.contextRef}>
                        <AccountSelector />
                    </Sticky>
                </Menu>
            </div>
        )
    }
}
