import React from 'react';
import { connect } from 'react-redux';
import Searchbar from './search/searchbar';
import Screenshot from './bg_screenshot/screenshot';

const Landing = ({ backgroundFetched }) => (
  <>
    {backgroundFetched ? <Screenshot /> : null }
    <h2>Landing</h2>
    <Searchbar />
  </>
)

const mapStateToProps = state => {
  return {
    backgroundFetched: state.ui.backgroundFetched
  };
};

export default connect(mapStateToProps)(Landing);