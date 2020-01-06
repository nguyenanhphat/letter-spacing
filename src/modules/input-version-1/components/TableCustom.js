/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { Component, Fragment, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ReactResizeDetector from 'react-resize-detector';
import ColumnResizer from 'react-column-resizer';
import { Input, Typography, Button } from '@material-ui/core';
import UUID from 'uuid/v1';
import { withStyles } from '@material-ui/core/styles';
import { reorder } from '../../commons';
import MoveIcon from '@material-ui/icons/ViewHeadlineRounded';

const TBody = styled.tbody`
  border: 0;
`;

const CustomTH = styled.th`
  text-align: left;
  background-color: #4caf50;
  color: white;
  border: 1px solid grey;
  padding: 8px;
  min-width: 50px;
  width: ${props => `${props.width}px` || 'auto'};
`;
const CustomTR = styled.tr`
  &:hover {
    background-color: #ddd;
  }
`;

const CustomTD = styled.td`
  border: 1px solid grey;
  padding: 8px;
  text-align: left;
  background-color: ${props => (props.section ? '#f4f4f4' : 'white')};
`;

const DividerTD = styled.td`
  background-color: white;
`;

const AddButton = styled(Button)`
  opacity: ${props => (props.opacity ? '1' : '0')};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 5px 0px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px;
  text-transform: capitalize !important;
  margin-top: 5px !important;
  margin-bottom: 5px !important;
`;
const styles = theme => ({
  label: {
    textTransform: 'capitalize'
  },
  headerInput: {
    color: 'white'
  },
  columnResizer: {
    backgroundColor: 'transparent',
    width: 0.01,
    marginLeft: -3
  }
});

const initFocus = {
  isFocus: false,
  isHeader: false,
  index: -1
};

class TableRow extends Component {
  render() {
    const {
      snapshot,
      data,
      provided,
      onChange,
      onFocus,
      focus,
      numOfCol
    } = this.props;
    return (
      <CustomTR
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
        {...provided.draggableProps}
      >
        {data.section ? (
          <Fragment>
            <CustomTD
              key={`customSection-${data.order}`}
              style={{ position: 'relative' }}
              colSpan={numOfCol * 2 - 1}
              section
            >
              {!focus.isHeader && data.order === focus.index ? (
                <div
                  {...provided.dragHandleProps}
                  style={{
                    position: 'absolute',
                    width: 30,
                    height: 30,
                    backgroundColor: '#5ebaba',
                    borderRadius: 3,
                    left: -31,
                    boxShadow:
                      '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <MoveIcon style={{ width: 15, height: 15, color: 'black' }} />
                </div>
              ) : (
                <div {...provided.dragHandleProps} />
              )}
              <Input
                fullWidth
                value={data.value}
                disableUnderline
                onChange={onChange(data, null, true)}
                onClick={() =>
                  onFocus({
                    isFocus: true,
                    isHeader: false,
                    index: data.order
                  })
                }
                onBlur={() => onFocus(initFocus)}
              />
            </CustomTD>
          </Fragment>
        ) : (
          data.value.map((value, index) => (
            <Fragment key={`${value.id}-${index}`}>
              <CustomTD style={{ position: 'relative' }}>
                {index === 0 &&
                !focus.isHeader && data.order === focus.index ? (
                  <div
                    {...provided.dragHandleProps}
                    style={{
                      position: 'absolute',
                      width: 30,
                      height: 30,
                      backgroundColor: '#5ebaba',
                      borderRadius: 3,
                      left: -31,
                      boxShadow:
                        '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <MoveIcon
                      style={{ width: 15, height: 15, color: 'black' }}
                    />
                  </div>
                ) : (
                  <div {...provided.dragHandleProps} />
                )}
                <Input
                  fullWidth
                  value={value.value}
                  disableUnderline
                  onChange={onChange(data, value)}
                  onClick={() =>
                    onFocus({
                      isFocus: true,
                      isHeader: false,
                      index: data.order
                    })
                  }
                  onBlur={() => onFocus(initFocus)}
                />
              </CustomTD>
              {index < data.value.length - 1 && <DividerTD />}
            </Fragment>
          ))
        )}
      </CustomTR>
    );
  }
}
class Header extends Component {
  render() {
    const {
      snapshot,
      header,
      provided,
      onChange,
      onFocus,
      focus,
      onResize,
      width
    } = this.props;

    return (
      <CustomTH
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
        {...provided.draggableProps}
        width={width}
      >
        <ReactResizeDetector
          handleWidth
          onResize={onResize}
          refreshMode="throttle"
        />
        <div style={{ position: 'relative' }}>
          {focus.isHeader && header.order === focus.index ? (
            <div
              {...provided.dragHandleProps}
              style={{
                position: 'absolute',
                width: 30,
                height: 30,
                borderRadius: 3,
                backgroundColor: '#5ebaba',
                boxShadow:
                  '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
                top: -39,
                left: '50%',
                right: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <MoveIcon style={{ width: 15, height: 15, color: 'black' }} />
            </div>
          ) : (
            <div {...provided.dragHandleProps} />
          )}
          <Input
            fullWidth
            style={{ color: 'white' }}
            value={header.value}
            disableUnderline
            onChange={onChange}
            onClick={() =>
              onFocus({
                isFocus: true,
                isHeader: true,
                index: header.order
              })
            }
            onBlur={() => onFocus(initFocus)}
          />
        </div>
      </CustomTH>
    );
  }
}

const TableCustom = ({ item, onChange, classes }) => {
  const [tableData, setTableData] = useState(item.data);
  const [focus, setFocus] = useState(initFocus);
  const tableRef = useRef(null);

  useEffect(() => {
    onChange({
      ...item,
      data: {
        ...tableData,
        element: 'Table'
      }
    });
  }, [tableData]);

  const onDragEnd = result => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination || destination.index === source.index) {
      return;
    }
    // different block
    if (destination.droppableId !== source.droppableId) {
      return;
    }

    // no movement
    if (destination.index === source.index) {
      return;
    }
    if (destination.droppableId === 'table-body') {
      reorderRows(source, destination);
    } else {
      setFocus(initFocus);
      reorderColumns(source, destination);
    }
  };

  const reorderRows = (source, destination) => {
    let orderedRows = reorder(tableData.rows, source.index, destination.index);
    setTableData({
      ...tableData,
      rows: orderedRows
    });
    setFocus({
      ...focus,
      index: destination.index
    });
  };

  const reorderColumns = (source, destination) => {
    let orderedColumns = reorder(
      tableData.columns,
      source.index,
      destination.index
    );
    let orderedRows = tableData.rows.map(row =>
      !row.section
        ? {
            ...row,
            value: reorder(row.value, source.index, destination.index)
          }
        : row
    );
    setTableData({
      rows: orderedRows,
      columns: orderedColumns
    });
  };

  const addNewSection = () => {
    let currentRows = tableData.rows;
    currentRows = currentRows.concat([
      {
        id: UUID(),
        value: '',
        section: true,
        order: currentRows.length
      },
      {
        id: UUID(),
        value: tableData.columns.map((columns, index) => ({
          id: UUID(),
          value: '',
          order: index
        })),
        order: currentRows.length + 1
      }
    ]);
    setTableData({
      ...tableData,
      rows: currentRows
    });
  };

  const addNewRow = () => {
    let currentRows = tableData.rows;
    currentRows.push({
      id: UUID(),
      value: tableData.columns.map((columns, index) => ({
        id: UUID(),
        value: '',
        order: index
      })),
      order: currentRows.length
    });
    setTableData({
      ...tableData,
      rows: currentRows
    });
  };

  const addNewColumn = () => {
    let currentColumns = tableData.columns;
    currentColumns.push({
      id: UUID(),
      value: '',
      order: currentColumns.length
    });
    let currentRows = tableData.rows;
    currentRows.forEach(
      row =>
        !row.section &&
        row.value.push({
          id: UUID(),
          value: '',
          order: currentColumns.length - 1
        })
    );
    setTableData({
      rows: currentRows,
      columns: currentColumns
    });
  };

  return (
    <div style={{ marginTop: 50 }}>
      <AddButton
        opacity={focus.isFocus ? 1 : 0}
        onClick={addNewColumn}
        style={{ float: 'right' }}
      >
        <Typography>Add Column</Typography>
      </AddButton>
      <DragDropContext onDragEnd={onDragEnd}>
        <Fragment>
          <table
            id="mytable"
            style={{ width: '100%', borderCollapse: 'collapse' }}
            ref={tableRef}
          >
            <Droppable droppableId="table-head" direction="horizontal">
              {provided => (
                <thead>
                  <CustomTR
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {tableData.columns.map((header, index) => (
                      <Fragment key={`${header.id}-${index}`}>
                        <Draggable
                          draggableId={header.id}
                          index={index}
                          key={header.id}
                        >
                          {(provided, snapshot) => (
                            <Header
                              focus={focus}
                              classes={classes}
                              provided={provided}
                              snapshot={snapshot}
                              header={header}
                              width={
                                tableRef.current
                                  ? tableRef.current.clientWidth * header.flex
                                  : null
                              }
                              onFocus={focus => setFocus(focus)}
                              onResize={width => {
                                let currentColumns = tableData.columns;
                                currentColumns[header.order].flex = (
                                  (width + 17) /
                                  tableRef.current.clientWidth
                                ).toFixed(3);
                                setTableData({
                                  ...tableData,
                                  columns: currentColumns
                                });
                              }}
                              onChange={event => {
                                let currentColumns = tableData.columns;
                                currentColumns[header.order].value =
                                  event.target.value;
                                setTableData({
                                  ...tableData,
                                  columns: currentColumns
                                });
                              }}
                            />
                          )}
                        </Draggable>
                        {index < tableData.columns.length - 1 && (
                          <ColumnResizer
                            className={classes.columnResizer}
                            minWidth={50}
                          />
                        )}
                      </Fragment>
                    ))}
                  </CustomTR>
                </thead>
              )}
            </Droppable>

            <Droppable droppableId="table-body">
              {provided => (
                <TBody ref={provided.innerRef} {...provided.droppableProps}>
                  {tableData.rows.map((data, index) => (
                    <Draggable
                      draggableId={data.id}
                      index={index}
                      key={`${data.id}-${index}`}
                    >
                      {(provided, snapshot) => (
                        <TableRow
                          numOfCol={tableData.columns.length}
                          provided={provided}
                          snapshot={snapshot}
                          data={data}
                          focus={focus}
                          onFocus={focus => setFocus(focus)}
                          onChange={(rowData, cellData, isSection) => event => {
                            let currentRows = tableData.rows;
                            let rowIndex = rowData.order;
                            if (isSection)
                              currentRows[rowIndex].value = event.target.value;
                            else {
                              let cellIndex = cellData.order;
                              currentRows[rowIndex].value[cellIndex].value =
                                event.target.value;
                            }
                            setTableData({
                              ...tableData,
                              rows: currentRows
                            });
                          }}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </TBody>
              )}
            </Droppable>
          </table>
        </Fragment>
      </DragDropContext>
      <AddButton
        onClick={addNewRow}
        opacity={focus.isFocus ? 1 : 0}
        style={{ marginRight: 10 }}
      >
        <Typography>Add Row</Typography>
      </AddButton>
      <AddButton onClick={addNewSection} opacity={focus.isFocus ? 1 : 0}>
        <Typography>Add Section</Typography>
      </AddButton>
    </div>
  );
};

export default withStyles(styles)(TableCustom);
