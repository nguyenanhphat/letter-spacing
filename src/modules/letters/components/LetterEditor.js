import React, { useState } from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Drawer, Button } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%"
  },
  toolbar: theme.mixins.toolbar
});

const LetterEditor = ({ classes }) => {
  const [isEditLetter, setIsEditLetter] = useState(false);

  return (
    <div className={classes.root}>
      <div className={classes.toolbar} />

      <MainLetter>
        <Paper>
          <Button onClick={() => setIsEditLetter(true)}>Show Edit</Button>
          <div>MainLetter</div>
        </Paper>
      </MainLetter>

      <Drawer
        anchor="right"
        open={isEditLetter}
        onClose={() => setIsEditLetter(false)}
        variant="temporary"
      >
        <div className={classes.toolbar} />
        this is tool
      </Drawer>
    </div>
  );
};

const MainLetter = styled.div`
  width: 100%;
`;

export default withStyles(styles)(LetterEditor);
