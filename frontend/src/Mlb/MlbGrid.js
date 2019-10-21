import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import auth0Client from '../Auth';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import DateSelector from '../DateSelector/DateSelector';


// A grid to display mlb games. In future maybe bets below the games.
class MlbGrid extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            gridOptions: {
                columnDefs: [{
                    headerName: "Date", field: "start_date"
                }, {
                    headerName: "Home Team", field: "home"
                }, {
                    headerName: "Away Team", field: "away"
                }, {
                    headerName: "Runs (Home)", field: "home_runs"
                }, {
                    headerName: "Runs (Away)", field: "away_runs"
                }],
                rowData: null,
            },
            start_date: '2019-10-14'
        }
    }

    async componentDidMount() {
        this.updateRowData();
    }

    async updateRowData() {
        if(this.api) {
            this.api.showLoadingOverlay();
        }
        const rowData = (await axios.get('http://localhost:8081/mlb/games/', {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` },
            params: { 'start_date': this.state.start_date }
        })).data.games;
        this.setState({
            rowData,
        });
        if(!this.api) return;
        if(rowData.length < 1) {
            this.api.showNoRowsOverlay();
            return;
        }
        this.api.hideOverlay();
    }

    updateStartDate = newDate => {
        this.setState(
            {
                start_date: newDate
            },
            this.updateRowData
        );
    }

    ongridReady = params => {
        this.api = params.api;
        this.columnsApi = params.columnApi;
    }

    render() {
        return (
            <div
                className="ag-theme-balham"
                style={{
                    height: '500px',
                    width: '800px'
                }}
            >
                <DateSelector updateStartDate = {this.updateStartDate}/>
                <AgGridReact
                    gridOptions={this.state.gridOptions}
                    rowData={this.state.rowData}
                    onGridReady={this.ongridReady}>
                </AgGridReact>
                <p>{this.state.start_date}</p>
            </div>
        );
    }
}

export default MlbGrid;

