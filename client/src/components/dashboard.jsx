import React from 'react'

import ProfileContainer from './dashboard/profileContainer'
import TopGames from './dashboard/topGames'
import DedicationScore from './dashboard/dedicationScore'
import Screenshot from './bg_screenshot/screenshot';

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
        <Screenshot />
			</div>
		)
	}
}

export default Dashboard