import React, {Component} from 'react';
import axios from 'axios';
import auth0Client from '../Auth';
import MlbGrid from './MlbGrid';

class MlbGames extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mlbGames: null,
        };
    }

    async componentDidMount() {
        // Get all mlb games
        const mlbGames = (await axios.get('http://localhost:8081/mlb/all-games/', {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        })).data;
        this.setState({
            mlbGames,
        });
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <MlbGrid start_date="2019-09-16"></MlbGrid>
                </div>
            </div>
        );
    }
}

export default MlbGames;