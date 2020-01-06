import React, { useState } from 'react';
import styled from 'styled-components';
import ReactDraggable from 'react-draggable';
import MoreHorizIcon from '@material-ui/icons/MoreHorizRounded';
import ReorderIcon from '@material-ui/icons/ReorderRounded';
import { Paper, Menu, MenuItem, Drawer } from '@material-ui/core';

import LogoCustom from './LogoCustom';
import ParagraphCustom from './ParagraphCustom';
import { ConfirmDialog, renderIf } from '../../commons';
import { CoverPageOption } from '../../input-option-version-1';

const CoverPage = ({ templateData, updateCoverData }) => {
  const { coverData } = templateData;
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const onChangeCover = (key, value) => {
    updateCoverData({
      ...coverData,
      [key]: value
    });
  };

  const onMove = (key, position) => {
    if (position.y >= 650) position = { y: 650 };
    if (position.y < 0) position = { y: 10 };
    onChangeCover(key, {
      ...coverData[key],
      ...position
    });
  };

  const onChangeContent = (position, subItem) => {
    onChangeCover('content', {
      ...coverData.content,
      data: coverData.content.data.map((item, index) => {
        return index === position ? subItem : item;
      })
    });
  };

  const dragProps = {
    axis: 'y',
    scale: 1,
    enableUserSelectHack: false,
    bounds: { top: 0, bottom: 655 }
  };

  return (
    <CoverPageWrapper background={coverData.background}>
      <EditButton
        className="edit-button"
        onClick={event => {
          setAnchorEl(event.currentTarget);
        }}
      >
        edit
      </EditButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        keepMounted
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setIsEdit(true);
          }}
        >
          Edit
        </MenuItem>

        <MenuItem
          style={{ color: 'red' }}
          onClick={() => {
            setAnchorEl(null);
            setIsDelete(true);
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      <Drawer
        open={isEdit}
        onClose={() => setIsEdit(false)}
        anchor="right"
        variant="temporary"
      >
        <CoverPageOption
          templateData={templateData}
          onChangeCover={onChangeCover}
        />
      </Drawer>

      <ConfirmDialog
        open={isDelete}
        onClose={() => setIsDelete(false)}
        agreeCall={() => updateCoverData(null)}
        sentence="Item will be deleted ?"
      />

      <ReactDraggable
        {...dragProps}
        handle=".element1"
        onStop={event => {
          onMove('logo', { y: event.layerY });
        }}
        position={{ x: 0, y: coverData.logo.y }}
      >
        <DragWrapper className="template-item">
          <ReorderIcon className="element1 order-icon" fontSize="small" />

          <DragItem>
            <LogoCustom
              item={coverData.logo}
              onChange={item => onChangeCover('logo', item)}
            />
          </DragItem>
        </DragWrapper>
      </ReactDraggable>

      <ReactDraggable
        {...dragProps}
        handle=".element2"
        onStop={event => onMove('header', { y: event.layerY })}
        position={{ x: 0, y: coverData.header.y }}
      >
        <DragWrapper className="template-item">
          <ReorderIcon className="element2 order-icon" fontSize="small" />

          <DragItem>
            <ParagraphCustom
              item={coverData.header}
              onChange={item => onChangeCover('header', item)}
            />
          </DragItem>
        </DragWrapper>
      </ReactDraggable>

      <ReactDraggable
        {...dragProps}
        handle=".element3"
        onStop={event => onMove('content', { y: event.layerY })}
        position={{ x: 0, y: coverData.content.y }}
      >
        <DragWrapper className="template-item">
          <ReorderIcon className="element3 order-icon" fontSize="small" />

          <DragItem>
            <ContentWrapper>
              <LeftContent>
                <ParagraphCustom
                  item={coverData.content.data[0]}
                  onChange={item => onChangeContent(0, item)}
                />
              </LeftContent>

              {renderIf(coverData.content.columnCount === 2)(
                <RightContent>
                  <ParagraphCustom
                    item={coverData.content.data[1]}
                    onChange={item => onChangeContent(1, item)}
                  />
                </RightContent>
              )}
            </ContentWrapper>
          </DragItem>
        </DragWrapper>
      </ReactDraggable>
    </CoverPageWrapper>
  );
};

const CoverPageWrapper = styled(Paper)`
  margin-bottom: 10px;
  padding: 10px 20px 10px 0;
  width: 21cm;
  height: 29.7cm;
  margin-top: 50px;
  position: relative;
  background-image: url(${props => props.background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  .edit-button {
    opacity: 0;
  }

  &:hover {
    .edit-button {
      opacity: 1;
      transition: opacity 0.5s ease-in-out;
      -moz-transition: opacity 0.5s ease-in-out;
      -webkit-transition: opacity 0.5s ease-in-out;
    }
  }
`;

const DragWrapper = styled.div`
  display: flex;

  .order-icon {
    opacity: 0;
    margin: 2px;
  }

  &:hover {
    .order-icon {
      opacity: 1;
      transition: opacity 0.5s ease-in-out;
      -moz-transition: opacity 0.5s ease-in-out;
      -webkit-transition: opacity 0.5s ease-in-out;
    }
  }
`;

const EditButton = styled(MoreHorizIcon)`
  position: absolute;
  right: 15px;
  top: 10px;
`;

const DragItem = styled.div`
  border: 0.5px dotted #00000045;
  flex: 1;
  padding: 5px 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const LeftContent = styled.div`
  flex: 1;
`;

const RightContent = styled.div`
  flex: 1;
`;

export default CoverPage;
