import React, { Component } from "react";
import classnames from "classnames";
import WarningMessage from "../WarningMessage";
import styles from "./grid.module.css";
import Chart from "react-google-charts";

var graphData = [];
var lineData = [];
var dailyCase = [];
var status = {positive:"", death:"", date:""};
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
    fetch("https://api.covidtracking.com/v1/us/current.json")
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        status.positive = data[0].positive.toLocaleString(
          undefined, // leave undefined to use the browser's locale,
                     // or use a string like 'en-US' to override it.
          { minimumFractionDigits: 0 }
        );
        status.death = data[0].death.toLocaleString(
          undefined, // leave undefined to use the browser's locale,
                     // or use a string like 'en-US' to override it.
          { minimumFractionDigits: 0 }
        );
        status.date = data[0].date.toString();
        status.date = status.date.substr(0, 4) + "/" + status.date.substr(4,2) + "/" + status.date.substr(6,2);
        return data;
      })
      .then(result => this.setState({ gridTextAssets: result }))
      .catch(error =>
        this.setState({
          WarningMessageOpen: true,
          WarningMessageText: `Request to get grid text failed: ${error}`
        })
      );

    fetch("https://api.covidtracking.com/v1/states/current.json")
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        graphData = [
          ['State', 'Confirmed Cases'],          
        ];
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

      fetch("https://api.covidtracking.com/v1/states/wa/daily.json")
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        lineData = [
          ['Date', 'Confirmed Cases', 'Death'],          
        ];
        dailyCase = [
          ['Date', 'Confirmed Cases', 'Death'],          
        ];
        for (var i = data.length-1 ; i >= 0; i--) {          
          var dateString = data[i].date.toString();
          var year        = dateString.substr(0,4);
          var month       = dateString.substr(4,2);
          var day         = dateString.substr(6,2);
          var date        = new Date(year, month-1, day);
          

          lineData.push([date, data[i].positive, data[i].death]);
          var deltaPositive = (i === data.length-1) ? 0:(data[i].positive - data[i+1].positive);
          var deltaDeath = (i === data.length-1) ? 0:(data[i].death - data[i+1].death);
          dailyCase.push([date, deltaPositive, deltaDeath]);
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
      WarningMessageOpen,
      WarningMessageText
    } = this.state;
    return (
      <main id="mainContent">
        <div className={classnames("text-center", styles.header)}>
          <h1>US and Washington State COVID-19 Interactive Dashboard</h1>
          <h2>As of {status.date}, US total postive cases: {status.positive}, total deaths: {status.death}</h2>
          <a href="https://covidtracking.com/">Data source: COVID19 tracking project</a>
        </div>

        <div className="container">
          <div className="row justify-content-center py-5">
            <h2>US COVID-19 Case Distribution</h2>
          </div>
        </div>
        
        <div id="pie_chart" style={{ display: 'flex', maxWidth: 4000 }}>
          <Chart
            width={'2000px'}
            height={'1200px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={graphData}
            options={{
              title: 'Total Positive Cases By States'
            }}
            rootProps={{ 'data-testid': '1' }}
            chartWrapperParams={{ view: { columns: [0, 1] } }}
            chartPackages={['corechart', 'controls']}
            controls={[
              {
                controlType: 'NumberRangeFilter',
                options: {
                  filterColumnIndex: 1,
                  ui: {
                    label: "Filter by # of cases",
                    unitIncrement: 100,
                    blockIncrement: 1000,
                  },
                },
              },
            ]}
          />
        </div>  
        <div className="row justify-content-center py-5">
            <h2>COVID-19 US Geographic View</h2>    
        </div>
        <div id="state_geo_chart" style={{ display: 'flex', maxWidth: 4000 }}>
          <Chart
            width={'100%'}
            height={'100%'}
            chartType="GeoChart"
            loader={<div>Loading Geo Chart</div>}
            data={graphData}
            options={{
              region: 'US',
              resolution: 'provinces',
              displayMode: 'auto',
              colorAxis: {colors: ['white','orange','red', 'black']}
            }}
            rootProps={{ 'data-testid': '1' }}
          />
        </div>
        <div className="row justify-content-center py-5">
            <h2>COVID-19 Washington State Tracking</h2>    
        </div>
        <div id="wa_line_chart" style={{ display: 'flex', maxWidth: 4000 }}>
          <Chart
            width={'100%'}
            height={'100%'}
            chartType="LineChart"
            loader={<div>Loading Line Chart</div>}
            data={lineData}
            options={{
              title: 'Washington State COVID-19 History: Total Confirmed Cases and Deaths',
              curveType: 'function',
              legend: { position: 'bottom' },
              animation:{
                duration: 1000,
                startup: true,
              },
              hAxis: { slantedText: false},
              vAxis: { title: 'Cases', viewWindowMode: 'maximized'},
              chartArea: { height: '80%', width: '80%' },
            }}
            rootProps={{ 'data-testid': '1' }}
            
            chartPackages={['corechart', 'controls']}
            controls={[
              {
                controlType: 'ChartRangeFilter',
                options: {
                  filterColumnIndex: 0,
                  ui: {
                    chartType: 'LineChart',
                    chartOptions: {
                      chartArea: { width: '80%', height: '50%' },
                      hAxis: { baselineColor: 'red' },
                    },
                  }
                },
                controlPosition: 'bottom',
              },
            ]}
          />
        </div>
        <div id="wa_daily_chart" style={{ display: 'flex', maxWidth: 4000 }}>
          <Chart
            width={'100%'}
            height={'100%'}
            chartType="ColumnChart"
            loader={<div>Loading Column Chart</div>}
            data={dailyCase}
            options={{
              title: 'Washington State COVID-19 History: Daily New Cases and Deaths',
              animation:{
                duration: 1000,
                startup: true,
              },
              vAxis: {title: 'Cases', viewWindowMode: 'maximized'},
              chartArea: { height: '80%', width: '80%' },
            }}
            rootProps={{ 'data-testid': '1' }}
            chartPackages={['corechart', 'controls']}
            controls={[
              {
                controlType: 'ChartRangeFilter',
                options: {
                  filterColumnIndex: 0,
                  ui: {
                    chartType: 'LineChart',
                    chartOptions: {
                      chartArea: { width: '80%', height: '50%' },
                      hAxis: { baselineColor: 'red' },
                    },
                  }
                },
                controlPosition: 'bottom'
              },
            ]}
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
