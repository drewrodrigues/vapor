import React from 'react';
import { connect } from 'react-redux';
import Searchbar from './search/searchbar';
import Screenshot from './bg_screenshot/screenshot';

const Landing = ({ backgroundBool }) => (
  <>
    {backgroundBool ? <Screenshot /> : null}
    <h2>Landing</h2>
    <Searchbar />
  </>
)

const mapStateToProps = state => {
  return {
    backgroundBool: state.entities.game.screenshots
  };
};

export default connect(mapStateToProps)(Landing);