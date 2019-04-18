import React from 'react';
import { connect } from 'react-redux';

class Screenshot extends React.Component {

  componentDidUpdate(prevProps) {
    if(this.props.screenshot && prevProps.screenshot !== this.props.screenshot){
      const bgImg = new Image();
      const bgElement = document.getElementsByClassName("bg-screenshot")[0];
      bgImg.onload = () => {
        bgElement.style.backgroundImage = 'url(' + bgImg.src + ')';
      };
      bgImg.src = this.props.screenshot;
    }
  }

  render() {
    return (
      <div className="bg-screenshot"></div>
    )
  }
}

const mapStateToProps = state => {
  const screenshots = state.entities.game.screenshots;
  return {
    screenshot: state.ui.loading.backgroundUrl,
    altName: state.entities.game.name
  };
};

export default connect(mapStateToProps, null)(Screenshot);