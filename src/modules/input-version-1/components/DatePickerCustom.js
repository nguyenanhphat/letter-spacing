import React from 'react';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import { DATE_FORMAT } from '../../commons';
import { Input } from '@material-ui/core';

const DatePickerCustom = ({ item, onChange }) => {
  const updateItem = (key, value) => {
    onChange({
      ...item,
      data: {
        ...item.data,
        [key]: value
      }
    });
  };

  return (
    <div style={{ display: 'flex' }}>
      <Input
        value={item.data.label}
        onChange={event => updateItem('label', event.target.value)}
        style={{ width: '200px', fontWeight: 'bold' }}
        disableUnderline
      />

      <div style={{ flex: 1, margin: '20px' }}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            value={moment(item.data.content, DATE_FORMAT)}
            onChange={value => updateItem('content', value.format(DATE_FORMAT))}
            format="MMM Do YYYY"
          />
        </MuiPickersUtilsProvider>
      </div>
    </div>
  );
};

export default DatePickerCustom;
