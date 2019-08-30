import React, {Component} from 'react';
import axios from 'axios';
import auth0Client from '../Auth';

class MlbGames extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mlbGames: null,
        };
    }

    async componentDidMount() {
        // Get bets that this user has placed
        const mlbGames = (await axios.get('http://localhost:8081/mlb/all-games/', {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        })).data;
        this.setState({
            mlbGames,
        });
    }

    renderTableData() {
        return this.state.mlbGames.map((game, index) => {
            const { id, start_date, home, away, is_complete, home_runs, away_runs } = game;
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{start_date}</td>
                    <td>{home}</td>
                    <td>{away}</td>
                    <td>{is_complete}</td>
                    <td>{home_runs}</td>
                    <td>{away_runs}</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.state.mlbGames === null && <p>Loading MLB Games...</p>}
                    {this.state.mlbGames &&
                        <div>
                            <table id='mlbGames'>
                                <tbody>
                                    {this.renderTableData()}    
                                </tbody>    
                            </table>        
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default MlbGames;