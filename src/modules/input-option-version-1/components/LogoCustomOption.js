import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    marginRight: 10,
    marginTop: 10
  }
});

const LogoCustomOption = ({ classes, editItem, onChange }) => {
  const updateAlignment = isLeft =>
    onChange(
      {
        ...editItem,
        data: {
          ...editItem.data,
          left: isLeft
        }
      },
      true
    );

  const isLeft = editItem.data.left;

  return (
    <div>
      <Typography>Alignment</Typography>
      <Button
        onClick={() => updateAlignment(true)}
        variant="contained"
        className={classes.button}
        color={isLeft ? 'primary' : 'inherit'}
      >
        Left
      </Button>
      <Button
        onClick={() => updateAlignment(false)}
        variant="contained"
        className={classes.button}
        color={!isLeft ? 'primary' : 'inherit'}
      >
        Right
      </Button>
    </div>
  );
};

export default withStyles(styles)(LogoCustomOption);
