import React from 'react'


class Dashboard extends React.Component {
	componentDidMount() {
		this.props.getProfile(this.props.steamId)
	}

	componentWillUnmount() {
		this.props.clearProfile()
	}

	render() {
		return (
			<h3>Dashboard</h3>
		)
	}
}

export default Dashboard