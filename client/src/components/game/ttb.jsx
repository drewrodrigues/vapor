import React from "react";
import { Pie } from "react-chartjs-2";
import { connect } from "react-redux";
import { getTTB } from "../../actions/gamesActions";

class TTB extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      normally: null,
      completely: null,
      hastily: null
    };
  }
  componentDidMount() {
    this.props
      .getTTB(this.props.game.igdb_id)
      .then(res => this.setState(res.game));
  }
  render() {
    const { normally, completely, hastily } = this.state
    const { game } = this.props;
    const final_price = game.price_overview === undefined ? 0 : game.price_overview.final


    const data = {
      labels: ["Normal Playthrough","Complete Playthrough","Hasty Playthrough", "Price"],
      datasets: []
    };
    if (normally){
      data.datasets.push({
        data: [Math.round(this.state.normally/60/60), 0,0, Math.round(final_price/100)],
        backgroundColor: ["#137500","","", "#d1004c"],
        hoverBackgroundColor: ["#ffffff","#ffffff","#ffffff", "#ffffff", "#ffffff"],
        borderColor: '#000000'
      })
    }

    if (completely){
      data.datasets.push({
        data: [0,Math.round(this.state.completely/60/60),0, Math.round(final_price/100)],
        backgroundColor: ["","#1fbf00","", "#d1004c"],
        hoverBackgroundColor: ["#ffffff","#ffffff","#ffffff", "#ffffff", "#ffffff"],
        borderColor: '#000000'

      })
    }

    if (hastily){
      data.datasets.push({
        data: [0,0,Math.round(this.state.hastily/60/60), Math.round(final_price/100)],
        backgroundColor: ["","","#137500", "#d1004c"],
        hoverBackgroundColor: ["#ffffff","#ffffff","#ffffff", "#ffffff", "#ffffff"],
        borderColor: '#000000'

      })
    }



    return normally || completely || hastily ? (
      <Pie data={data} width={100} height={20} legend={{display: false}} />
    ) : null;
  }
}

const mSP = state => ({
  price: state.entities.game.price_overview,
  ttb: state.entities.game
});
const mDP = dispatch => ({
  getTTB: id => dispatch(getTTB(id))
});

export default connect(
  mSP,
  mDP
)(TTB);
