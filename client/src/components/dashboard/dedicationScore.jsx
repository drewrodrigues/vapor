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
        <h2 className="dashboard-subtitle">
          <i class="fas fa-bolt"></i>
          Dedication Score
        </h2>
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
          <p className="dashboard-dedication-score-title">Dedication Score: {dedicationScore
          } &nbsp; <i class="fas fa-info-circle">
            <span class="dedication-score-info-text">Dedication score is a reflection of how dedicated a user is to their played games. It is an aggregate of total hours played vs. average hours played and achievements unlocked vs total achievements, for every game in your library (with over 9 hours played).</span>
          </i></p>
          <DedicationScoreGraph 
            playTimeScore={Math.floor(50 * totalHoursPlayed / totalAvgPlayed) || 0}
            achievementScore={Math.floor(50 * totalAchieved / totalAchievements) || 0}
            />
      </section>
    </>)} else {return (<section>Please have some games brah.</section>)}
}

export default DedicationScore;