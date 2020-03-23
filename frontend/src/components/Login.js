import React from 'react';
import { reduxForm, Field } from 'redux-form';

class Login extends React.Component {
	renderError = meta => {
		console.log(meta);
		return (
			<div className="ui error message">
				<div className="header">ee</div>
			</div>
		);
	};

	onFormSubmit = formValues => {
		console.log(formValues);
	};

	render() {
		return (
			<div className="ui container" style={{ marginTop: '20px' }}>
				<form
					className="ui form"
					onSubmit={this.props.handleSubmit(this.onFormSubmit)}
				>
					<Field
						name="email"
						placeholder="Enter e-mail."
						label="Email"
						type="text"
						desc="Label for email."
						component={renderInput}
					/>
					<Field
						name="password"
						type="password"
						placeholder="Enter Password."
						component={renderInput}
					/>
					<button type="submit" className="ui button primary">
						Submit
					</button>
				</form>
				{}
			</div>
		);
	}
}
const renderInput = ({ input, placeholder, type, meta, label, desc }) => {
	const className = meta.error ? 'field error' : 'field';
	return (
		<div className={className}>
			<label htmlFor={desc}>{label}</label>
			<input {...input} placeholder={placeholder} type={type} />
			<div>{meta.error}</div>
		</div>
	);
};

const validate = formValues => {
	const errors = {};

	if (!formValues.email) {
		errors.email = 'Enter a valid email';
	}
	if (!formValues.password) {
		errors.password = 'Password cant be empty';
	}
	return errors;
};

export default reduxForm({ form: 'loginForm', validate })(Login);
