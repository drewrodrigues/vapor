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
    const finalPrice = game.price_overview === undefined ? 0 : game.price_overview.final

    const data = {
      labels: ["Normal Playthrough","Complete Playthrough","Hasty Playthrough", "Price $"],
      datasets: []
    };
    if (normally){
      data.datasets.push({
        data: [Math.round(this.state.normally/60/60), 0,0, Math.round(finalPrice/100)],
        backgroundColor: ["#A5E22F","","", "#F99720"],
        hoverBackgroundColor: ["#ffffff","#ffffff","#ffffff", "#ffffff", "#ffffff"],
        borderColor: '#000000'
      })
    }

    if (completely){
      data.datasets.push({
        data: [0,Math.round(this.state.completely/60/60),0, Math.round(finalPrice/100)],
        backgroundColor: ["","#98ce2d","", "#F99720"], 
        hoverBackgroundColor: ["#ffffff","#ffffff","#ffffff", "#ffffff", "#ffffff"],
        borderColor: '#000000'

      })
    }

    if (hastily){
      data.datasets.push({
        data: [0,0,Math.round(this.state.hastily/60/60), Math.round(finalPrice/100)],
        backgroundColor: ["","","#8bbc29", "#F99720"],
        hoverBackgroundColor: ["#ffffff","#ffffff","#ffffff", "#ffffff", "#ffffff"],
        borderColor: '#000000'

      })
    }

    const timePlayed = normally || completely || hastily;
    const score = finalPrice ? `${Math.round((timePlayed/60/60)/(finalPrice/100))} hrs/$` : "Free game, give it a try!"

    return timePlayed ? (
      <div className="ttb-wrapper">
        <div className="landing-item-title">
          <p className="landing-ttb-score-title">Worth Score: {score} &nbsp; <i className="fas fa-info-circle">
            <span className="ttb-score-info-text">Worth Score is a representation of how much game play you can get from a dollar spent, it is hours (of gameplay) to dollars in a 1:1 ratio.</span>
          </i></p>
          <div className="underlined"></div>
        </div>
        <Pie data={data} width={100} height={20} legend={{display: false}} />
      </div>
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
