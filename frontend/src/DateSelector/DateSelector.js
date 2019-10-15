import React, {Component} from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class DateSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date()
        };
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
        this.props.updateStartDate(this.formatDate(date));
        console.log(date);
    };

    formatDate = date => {
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        let year = date.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    render() {
        return (
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
            />
        );
    }
}

export default DateSelector;