import React, { useState } from 'react';
// import $ from 'jquery';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';

const DateRange = ({ callBack }) => {
    const [state, setState] = useState({
        start: moment().subtract(29, 'days'),
        end: moment(),
    });
    const { start, end } = state;
    // callBack({ start_date: start.format('yyyy-MM-DD'), end_date: end.format('yyyy-MM-DD') });
    const handleCallback = (start, end) => {
        setState({ start, end });
        callBack({ start_date: start.format('MM-DD-YYYY'), end_date: end.format('MM-DD-YYYY') });
    };
    const label =
        start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY');
    return (
        <DateRangePicker
            initialSettings={{
                parentEl: '#date-range-ref',
                startDate: start.toDate(),
                endDate: end.toDate(),
                showDropdowns: true,
                autoApply: true,
                ranges: {
                    Today: [moment().toDate(), moment().toDate()],
                    Yesterday: [
                        moment().subtract(1, 'days').toDate(),
                        moment().subtract(1, 'days').toDate(),
                    ],
                    'Last 7 Days': [
                        moment().subtract(6, 'days').toDate(),
                        moment().toDate(),
                    ],
                    'Last 30 Days': [
                        moment().subtract(29, 'days').toDate(),
                        moment().toDate(),
                    ],
                    'This Month': [
                        moment().startOf('month').toDate(),
                        moment().endOf('month').toDate(),
                    ],
                    'Last Month': [
                        moment().subtract(1, 'month').startOf('month').toDate(),
                        moment().subtract(1, 'month').endOf('month').toDate(),
                    ],
                },
            }}
            onCallback={handleCallback}
        >
            <div
                id="reportrange"
                className="form-control"
                style={{
                    background: '#fff',
                    cursor: 'pointer',
                    padding: '5px 10px',
                    border: '1px solid #ccc',
                    width: '100%',
                }}
            >
                <i className="fa fa-calendar"></i>&nbsp;
                <span>{label}</span> <i className="fa fa-caret-down"></i>
            </div>
        </DateRangePicker>
    );
}
export default DateRange;