import React from 'react'

const Profile = ({ avatarUrl, name, totalTimePlayed, username }) => {
  const timePlayed = totalTimePlayed != 0 ? <>
    <p className="dashboard-timePlayed">Total time played: { totalTimePlayed } hours</p>
  </> : null
  
  return name ? <>
    <header class="dashboard-header clear">
      <img src={ avatarUrl } className="dashboard-avatar"/>
      <h3 className="dashboard-name">{ name } | { username }</h3>
      { timePlayed }
    </header>
  </> : null
}

export default Profile