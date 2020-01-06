import React from "react";
import { MenuList, Typography } from "@material-ui/core";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import {
  DescriptionRounded as NewTemplateIcon,
  ViewQuiltRounded as TemplateIcon
  // SearchRounded as SearchIcon
} from "@material-ui/icons";
import { SECONDARY_COLOR } from "../../commons";

const APP_HOME = "/pandadoc";

const menuList = [
  // {
  //   primary: "New Template",
  //   icon: color => <NewTemplateIcon style={color} />,
  //   to: `${APP_HOME}/template/null`,
  //   isActive: path => path.includes("/pandadoc/template/")
  // },
  {
    primary: "Letter",
    icon: color => <NewTemplateIcon style={color} />,
    to: "/letter-editor",
    isActive: path => path.includes("/letter-editor")
  },
  {
    primary: "My Templates",
    icon: color => <TemplateIcon style={color} />,
    to: `${APP_HOME}/`,
    isActive: path => path === "/pandadoc/"
  }
];

const LeftMenu = ({ classes, history }) => {
  const { pathname } = history.location;

  return (
    <div>
      <div className={classes.toolbar} />

      <MenuList style={{ width: 90 }}>
        {menuList.map((item, index) => (
          <VerticalDiv
            key={`${item.primary}-${index}`}
            onClick={() => {
              item.to && history.push(item.to);
            }}
            style={{
              backgroundColor: item.isActive(pathname)
                ? "white"
                : SECONDARY_COLOR
            }}
          >
            {item.icon({
              color: !item.isActive(pathname) ? "white" : SECONDARY_COLOR
            })}
            <Typography
              style={{
                color: !item.isActive(pathname) ? "white" : SECONDARY_COLOR
              }}
              align="center"
            >
              {item.primary}
            </Typography>
          </VerticalDiv>
        ))}
      </MenuList>
    </div>
  );
};

const styles = theme => ({
  menuItem: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& $primary, & $icon": {
        color: theme.palette.common.white
      }
    }
  },
  primary: {},
  icon: {},
  toolbar: theme.mixins.toolbar
});

const VerticalDiv = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  outline: none;
  display: flex;
  padding: 10px;
`;

export default withStyles(styles)(withRouter(LeftMenu));
