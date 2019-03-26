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
      labels: ["Normal","Complete","Hastily", "Price"],
      datasets: []
    };
    if (normally){
      data.datasets.push({
        data: [Math.round(this.state.normally/60/60), 0,0, Math.round(final_price/100)],
        backgroundColor: ["#FF6384","#FF6384","#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384",,"#FF6384","#FF6384", "#36A2EB", "#FFCE56"]
      })
    }

    if (completely){
      data.datasets.push({
        data: [0,Math.round(this.state.completely/60/60),0, Math.round(final_price/100)],
        backgroundColor: ["#FF6384","#FF6384","#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384","#FF6384","#FF6384", "#36A2EB", "#FFCE56"]
      })
    }

    if (hastily){
      data.datasets.push({
        data: [0,0,Math.round(this.state.hastily/60/60), Math.round(final_price/100)],
        backgroundColor: ["#FF6384","#FF6384","#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384","#FF6384","#FF6384", "#36A2EB", "#FFCE56"]
      })
    }



    return normally || completely || hastily ? (
      <Pie data={data} width={100} height={20} />
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
