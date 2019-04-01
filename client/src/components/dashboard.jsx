import React from 'react'


class Dashboard extends React.Component {
	componentDidMount() {
		this.props.getProfile(this.props.steamId)
	}

	componentWillUnmount() {
		this.props.clearProfile()
	}

	render() {
		const { avatarUrl, name, username } = this.props
		return (
			<>
				<h3>{ name } | { username }</h3>
				<img src={ avatarUrl } className="dashboard-avatar"/>
			</>
		)
	}
}

export default Dashboard