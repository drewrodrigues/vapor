import React from 'react'

import ProfileContainer from './dashboard/profileContainer'
import TopGames from './dashboard/topGames'
import DedicationScore from './dashboard/dedicationScore'

class Dashboard extends React.Component {
	componentDidMount() {
		this.props.getOwnedGames(this.props.steamId)
	}

	render() {
		const { topGames } = this.props

		return (
			<div className="container dashboard">
				<ProfileContainer />
				<TopGames games={ topGames } />
				<DedicationScore games={ topGames } /> 
			</div>
		)
	}
}

export default Dashboard