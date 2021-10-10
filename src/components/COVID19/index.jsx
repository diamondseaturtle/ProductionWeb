import React, { Component } from "react";
import classnames from "classnames";
import WarningMessage from "../WarningMessage";
import styles from "./grid.module.css";
import Chart from "react-google-charts";

var lineData = [];
var dailyCase = [];
var usDailyCase = [];

//COVID-19 API endpoint
const covidApiUrl = "https://api.covid19tracking.narrativa.com/api";

//Helper to return today's date in format of yyyy-mm-dd
function getDateStringFromNow(daysFromNow = 0)
{
  var today = new Date();
  var date = new Date(new Date().setDate(today.getDate() + daysFromNow));

  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = date.getFullYear();
  var returnDate = yyyy + '-' + mm + '-' + dd;

  return returnDate;
}

function getDateFromNow(daysFromNow = 0)
{
  var today = new Date();
  var date = new Date(new Date().setDate(today.getDate() + daysFromNow));
  return date;
}

export default class COVID19 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      USData: this.props.defaulData,
      WAData: [],
      IsLoading: true,
      WarningMessageOpen: false,
      WarningMessageText: ""
    };

    this.handleWarningClose = this.handleWarningClose.bind(this);
  }

  // Get the text sample data from the back end
  componentDidMount() {

    var today = getDateStringFromNow();
    var prior30d = getDateStringFromNow(-60);
    var us_url = covidApiUrl + '/' + today + "/country/us";
    var wa_url = covidApiUrl + "/country/us/region/washington?date_from=" + prior30d + "&date_to=" + today;

    Promise.all([
      fetch(us_url).then(res => res.json()),
      fetch(wa_url).then(res => res.json())])
      .then(([usData, waData]) => {
        this.setState({
            USData: usData.dates[today].countries.US,
            WAData: waData.dates,
            IsLoading: false
          });
      })
      .catch(error =>
          this.setState({
            WarningMessageOpen: true,
            WarningMessageText: `Request to get COVID19 data failed: ${error}`
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

    if (this.state.IsLoading)
    {
      return (
        <main id="mainError">
        <div className={classnames("text-center", styles.header)}>
          <h1>Loading data, please wait...</h1>
        </div>
        </main>);
    }

    var us = this.state.USData;
    var status = {positive:"", death:"", date:""};
    // US case summary
    status.positive = us.today_confirmed.toLocaleString(
      undefined, // leave undefined to use the browser's locale,
                  // or use a string like 'en-US' to override it.
      { minimumFractionDigits: 0 }
    );
    status.death = us.today_deaths.toLocaleString(
      undefined, // leave undefined to use the browser's locale,
                  // or use a string like 'en-US' to override it.
      { minimumFractionDigits: 0 }
    );
    status.date = getDateStringFromNow();
    
    // get per state/region data
    var regions = us.regions;
    var graphData = [
      ['State', 'Confirmed Cases', 'Total Deaths'],          
    ];
    for (var i = 0; i < regions.length; i++) {
      graphData.push([regions[i].name, regions[i].today_confirmed, regions[i].today_deaths]);
    }

    // WA state data

    lineData = [
      ['Date', 'Confirmed Cases', 'Death'],          
    ];
    dailyCase = [
      ['Date', 'Confirmed Cases', 'Death'],          
    ];
    usDailyCase = [
      ['Date', 'Confirmed Cases', 'Death'],          
    ];
    
    for (var j = 0 ; j < 61; j++) {          
      var d = getDateStringFromNow(-60 + j);
      var unitedStates = this.state.WAData[d].countries.US
      var confirmed = unitedStates.regions[0].today_confirmed;
      var deaths = unitedStates.regions[0].today_deaths;
      var newConfirmed = unitedStates.regions[0].today_new_confirmed;
      var newDeaths = unitedStates.regions[0].today_new_deaths;
      var date = getDateFromNow(-60 + j);

      lineData.push([date, confirmed, deaths]);
      dailyCase.push([date, newConfirmed, newDeaths]);
      usDailyCase.push([date, unitedStates.today_new_confirmed, unitedStates.today_new_deaths]);
    }
    
    return (
      <main id="mainContent">
        <div className={classnames("text-center", styles.header)}>
          <h1>US and Washington State COVID-19 Interactive Dashboard</h1>
          <h2>As of {status.date}, US total postive cases: {status.positive}, total deaths: {status.death}</h2>
          <a href="https://covid19tracking.narrativa.com/index_en.html">Data source: COVID19 tracking project</a>
        </div>

        <div className="row justify-content-center py-5" style={{ display: 'flex', maxWidth: 2000, maxHeight: 2000 }}>
          <h2>US COVID-19 Case Distribution</h2>
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
            chartWrapperParams={{ view: { columns: [0, 1]} }}
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

        <div className="row justify-content-center py-5" style={{ display: 'flex', maxWidth: 2000, maxHeight: 2000 }}>
          <h2>US COVID-19 Deaths Distribution</h2>
        </div>
        <div id="pie_chart" style={{ display: 'flex', maxWidth: 4000 }}>
          <Chart
            width={'2000px'}
            height={'1200px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={graphData}
            options={{
              title: 'Total Deaths By States'
            }}
            rootProps={{ 'data-testid': '9' }}
            chartWrapperParams={{ view: { columns: [0, 2]} }}
            chartPackages={['corechart', 'controls']}
            controls={[
              {
                controlType: 'NumberRangeFilter',
                options: {
                  filterColumnIndex: 2,
                  ui: {
                    label: "Filter by # of deaths",
                    unitIncrement: 100,
                    blockIncrement: 1000,
                  },
                },
              },
            ]}
          />
        </div>  

        <div className="row justify-content-center py-5" style={{ display: 'flex', maxWidth: 2000, maxHeight: 2000 }}>
            <h2>COVID-19 US Geographic View</h2>    
        </div>
        <div id="state_geo_chart" style={{ display: 'flex', maxWidth: 2000 }}>
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
        
        <div className="row justify-content-center py-5" style={{ display: 'flex', maxWidth: 2000, maxHeight: 2000 }}>
            <h2>United States 60 Days History</h2>    
        </div>
        <div id="us_daily_chart" style={{ display: 'flex', maxWidth: 2000, maxHeight: 2000}}>
          <Chart
            width={'100%'}
            height={'100%'}
            chartType="LineChart"
            loader={<div>Loading Column Chart</div>}
            data={usDailyCase}
            options={{
              title: 'United States 60 Days History: Daily New Cases and Deaths',
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
        
        <div className="row justify-content-center py-5" style={{ display: 'flex', maxWidth: 2000, maxHeight: 2000 }}>
            <h2>COVID-19 Washington State Tracking</h2>    
        </div>
        <div id="wa_line_chart" style={{ display: 'flex', maxWidth: 2000, maxHeight: 2000 }}>
          <Chart
            width={'100%'}
            height={'100%'}
            chartType="LineChart"
            loader={<div>Loading Line Chart</div>}
            data={lineData}
            options={{
              title: 'Washington State 60 Days History: Total Confirmed Cases and Deaths',
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
        <div id="wa_daily_chart" style={{ display: 'flex', maxWidth: 2000, maxHeight: 2000}}>
          <Chart
            width={'100%'}
            height={'100%'}
            chartType="ColumnChart"
            loader={<div>Loading Column Chart</div>}
            data={dailyCase}
            options={{
              title: 'Washington State 60 Days History: Daily New Cases and Deaths',
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
