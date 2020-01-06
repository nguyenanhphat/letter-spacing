import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DownArrow from "@material-ui/icons/KeyboardArrowDownRounded";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toastr from "toastr";
import Cookies from "js-cookie";
import { SECONDARY_COLOR, publishingTemplate } from "../../commons";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Input
} from "@material-ui/core";
import LeftMenu from "./LeftMenu";
import Icon from "../asset";
import { getLink, downloadFile, getItemInDOM } from "../action";
import ModalUI from "./ModalUI";
import CopyIcon from "@material-ui/icons/FileCopyRounded";
import { putTemplate } from "../../templates/actions";
import { toastrSuccess, toastrFail } from "./CustomToastr";
import { htmlToJson } from "../../../helpers/htmlToJson";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    background: "grey"
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing(2)
  },
  toolbarButton: {
    marginRight: 10,
    color: "white",
    "&$disabled": {
      background: "rgba(0, 0, 0, 0.12)",
      color: "white",
      boxShadow: "none"
    },
    backgroundColor: "#59616b",
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingLeft: 20
  },
  disabled: {},
  label: {
    textTransform: "capitalize",
    fontSize: 14
  },
  iconButton: {
    width: 13,
    height: 13,
    marginRight: 10,
    alignSelf: "flex-end",
    marginBottom: 5
  },
  shareableContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  }
});

const isAdmin = () => Cookies.get("userType") === "ADMIN";

const PrivateLayout = ({ classes, children, title, history }) => {
  const getTemplateId = () => {
    let templateId = history.location.pathname.match(/\d+$/);
    return templateId ? templateId[0] : null;
  };

  const [anchorElShare, setAnChorElShare] = useState(null);
  const [anchorElDownload, setAnChorElDownload] = useState(null);
  const [anchorElPrint, setAnChorElPrint] = useState(null);
  const [shareLink, setShareLink] = useState("");
  const [shareModal, setShareModal] = useState(false);
  const [savePopup, setSavePopup] = useState(false);
  const [documentName, setDocumentName] = useState(
    history.location.state ? history.location.state.templateName : ""
  );

  const handleMenuClick = ({ event, type, formatType, action }) => {
    let html = document.getElementById("main-content");
    html = getItemInDOM(htmlToJson(html).childNodes);
    const templateId = getTemplateId();
    const name = documentName || "new_file";
    const currentUrl = window.location.href;

    if (!action) setAnChorElShare(event ? event.currentTarget : null);
    else if (action === "download")
      setAnChorElDownload(event ? event.currentTarget : null);
    else setAnChorElPrint(event ? event.currentTarget : null);

    if (action === "download" && formatType) {
      downloadFile({
        action,
        html,
        templateId,
        name,
        format: formatType,
        type: "file"
      });
      return;
    }

    if (type)
      getLink(
        type,
        formatType,
        currentUrl,
        html,
        action,
        templateId,
        name
      ).then(([response, status]) => {
        if (status === 200) {
          if (!action) {
            setShareLink(response.url);
            setShareModal(true);
          } else {
            var win = window.open(response.url, "_blank");
            try {
              win.focus();
            } catch (e) {
              alert(
                "Pop-up Blocker is enabled! Please add this site to your exception list."
              );
            }
          }
        } else toastr.error(response.message);
      });
  };

  const renderButton = (
    content,
    icon,
    action = () => null,
    showArrow,
    customStyle = {},
    children
  ) => (
    <Fragment>
      <Button
        variant="contained"
        classes={{
          root: classes.toolbarButton,
          disabled: classes.disabled
        }}
        className={classes.label}
        onClick={action}
        style={customStyle}
      >
        {icon && <img alt="" src={icon} className={classes.iconButton} />}
        {content && (
          <Typography color="inherit" style={{ alignSelf: "flex-end" }}>
            {content}
          </Typography>
        )}
        {showArrow && <DownArrow style={{ marginLeft: 28 }} />}
      </Button>
      {children}
    </Fragment>
  );

  const renderShareableLink = () => (
    <ModalUI open={shareModal} onClose={() => setShareModal(false)}>
      <Typography style={{ fontWeight: "bold" }} variant="h3">
        Shareable Link
      </Typography>

      <div className={classes.shareableContainer}>
        <Typography noWrap={true}>{shareLink}</Typography>
        <CopyToClipboard
          text={shareLink}
          onCopy={() => toastr.success("Link copied to clipboard")}
        >
          <IconButton>
            <CopyIcon />
          </IconButton>
        </CopyToClipboard>
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setShareLink("");
          setShareModal(false);
        }}
      >
        DONE
      </Button>
    </ModalUI>
  );

  const renderSavePopup = () => (
    <ModalUI open={savePopup} onClose={() => setSavePopup(false)}>
      <Input
        value={documentName}
        onChange={event => setDocumentName(event.target.value)}
        placeholder="Name of Document"
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          putTemplate({
            id: getTemplateId(),
            name: documentName
          }).then(([response, statusCode]) => {
            if (statusCode === 200) {
              toastrSuccess(response.message);
              setSavePopup(false);
            } else toastrFail(response.message);
          });
        }}
        style={{ marginTop: 20 }}
      >
        SAVE
      </Button>
    </ModalUI>
  );

  const renderUtilitiesActions = () => (
    <Fragment>
      <Typography
        component="h4"
        variant="subtitle1"
        color="inherit"
        noWrap
        style={{ marginRight: 16 }}
      >
        Free Commercial Offer Letter
      </Typography>

      {renderButton("Save", Icon.saveIcon, () => setSavePopup(true), false)}

      {isAdmin() &&
        renderButton(
          "Publish",
          Icon.publishIcon,
          () => {
            publishingTemplate(getTemplateId());
          },
          false
        )}

      {renderButton(
        "Share",
        Icon.shareIcon,
        event => handleMenuClick({ event }),
        true,
        null,
        <Menu
          id="menu-share"
          anchorEl={anchorElShare}
          keepMounted
          open={Boolean(anchorElShare)}
          onClose={() => handleMenuClick({})}
        >
          <MenuItem onClick={() => handleMenuClick({ type: "facebook" })}>
            Facebook
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick({ type: "pinterest" })}>
            Pinterest
          </MenuItem>
        </Menu>
      )}

      {renderButton(
        "Print",
        Icon.printIcon,
        event => handleMenuClick({ event, action: "print" }),
        false,
        null,
        <Menu
          id="menu-print"
          anchorEl={anchorElPrint}
          open={Boolean(anchorElPrint)}
          onClose={() => handleMenuClick({ action: "print" })}
          keepMounted
        >
          <MenuItem
            onClick={() =>
              handleMenuClick({
                type: "file",
                formatType: "pdf",
                isDownload: true,
                action: "print"
              })
            }
          >
            Print PDF
          </MenuItem>

          <MenuItem
            onClick={() =>
              handleMenuClick({
                type: "file",
                formatType: "docx",
                action: "print"
              })
            }
          >
            Print Docx
          </MenuItem>

          <MenuItem
            onClick={() =>
              handleMenuClick({
                type: "file",
                formatType: "xlsx",
                action: "print"
              })
            }
          >
            Print XLSX
          </MenuItem>
        </Menu>
      )}

      {renderButton(
        "Download",
        Icon.downloadIcon,
        event =>
          handleMenuClick({ event, isDownload: true, action: "download" }),
        true,
        {
          backgroundColor: "#2c83eb"
        },
        <Menu
          id="menu-download"
          anchorEl={anchorElDownload}
          keepMounted
          open={Boolean(anchorElDownload)}
          onClose={event =>
            handleMenuClick({ isDownload: true, action: "download" })
          }
        >
          <MenuItem
            onClick={() =>
              handleMenuClick({
                type: "file",
                formatType: "pdf",
                isDownload: true,
                action: "download"
              })
            }
          >
            Download PDF
          </MenuItem>
          <MenuItem
            onClick={() =>
              handleMenuClick({
                type: "file",
                formatType: "docx",
                isDownload: true,
                action: "download"
              })
            }
          >
            Download Docx
          </MenuItem>
          <MenuItem
            onClick={() =>
              handleMenuClick({
                type: "file",
                formatType: "xlsx",
                isDownload: true,
                action: "download"
              })
            }
          >
            Download XLSX
          </MenuItem>
        </Menu>
      )}
    </Fragment>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="absolute" className={classNames(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            className={classNames(classes.menuButton)}
            onClick={history.goBack}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <ChevronLeftIcon style={{ width: 30, height: 30 }} />
              <Typography style={{ color: "white", fontSize: 14 }}>
                Back
              </Typography>
            </div>
          </IconButton>

          <Typography
            component="h2"
            variant="h6"
            color="inherit"
            className={classes.title}
            noWrap
          />
          {getTemplateId() && renderUtilitiesActions()}
        </Toolbar>
      </AppBar>

      <div
        style={{
          minHeight: "100%",
          backgroundColor: SECONDARY_COLOR,
          flexDirection: "row",
          display: "flex"
        }}
      >
        <LeftMenu />
      </div>

      <main className={classes.content}>
        <div className={classes.tableContainer}>{children}</div>
      </main>
      {renderShareableLink()}
      {renderSavePopup()}
    </div>
  );
};

PrivateLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(PrivateLayout));
