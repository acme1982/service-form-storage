import React, { Component, Fragment } from 'react';
import { logout } from '../actions/authActions';
import { connect } from 'react-redux';
import { NavLink } from 'reactstrap';

class Logout extends Component {
	handleOnClick = () => {
		this.props.logout();
	};
	render() {
		return (
			<NavLink href="#" onClick={this.handleOnClick}>
				Logout
			</NavLink>
		);
	}
}

export default connect(null, { logout })(Logout);
