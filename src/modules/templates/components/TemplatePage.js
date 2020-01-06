/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  TableRow,
  TableCell,
  Table,
  TableBody,
  TableHead,
  IconButton,
  TablePagination,
  InputBase
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { fetchTemplate, destroyTemplate } from "../actions";
import { toastrFail, toastrSuccess, APP_HOME, debounced } from "../../commons";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#a8a7a7",
    "&:hover": {
      backgroundColor: "#7d7c7c"
    },
    width: "30%",
    margin: 20,
    display: "flex",
    alignItems: "center"
  },
  searchIcon: {
    margin: 10
  },
  inputRoot: {
    color: "inherit"
  },
  toolbar: theme.mixins.toolbar
});

const initPaging = {
  pageSize: 10,
  pageIndex: 0,
  search: ""
};

const TemplatePage = ({ classes, history }) => {
  const [listTemplate, setListTemplate] = useState([]);
  const [paging, setPaging] = useState({ ...initPaging });

  useEffect(() => {
    fetchTemplate(paging).then(([response, statusCode]) => {
      if (statusCode === 200) {
        setListTemplate(response.data.list);
        setPaging({
          ...response.data,
          list: undefined
        });
      } else {
        toastrFail("Loading Template fail");
      }
    });
  }, []);

  const handleSearch = (searchKey, value) => {
    let pagingInfo = null;
    if (["pageSize", "search"].includes(searchKey))
      pagingInfo = {
        ...initPaging,
        [searchKey]: value
      };
    else
      pagingInfo = {
        ...paging,
        [searchKey]: value
      };
    debounced(
      () =>
        fetchTemplate(pagingInfo).then(([response, statusCode]) => {
          if (statusCode === 200) {
            setListTemplate(response.data.list);
            setPaging({
              ...response.data,
              list: undefined
            });
          } else {
            toastrFail("Loading Template fail");
          }
        }),
      500
    );
  };

  const onDeleteTemplate = id => {
    destroyTemplate(id).then(([response, statusCode]) => {
      if (response.statusCode === 200) {
        toastrSuccess(response.message);
        setListTemplate(listTemplate.filter(template => template.id !== id));
        setPaging({
          ...paging,
          totalItems: paging.totalItems - 1
        });
      } else {
        toastrFail(response.message);
      }
    });
  };

  const formatDateTime = datetime => {
    return moment(datetime).format("DD-MM-YYYY HH:MM:SS");
  };

  return (
    <Wrapper>
      <div className={classes.toolbar} />
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell colSpan={5}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      fullWidth
                      onChange={e => handleSearch("search", e.target.value)}
                      placeholder="Search template"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                      }}
                      inputProps={{ "aria-label": "search" }}
                    />
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>NAME</TableCell>
                <TableCell>CREATED AT</TableCell>
                <TableCell>UPDATED AT</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {listTemplate.map(template => {
                return (
                  <TableRow
                    hover
                    key={template.id}
                    onClick={() =>
                      history.push(`${APP_HOME}/template/${template.id}`, {
                        templateName: template.name
                      })
                    }
                  >
                    <TableCell>{template.id}</TableCell>
                    <TableCell>{template.name}</TableCell>
                    <TableCell>
                      {formatDateTime(template.createdTime)}
                    </TableCell>
                    <TableCell>
                      {formatDateTime(template.updatedTime)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={event => {
                          onDeleteTemplate(template.id);
                          event.stopPropagation();
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              {listTemplate.length === 0 && (
                <TableRow style={{ height: 49 }}>
                  <TableCell colSpan={6} align="center">
                    No Template
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={paging.totalItems}
            rowsPerPage={paging.pageSize}
            page={paging.pageIndex - 1}
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={(e, pageIndex) =>
              handleSearch("pageIndex", pageIndex)
            }
            onChangeRowsPerPage={e => handleSearch("pageSize", e.target.value)}
          />
        </div>
      </Paper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 80vh;
  padding: 10px;
`;

TemplatePage.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object
};

export default withStyles(styles)(withRouter(TemplatePage));
