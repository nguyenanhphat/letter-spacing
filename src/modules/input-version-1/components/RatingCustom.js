import React from 'react';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import {
  Input,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';

const RatingCustom = ({ item, onChange }) => {
  const updateRating = (key, value) => {
    onChange({
      ...item,
      data: {
        ...item.data,
        [key]: value
      }
    });
  };

  const changeRating = rate => {
    if (rate === item.data.value) {
      updateRating('value', 0);
    } else {
      updateRating('value', rate);
    }
  };

  return (
    <div>
      <Input
        value={item.data.label}
        onChange={event => updateRating('label', event.target.value)}
        style={{ fontWeight: 'bold' }}
        disableUnderline
      />

      <FormGroup row>
        {[1, 2, 3, 4, 5].map(number => (
          <FormControlLabel
            key={number}
            control={
              <Checkbox
                icon={<StarBorder />}
                checkedIcon={<Star />}
                color="primary"
                value={number}
                checked={number <= item.data.value}
                onChange={event => changeRating(event.target.value)}
              />
            }
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default RatingCustom;
