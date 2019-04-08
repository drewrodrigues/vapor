import React from 'react';

const DedicationScore = ({ games }) => {
  let totalHoursPlayed = 0;
  let totalAvgPlayed = 0;
  let totalAchievements = 0;
  let totalAchieved = 0;
  let dedicationScore;

  if (games) {
    return (
      <>
      <section className="dashboard-dedication-score">
        {
          games.forEach(game => {
            if (game.completedAchievements === "error") {

            } else {
              totalHoursPlayed += game.playtime_forever;
              totalAvgPlayed += game.avgTimePlayed;
              totalAchievements += game.totalAchievements;
              totalAchieved += game.completedAchievements;
            }

          dedicationScore = Math.floor((50 * totalHoursPlayed / totalAvgPlayed) + (50 * totalAchieved / totalAchievements));
          })
        }
        Dedication Score: {dedicationScore}
      </section>
    </>)} else {return (<section>Please have some games brah.</section>)}
}

export default DedicationScore;