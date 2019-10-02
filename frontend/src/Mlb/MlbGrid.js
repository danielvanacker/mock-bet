import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import auth0Client from '../Auth';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

// A grid to display mlb games. In future maybe bets below the games.
class MlbGrid extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
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
            rowData: null
        }
    }

    async componentDidMount() {
        // Gets games
        const rowData = (await axios.get('http://localhost:8081/mlb/all-games/', {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        })).data;
        this.setState({
            rowData,
        });
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
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}>
                </AgGridReact>
            </div>
        );
    }
}

export default MlbGrid;

