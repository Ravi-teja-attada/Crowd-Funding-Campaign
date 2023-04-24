import React from "react";
import { Menu } from "semantic-ui-react";

function Header() {
    return <Menu style={{marginTop:'2rem'}}>
    <Menu.Item >CrowdCoin</Menu.Item>
    <Menu.Menu position="right">
        <Menu.Item>campaigns</Menu.Item>
        <Menu.Item>+</Menu.Item>
    </Menu.Menu>
    </Menu>
}

export default Header;