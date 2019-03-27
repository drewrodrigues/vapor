import React from 'react';
import { connect } from 'react-redux';

const Screenshot = ({ screenshot, altName }) => {
  const divStyle = {
    backgroundImage:  "url(" + screenshot + ")"
  };
  return (
    <div className="bg-screenshot" style={divStyle}>
      {/* <img src={screenshot}
           alt={altName} /> */}
    </div>
  )
}

const mapStateToProps = state => {
  const screenshots = state.entities.game.screenshots;
  return {
    screenshot: state.ui.background.url,
    altName: state.entities.game.name
  };
};

export default connect(mapStateToProps, null)(Screenshot);