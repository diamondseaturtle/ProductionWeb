import React, { Component } from "react";
import classnames from "classnames";
import GridComponent from "./GridComponent";
import WarningMessage from "../WarningMessage";
import GreyBox from "../../images/GreyBox.svg";
import styles from "./grid.module.css";
import CONSTANTS from "../../constants";
import Chart from "react-google-charts";

var graphData = [
  ['State', 'Confirmed Cases'],
  
];
export default class COVID19 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridTextAssets: [{ description: "", header: "", id: 0 }],
      WarningMessageOpen: false,
      WarningMessageText: ""
    };

    this.handleWarningClose = this.handleWarningClose.bind(this);
  }


  // Get the text sample data from the back end
  componentDidMount() {
    fetch("https://covidtracking.com/api/v1/states/current.json")
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        for (var i = 0; i < data.length; i++) {
          graphData.push([data[i].state, data[i].positive]);
        }
        return data;
      })
      .then(result => this.setState({ gridTextAssets: result }))
      .catch(error =>
        this.setState({
          WarningMessageOpen: true,
          WarningMessageText: `Request to get grid text failed: ${error}`
        })
      );
  }

  handleWarningClose() {
    this.setState({
      WarningMessageOpen: false,
      WarningMessageText: ""
    });
  }

  render() {
    const {
      gridTextAssets,
      WarningMessageOpen,
      WarningMessageText
    } = this.state;
    return (
      <main id="mainContent">
        <div className={classnames("text-center", styles.header)}>
          <h1>COVID19 Tracking</h1>
          

        </div>

        <div className="container">
          <div className="row justify-content-center py-5">
            <h1></h1>

            
          </div>
        </div>
        
        <div style={{ display: 'flex', maxWidth: 900 }}>
          <Chart
            width={'2000px'}
            height={'1200px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={graphData}
            options={{
              title: 'Today: US Confirmed Cases',
            }}
            rootProps={{ 'data-testid': '1' }}
          />
        </div>
        <WarningMessage
          open={WarningMessageOpen}
          text={WarningMessageText}
          onWarningClose={this.handleWarningClose}
        />
      </main>
    );
  }
}
