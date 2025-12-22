import React, { useState } from 'react';
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'; // styles for slider

const DateRangeSliderInput = ({ minDate, maxDate }) => {
    const [values, setValues] = useState([minDate, maxDate]);

    const handleChange = (newValues) => {
        setValues(newValues);
    }

    if (minDate === null || maxDate === null) {
        return null;
    }

    return (
        <div>
            <div className='slider-labels'>
                <span className='text-main'>From: <strong>{values[0]}</strong></span>
                <span className='text-main'>To: <strong>{values[1]}</strong></span>
            </div>

            <Slider
                range
                min={minDate}
                max={maxDate}
                step={1} // 1 year
                value={values}
                onChange={handleChange}
            />

            {// "Hidden Inputs" technique - inputs are hidden from the user, but their return values are based on the component's state (minDate, maxDate)
            }
            <input type='hidden' name='minDate' value={values[0]} />
            <input type='hidden' name='maxDate' value={values[1]} />
        </div>
    )
}

export default DateRangeSliderInput;