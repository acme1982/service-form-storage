import React from 'react';
import { fetchServices } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import '../styles/services.css';

class Services extends React.Component {
	componentDidMount() {
		this.props.fetchServices();
	}
	// Render a list with all Services. Also calculate days since it was posted.
	renderList = () => {
		return _.map(this.props.services, service => {
			const dateModified = new Date(service.date);
			const today = new Date();
			const daysAfter = today.getDate() - dateModified.getDate();
			return (
				<div
					style={{ width: '250px', marginTop: '10px' }}
					key={service._id}
					className="ui raised link card"
				>
					<div className="content">
						<div className="header">{service.title}</div>
						<div className="meta">
							<span className="category">{daysAfter} days.</span>
						</div>
						<div className="description">
							<p>{service.mileage}</p>
						</div>
					</div>
				</div>
			);
		});
	};

	render() {
		if (!this.props.services) {
			return <div>Loading...</div>;
		}
		return <div className="service-list">{this.renderList()}</div>;
	}
}

const mapStateToProps = state => {
	return { services: state.services };
};

export default connect(mapStateToProps, { fetchServices })(Services);
