import React from 'react'

import Profile from './dashboard/profile'
import TopGames from './dashboard/topGames'
import DedicationScore from './dashboard/dedicationScore'

class Dashboard extends React.Component {
	componentDidMount() {
		this.props.getProfile(this.props.steamId)
		this.props.getOwnedGames(this.props.steamId)
	}

	componentWillUnmount() {
		this.props.clearProfile()
	}

	render() {
		const { avatarUrl, name, topGames, totalTimePlayed, username } = this.props

		return (
			<div class="container dashboard">
				<Profile 
					avatarUrl={ avatarUrl } 
					name={ name } 
					totalTimePlayed={ totalTimePlayed } 
					username={ username } />

				<TopGames games={ topGames } />
				<DedicationScore games={ topGames } /> 
			</div>
		)
	}
}

export default Dashboard