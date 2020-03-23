<div className="ui middle aligned center aligned grid">
	<div className="column">
		<h2 className="ui teal image header">
			<img alt="HD icon" src="HD.jpg" className="image" />
			<div className="content">Log-in to your account</div>
		</h2>
		<form
			className="ui large form"
			onSubmit={this.props.handleSubmit(this.onFormSubmit)}
		>
			<div className="ui stacked segment">
				<div className="field">
					<div className="ui left icon input">
						<i className="user icon"></i>
						<Field
							name="email"
							type="text"
							component={this.renderInput}
							placeholder="E-mail address."
						/>
					</div>
				</div>
				<div className="field">
					<div className="ui left icon input">
						<i className="lock icon"></i>
						<Field
							name="password"
							component={this.renderInput}
							placeholder="Password"
							type="password"
						/>
					</div>
				</div>
				<button type="submit" className="ui fluid large teal submit button">
					Submit
				</button>
			</div>
			<div className="ui error message"></div>
		</form>
	</div>
</div>;
