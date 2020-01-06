import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Input
} from '@material-ui/core';

const styles = theme => ({
  formControl: {
    margin: theme.spacing * 3
  }
});

const CheckboxCustom = ({ classes, onChange, item }) => {
  const onCheckbox = optionId => {
    onChange({
      ...item,
      data: {
        ...item.data,
        options: item.data.options.map(option => {
          return option.id === optionId
            ? { ...option, value: !option.value }
            : option;
        })
      }
    });
  };

  return (
    <FormControl className={classes.formControl} fullWidth>
      <Input
        value={item.data.label}
        onChange={event =>
          onChange({
            ...item,
            data: { ...item.data, label: event.target.value }
          })
        }
        style={{ fontWeight: 'bold' }}
        disableUnderline
        fullWidth
      />
      <FormGroup>
        {item.data.options.map(option => (
          <FormControlLabel
            key={option.id}
            control={
              <Checkbox
                color="primary"
                checked={option.value}
                onChange={event => onCheckbox(event.target.value)}
                value={option.id}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

CheckboxCustom.propTypes = {
  onChange: PropTypes.func,
  item: PropTypes.object
};

export default withStyles(styles)(CheckboxCustom);
