import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { attemptLogin } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	Form,
	FormGroup,
	Label,
	Input,
	Alert,
	ModalFooter,
	NavLink,
} from 'reactstrap';

class LoginForm extends Component {
	state = {
		modal: false,
		email: '',
		password: '',
		error: '',
	};

	componentDidUpdate = (prevProps) => {
		const {
			errMsg,
			auth: { isAuthenticated },
		} = this.props;

		//Check if this us Login error.
		if (
			errMsg.id === 'LOGIN_ERROR' &&
			errMsg.message !== prevProps.errMsg.message
		) {
			this.setState({
				error: errMsg.message,
			});
		}

		// If user is authenticated close Modal.
		if (this.state.modal) {
			if (isAuthenticated) {
				this.toggle();
			}
		}
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal,
		});
		this.props.clearErrors();
		this.setState({
			email: '',
			password: '',
			error: '',
		});
	};

	onFormSubmit = (e) => {
		e.preventDefault();
		const { email, password } = this.state;
		const user = {
			email,
			password,
		};
		this.props.attemptLogin(user);
	};
	handleOnChange = (e) => {
		this.props.clearErrors();
		this.setState({
			[e.target.name]: e.target.value,
			error: '',
		});
	};
	render() {
		return (
			<Fragment>
				<NavLink href="#" onClick={this.toggle}>
					Login
				</NavLink>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader>Login Form</ModalHeader>
					<ModalBody>
						{this.state.error ? (
							<Alert color="danger">{this.state.error}</Alert>
						) : null}
						<Form onSubmit={this.onFormSubmit}>
							<FormGroup>
								<Label>Email</Label>
								<Input
									name="email"
									value={this.state.email}
									type="email"
									placeholder="Email"
									onChange={this.handleOnChange}
								/>
							</FormGroup>
							<FormGroup>
								<Label>Password</Label>
								<Input
									name="password"
									value={this.state.password}
									type="password"
									placeholder="Password"
									onChange={this.handleOnChange}
								/>
							</FormGroup>
							<ModalFooter>
								<Button className="float-left" type="submit" color="primary">
									Submit
								</Button>
								<Button color="secondary" onClick={this.toggle}>
									Cancel
								</Button>
							</ModalFooter>
						</Form>
					</ModalBody>
				</Modal>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		errMsg: state.error,
		auth: state.auth,
	};
};

LoginForm.propTypes = {
	user: PropTypes.shape({
		email: PropTypes.string,
		password: PropTypes.string,
	}),
};

export default connect(mapStateToProps, { attemptLogin, clearErrors })(
	LoginForm
);
