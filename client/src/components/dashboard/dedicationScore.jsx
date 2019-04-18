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
          <h2 className="dashboard-subtitle">
            <span className="dedication-score">{ dedicationScore }</span>
            Dedication Score
            &nbsp; <i class="fas fa-info-circle dedication-info"><span class="dedication-score-info-text">Dedication score is a reflection of how dedicated a user is to their played games. It is an aggregate of total hours played vs. average hours played and achievements unlocked vs total achievements, for every game in your library (with over 9 hours played).</span></i>
          </h2>

          <DedicationScoreGraph 
            playTimeScore={Math.floor(50 * totalHoursPlayed / totalAvgPlayed) || 0}
            achievementScore={Math.floor(50 * totalAchieved / totalAchievements) || 0}
            />
      </section>
    </>)} else {return (<section>Please have some games brah.</section>)}
}

export default DedicationScore;