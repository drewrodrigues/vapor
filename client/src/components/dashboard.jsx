import React from 'react'


class Dashboard extends React.Component {
	componentDidMount() {
		this.props.getProfile(this.props.steamId)
		this.props.getOwnedGames(this.props.steamId)
	}

	componentWillUnmount() {
		this.props.clearProfile()
	}

	render() {
		const { avatarUrl, name, ownedGames, totalTimePlayed, username } = this.props
		console.log(totalTimePlayed)
		if (!ownedGames || !name) return null

		return (
			<>
				<div class="container dashboard">
					<header class="dashboard-header clear">
						<img src={ avatarUrl } className="dashboard-avatar"/>
						<h3 className="dashboard-name">{ name } | { username }</h3>
						<p className="dashboard-timePlayed">Total time played: { totalTimePlayed } hours</p>
					</header>

					<section className="dashboard-ownedGames">
						<h4 className="dashboard-ownedGames-title">Games Owned</h4>
						{ ownedGames.map(game => (
							<img src={ game.image_url } alt={`${ game.name } icon`} className="dashboard-ownedGame" />
						))}
					</section>
				</div>
			</>
		)
	}
}

export default Dashboard