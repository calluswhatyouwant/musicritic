/* @flow */

import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';

import SearchInput from '../search/SearchInput';

type Props = {
    history: any,
};

class Navbar extends Component<Props> {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch = (query: string) => {
        this.props.history.push(`/search/tracks/${query}`);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark color-navbar">
                <div className="container">
                    <NavbarLink href="/" text="Musicritic" brand />
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#navbar"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="form-inline search">
                        <SearchInput handleSearch={this.handleSearch} />
                    </div>
                    <div
                      className="navbar-collapse justify-content-stretch"
                      id="navbar"
                    >
                        <ul className="navbar-nav ml-auto">
                            <NavbarItem text="Home" href="/home" />
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

type NavbarItemProps = {
    text: string,
    href: string,
};

const NavbarItem = ({ href, text }: NavbarItemProps) => (
    <li className="nav-item">
        <NavbarLink href={href} text={text} />
    </li>
);

type NavbarLinkProps = {
    text: string,
    href: string,
    brand?: boolean,
};

const NavbarLink = ({ text, href, brand }: NavbarLinkProps) => (
    <NavLink className={brand ? 'navbar-brand brand' : 'nav-link'} to={href}>
        {text}
    </NavLink>
);

NavbarLink.defaultProps = {
    brand: false,
};

export default withRouter(Navbar);
