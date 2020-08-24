import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import LoginForm from './LoginForm';
import Logout from './Logout';
import ListServices from '../components/services/ListServices';

import {
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Collapse,
	Nav,
	NavItem,
	NavLink,
	Container,
	NavbarText,
} from 'reactstrap';

class AppNavBar extends Component {
	state = {
		isOpen: false,
		username: '',
	};
	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	};
	userLinks = (
		<Fragment>
			<NavItem>
				<Logout />
			</NavItem>
		</Fragment>
	);

	guestLinks = (
		<Fragment>
			<NavItem>
				<LoginForm />
			</NavItem>
		</Fragment>
	);

	render() {
		return (
			<div>
				<Navbar color="dark" dark expand="sm" className="mb-5">
					<Container>
						<NavbarBrand href="/">HD Service book</NavbarBrand>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								<NavbarText className="text-primary">
									{this.props.auth.isAuthenticated
										? `Welcome Back ${this.props.auth.user.username}`
										: 'Hello, Guest'}
								</NavbarText>
								{this.props.auth.isAuthenticated
									? this.userLinks
									: this.guestLinks}
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};
export default connect(mapStateToProps)(AppNavBar);
