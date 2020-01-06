import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@material-ui/core';

const InputCustom = ({ onChange, item }) => {
  return (
    <Input
      onChange={event =>
        onChange({
          ...item,
          data: { ...item.data, content: event.target.value }
        })
      }
      value={item.data.content}
      disableUnderline
      fullWidth
    />
  );
};

InputCustom.propTypes = {
  onChange: PropTypes.func,
  item: PropTypes.object
};

export default InputCustom;
