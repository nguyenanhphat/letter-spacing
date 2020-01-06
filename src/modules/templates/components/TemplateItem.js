import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReorderIcon from '@material-ui/icons/ReorderRounded';
import MoreHorizIcon from '@material-ui/icons/MoreHorizRounded';
import UUID from 'uuid/v1';
import { Menu, MenuItem, Drawer, Input, Typography } from '@material-ui/core';

import { PRIMARY_COLOR, SECONDARY_COLOR, ConfirmDialog } from '../../commons';
import {
  InputCustom,
  LabelCustom,
  ParagraphCustom,
  CheckboxCustom,
  ImageCustom,
  VideoCustom,
  LogoCustom,
  DatePickerCustom,
  DropdownCustom,
  RatingCustom,
  DividerCustom,
  PageBreak,
  TableCustom as Table,
  FooterCustom as Footer,
  SignatureCustom as Signature
} from '../../input-version-1';

const LIST_ELEMENT = {
  Text: InputCustom,
  Header: LabelCustom,
  Paragraph: ParagraphCustom,
  Checkboxes: CheckboxCustom,
  Image: ImageCustom,
  Video: VideoCustom,
  Logo: LogoCustom,
  DatePicker: DatePickerCustom,
  Dropdown: DropdownCustom,
  Rating: RatingCustom,
  Divider: DividerCustom,
  PageBreak: PageBreak,
  Table,
  Footer,
  Signature
};

const IS_EDIT = [
  'Text',
  'Header',
  'Paragraph',
  'Checkboxes',
  'Dropdown',
  'Divider',
  'Video',
  'Logo',
  'Footer',
  'Signature'
];

const TemplateItem = ({
  updateTemplateItem,
  item,
  setIsEdit,
  setItemEdit,
  onDelete,
  duplicateBlock,
  provided,
  templateData
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [isModifyPadding, setIsModifyPadding] = useState(false);

  const withCustom = Component => {
    return (
      <Component
        onChange={updateTemplateItem}
        item={item}
        templateData={templateData}
      />
    );
  };

  return (
    <TemplateItemWrapper top={item.data.top} bottom={item.data.bottom}>
      <div
        className="move-icon"
        style={{ display: 'flex', alignItems: 'center' }}
        {...provided.dragHandleProps}
      >
        <ReorderStyle fontSize="small" />
      </div>

      <Item className="item template-item">
        {withCustom(LIST_ELEMENT[item.data.element])}
      </Item>

      <EditButton
        className="edit-icon"
        onClick={event => {
          setItemEdit(item);
          setAnchorEl(event.currentTarget);
        }}
      />

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        keepMounted
      >
        {IS_EDIT.includes(item.data.element) && (
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              setIsEdit(true);
            }}
          >
            Edit
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setIsModifyPadding(true);
          }}
        >
          Padding Size
        </MenuItem>

        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            duplicateBlock({ ...item, id: UUID(), order: item.order + 1 });
          }}
        >
          Duplicate Block
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

      <ConfirmDialog
        sentence="Item will be deleted ?"
        open={isDelete}
        onClose={() => setIsDelete(false)}
        agreeCall={() => onDelete(item.id)}
      />

      <Drawer
        anchor="right"
        variant="temporary"
        open={isModifyPadding}
        onClose={() => {
          setIsModifyPadding(false);
        }}
      >
        {updatePadding(item, updateTemplateItem, templateData)}
      </Drawer>
    </TemplateItemWrapper>
  );
};

const updatePadding = (item, updateTemplateItem) => {
  const onChangeSize = (position, size) => {
    updateTemplateItem({
      ...item,
      data: {
        ...item.data,
        [position]: size
      }
    });
  };

  return (
    <PaddingSizeWrapper>
      <Typography fullWidth>Top</Typography>
      <Input
        type="number"
        value={item.data.top}
        onChange={event => {
          onChangeSize('top', event.target.value);
        }}
        fullWidth
      />

      <Typography style={{ marginTop: '30px' }} fullWidth>
        Bottom
      </Typography>
      <Input
        type="number"
        value={item.data.bottom}
        onChange={event => {
          onChangeSize('bottom', event.target.value);
        }}
        fullWidth
      />
    </PaddingSizeWrapper>
  );
};

const TemplateItemWrapper = styled.div`
  border-radius: 5px;
  display: flex;
  margin-top: ${props => props.top}px;
  margin-bottom: ${props => props.bottom}px;

  &:hover {
    .move-icon {
      svg {
        opacity: 1;
        color: ${SECONDARY_COLOR};
        transition: opacity 0.7s ease-in-out;
        -moz-transition: opacity 0.7s ease-in-out;
        -webkit-transition: opacity 0.7s ease-in-out;
      }
    }

    .item {
      border: 1px solid ${PRIMARY_COLOR};
      transition: border 0.7s ease-in-out;
      -moz-transition: border 0.7s ease-in-out;
      -webkit-transition: border 0.7s ease-in-out;
    }

    .edit-icon {
      opacity: 1;
      color: ${SECONDARY_COLOR};
      transition: opacity 0.7s ease-in-out;
      -moz-transition: opacity 0.7s ease-in-out;
      -webkit-transition: opacity 0.7s ease-in-out;
    }
  }
`;

const Item = styled.div`
  flex: 1;
  padding: 1px;
  border-radius: 5px;
  border: 1px solid #00000000;
`;

const ReorderStyle = styled(ReorderIcon)`
  align-self: center;
  margin-right: 5px;
  opacity: 0;
`;

const EditButton = styled(MoreHorizIcon)`
  align-self: center;
  opacity: 0;
`;

const PaddingSizeWrapper = styled.div`
  padding: 50px 15px;
`;

TemplateItem.propTypes = {
  updateTemplateItem: PropTypes.func,
  item: PropTypes.object,
  setIsEdit: PropTypes.func,
  setItemEdit: PropTypes.func
};

export default TemplateItem;
