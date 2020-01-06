import React from 'react';
import styled from 'styled-components';
import EditableField from './EditableField';

const InputCustomOption = ({ editItem, setIsEdit }) => {
  return (
    <InputWrapper>
      <EditableField editItem={editItem} setIsEdit={setIsEdit} />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
`;

export default InputCustomOption;
