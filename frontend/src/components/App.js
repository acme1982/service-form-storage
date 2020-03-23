import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import history from '../config/history';

import Services from './Services';
import Login from './Login';

class App extends Component {
	render() {
		return (
			<Router history={history}>
				<Switch>
					<Route path="/" exact component={Services} />
					<Route path="/login" exact component={Login} />
				</Switch>
			</Router>
		);
	}
}

export default App;
