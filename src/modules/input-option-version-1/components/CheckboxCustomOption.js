import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UUID from 'uuid/v1';
import styled from 'styled-components';
import _ from 'lodash';
import DeleteIcon from '@material-ui/icons/DeleteForeverRounded';
import AddIcon from '@material-ui/icons/AddCircleOutlineRounded';
import { Input, Button, InputAdornment, IconButton } from '@material-ui/core';
import { SECONDARY_COLOR } from '../../commons';

const CheckboxCustomOption = ({ editItem, onChange }) => {
  const [item, setItem] = useState({ ...editItem });

  const addOption = () => {
    setItem({
      ...item,
      data: {
        ...item.data,
        options: [...item.data.options, { id: UUID(), label: '', value: false }]
      }
    });
  };

  const onChangeOption = (id, label) => {
    let itemUpdate = {
      ...item,
      data: {
        ...item.data,
        options: item.data.options.map(option => {
          return option.id === id ? { ...option, label } : option;
        })
      }
    };

    setItem(itemUpdate);
  };

  const deleteItem = id => {
    setItem({
      ...item,
      data: {
        ...item.data,
        options: item.data.options.filter(item => item.id !== id)
      }
    });
  };

  return (
    <WrapperEdit>
      <div>
        <Input
          value="Options"
          style={{ color: SECONDARY_COLOR }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="Add" onClick={addOption}>
                <AddIcon />
              </IconButton>
            </InputAdornment>
          }
          disableUnderline
          disabled
          fullWidth
        />
      </div>

      {!_.isEmpty(item) &&
        item.data.options.map((option, index) => (
          <Field key={option.id}>
            <Input
              value={option.label}
              onChange={event => {
                onChangeOption(option.id, event.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Delete"
                    onClick={() => deleteItem(option.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </InputAdornment>
              }
              fullWidth
            />
          </Field>
        ))}

      <Update
        variant="contained"
        color="primary"
        onClick={() => {
          onChange(item);
        }}
      >
        UPDATE
      </Update>
    </WrapperEdit>
  );
};

const WrapperEdit = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
`;

const Field = styled.div`
  margin: 20px 0;
`;

const Update = styled(Button)``;

CheckboxCustomOption.propTypes = {
  item: PropTypes.object,
  onChange: PropTypes.func
};

export default CheckboxCustomOption;
