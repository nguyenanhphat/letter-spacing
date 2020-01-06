import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    marginRight: 10,
    marginTop: 10
  }
});

const SignatureCustomOption = ({ classes, editItem, onChange }) => {
  const updateAlignment = position =>
    onChange(
      {
        ...editItem,
        data: {
          ...editItem.data,
          position
        }
      },
      true
    );

  const position = editItem.data.position;

  return (
    <div>
      <Typography>Alignment</Typography>
      <Button
        onClick={() => updateAlignment('left')}
        variant="contained"
        className={classes.button}
        color={position === 'left' ? 'primary' : 'inherit'}
      >
        Left
      </Button>
      <Button
        onClick={() => updateAlignment('center')}
        variant="contained"
        className={classes.button}
        color={position === 'center' ? 'primary' : 'inherit'}
      >
        Center
      </Button>
      <Button
        onClick={() => updateAlignment('right')}
        variant="contained"
        className={classes.button}
        color={position === 'right' ? 'primary' : 'inherit'}
      >
        Right
      </Button>
    </div>
  );
};

export default withStyles(styles)(SignatureCustomOption);
