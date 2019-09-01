import React from 'react';
import axios from 'axios';
import moment from 'moment';

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = { 
			loading: true,
			counter: 0,
			profile: {
				name: null,
				age: null,
				picture: null
			}
		};
	}

	
	componentDidMount() {
		this.getProfile();
	}

	getProfile() {
		this.setState((state) => { 
			return {loading: true}
		});


		axios.get('https://randomuser.me/api/')
			.then(res => {
				let profile = res.data.results[0];
				this.setState((state) => { 
					return {
						profile: {
							name: profile.name.first + ' ' + profile.name.last,
							age: this.calculateAgeFromDob(profile.dob.date),
							picture: profile.picture.large
						},
						loading: false
					}
				});
			})
		;
	}

	calculateAgeFromDob(dob) {
		return moment().diff(dob, 'years', false);
	}

	handleNoClick() {
		this.getProfile();
	}

	handleYesClick() {
		this.setState((state) => {
			return {counter: state.counter + 1}
		});

		this.getProfile();
	}


	render() {
		let disableYes = (this.state.loading || this.state.counter >= 5);

		return (
			<div className="app">

				<div className="app-header">
					<span className="app-header__title">Gender Neutral Dating App</span>
					<span className={"app-header__counter " + (this.state.counter >= 5 ? 'max' : '')}>{this.state.counter}</span>
				</div>

				<div className="app-content">
					<div className={"app-content__loader " + (this.state.loading ? 'active' : '')}>
						<span>Loading...</span>
					</div>
					<div className={"app-content__profile " + (this.state.loading ? 'hidden' : '')}>
						<div className="app-content__profile-image">
							<img src={this.state.profile.picture} alt=""/>
						</div>
						<div className="app-content__profile-name">
							{this.state.profile.name}
						</div>
						<div className="app-content__profile-age">
							({this.state.profile.age})
						</div>
					</div>
					
				</div>

				<div className="app-action">
					<div className={"app-action__no " + (this.state.loading ? 'disabled' : '')} onClick={this.handleNoClick.bind(this)}>
						<span>No</span>
					</div>
					<div className={"app-action__yes " + (disableYes ? 'disabled' : '')} onClick={(!disableYes ? this.handleYesClick.bind(this) : undefined)}>
						<span>Yes</span>
					</div>
				</div>

			</div>
		);
	}	
}

export default App;
