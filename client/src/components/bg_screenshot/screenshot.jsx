import React from 'react';
import { connect } from 'react-redux';

const Screenshot = ({ screenshots }) => {
  const randScreenshot = screenshots[Math.floor(Math.random() * screenshots.length)];
  const imageId = randScreenshot.image_id;

  return (
    <div className="bg-screenshot">
      <img src={`https://images.igdb.com/igdb/image/upload/t_1080p/${imageId}.jpg`} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    screenshot: Object.values(state.entities.game.screenshots)
  };
};

export default connect(mapStateToProps, null)(Screenshot);