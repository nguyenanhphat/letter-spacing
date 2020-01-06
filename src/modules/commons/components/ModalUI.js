import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Modal, Paper } from '@material-ui/core';

const styles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  margin: {
    margin: theme.spacing(1)
  }
});

const ModalUI = props => {
  const { open, children, classes, stylesBox, ...allProps } = props;
  return (
    <Modal
      {...allProps}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open || false}
    >
      <Paper className={classes.paper} style={{ width: '500px', ...stylesBox }}>
        <div>{children}</div>
      </Paper>
    </Modal>
  );
};

ModalUI.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  stylesBox: PropTypes.object
};

export default withStyles(styles)(ModalUI);
