import React from 'react';
import { connect } from 'react-redux';

const Screenshot = ({ screenshot, altName }) => {
  return (
    <div className="bg-screenshot">
      <img src={screenshot}
           alt={altName} />
    </div>
  )
}

const mapStateToProps = state => {
  const screenshots = state.entities.game.screenshots;
  return {
    screenshot: screenshots[Math.floor(Math.random() * screenshots.length)].path_full,
    altName: state.entities.game.name
  };
};

export default connect(mapStateToProps, null)(Screenshot);