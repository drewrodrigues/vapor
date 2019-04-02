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
		const { avatarUrl, name, ownedGames, username } = this.props
		if (!ownedGames || !name) return null

		return (
			<>
				<h3>{ name } | { username }</h3>
				<img src={ avatarUrl } className="dashboard-avatar"/>

				{ownedGames.map(game => (
					<img src={ game.image_url } alt={`${game.name} icon`} />
				))}
			</>
		)
	}
}

export default Dashboard