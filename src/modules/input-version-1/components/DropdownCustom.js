import React from 'react';
import styled from 'styled-components';
import { Input, FormControl, Select, MenuItem } from '@material-ui/core';

const DropdownCustom = ({ item, onChange }) => {
  const updateItem = (key, value) => {
    onChange({
      ...item,
      data: {
        ...item.data,
        [key]: value
      }
    });
  };

  const changeSelect = id => {
    let newOptions = [];
    if (id) {
      newOptions = item.data.options.map(option =>
        option.id === id
          ? { ...option, value: true }
          : { ...option, value: false }
      );
    } else {
      newOptions = item.data.options.map(option => ({
        ...option,
        value: false
      }));
    }

    updateItem('options', newOptions);
  };

  const getValue = () => {
    const itemSelected = item.data.options.find(option => option.value);
    return itemSelected ? itemSelected.id : '';
  };

  return (
    <DropdownWrapper>
      <Title>
        <Input
          value={item.data.label}
          onChange={event => updateItem('label', event.target.value)}
          style={{ fontWeight: 'bold' }}
          disableUnderline
        />
      </Title>

      <Content>
        <FormControl>
          <Select
            style={{ width: '200px' }}
            value={getValue()}
            onChange={event => changeSelect(event.target.value)}
            inputProps={{
              name: 'age',
              id: 'age-simple'
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>

            {item.data.options.map(option => (
              <MenuItem value={option.id} key={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Content>
    </DropdownWrapper>
  );
};

const DropdownWrapper = styled.div`
  // display: flex;
`;

const Title = styled.div`
  width: 200px;
`;

const Content = styled.div`
  // margin: 0 20px;
`;

export default DropdownCustom;
