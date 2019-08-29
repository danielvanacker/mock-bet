import React, {Component} from 'react';
import axios from 'axios';
import auth0Client from '../Auth';

class Bets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bets: null,
        };
    }

    async componentDidMount() {
        // Get bets that this user has placed
        const bets = (await axios.get('http://localhost:8081/bets/', {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        })).data;
        this.setState({
            bets,
        });
    }

    renderTableData() {
        return this.state.bets.map((bet, index) => {
            const { id, league, date_created, user_id, is_complete } = bet;
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{league}</td>
                    <td>{date_created}</td>
                    <td>{user_id}</td>
                    <td>{is_complete}</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.state.bets === null && <p>Loading bets</p>}
                    {this.state.bets &&
                        <div>
                            <table id='bids'>
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

export default Bets;