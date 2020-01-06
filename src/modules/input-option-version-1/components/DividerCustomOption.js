import React from 'react';
import { TextField, Button } from '@material-ui/core';

const DividerCustomOption = ({ editItem, onChange }) => {
  const [item, setItem] = React.useState({ ...editItem });

  const updateDivider = (key, value) => {
    setItem({
      ...item,
      data: {
        ...item.data,
        [key]: value
      }
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        value={item.data.value}
        onChange={event => updateDivider('value', event.target.value)}
        label="Height"
        type="number"
        fullWidth
      />

      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '20px' }}
        onClick={() => {
          onChange(item);
        }}
      >
        UPDATE
      </Button>
    </div>
  );
};

export default DividerCustomOption;
