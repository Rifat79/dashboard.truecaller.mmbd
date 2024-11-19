import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const DatePickerCustom = ({selectedDate, onChangeHandler={}}) => {
    return (
        <DatePicker selected={selectedDate} onChange={onChangeHandler} className="form-control form-control-solid"/>
    )
};