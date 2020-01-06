import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@material-ui/core';

const FooterCustom = ({ onChange, item }) => {
  return (
    <Input
      value={item.data.content}
      onChange={event =>
        onChange({
          ...item,
          data: { ...item.data, content: event.target.value }
        })
      }
      style={{ fontWeight: 'bold' }}
      disableUnderline
      fullWidth
    />
  );
};

FooterCustom.propTypes = {
  onChange: PropTypes.func,
  item: PropTypes.object
};

export default FooterCustom;
