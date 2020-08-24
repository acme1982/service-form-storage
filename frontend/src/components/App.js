import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { loadUser } from '../actions/authActions';
import { connect } from 'react-redux';
import AppNavBar from './AppNavBar';

class App extends React.Component {
	componentDidMount = () => {
		this.props.loadUser();
	};
	render() {
		return (
			<div>
				<AppNavBar />
			</div>
		);
	}
}

export default connect(null, { loadUser })(App);
