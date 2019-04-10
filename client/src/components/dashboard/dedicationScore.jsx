import React from 'react';
import DedicationScoreGraph from './dedication_score_graph';

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
              if (game.playtime_forever > 599) {
                totalHoursPlayed += game.playtime_forever;
                totalAvgPlayed += game.avgTimePlayed;
                totalAchievements += game.totalAchievements;
                totalAchieved += game.completedAchievements;
              }
            }

          dedicationScore = Math.floor((50 * totalHoursPlayed / totalAvgPlayed) + (50 * totalAchieved / totalAchievements));
          })
        }
          <DedicationScoreGraph 
            playTimeScore={Math.floor(50 * totalHoursPlayed / totalAvgPlayed)}
            achievementScore={Math.floor(50 * totalAchieved / totalAchievements)}
            />
        Total Gametime Hours Played: {Math.floor(totalHoursPlayed / 60)}  |  Earned Achievements: {totalAchieved}  <br></br>
          Dedication Score: <b>{dedicationScore}</b>
      </section>
    </>)} else {return (<section>Please have some games brah.</section>)}
}

export default DedicationScore;