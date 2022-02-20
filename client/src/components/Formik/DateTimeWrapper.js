import React from 'react';
import { TextField } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

const DateTimeWrapper = ({ name, ...otherProps }) => {
    const [field, meta] = useField(name);
    const { setFieldValue } = useFormikContext();

    const handleChange = (value) => {
        setFieldValue(name, value);
    };

    const configDateTimePicker = {
        ...field,
        ...otherProps,
        minDate: new Date('2017-01-01'),
        onChange: (newValue) => {
            handleChange(newValue);
        },
        renderInput: (params) => <TextField {...params} />,

    };

    return (
        <>
            <DesktopDatePicker
                {...configDateTimePicker}
            />
        </>

    );
};

export default DateTimeWrapper;