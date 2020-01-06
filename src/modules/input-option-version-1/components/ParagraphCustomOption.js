import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import EditableField from './EditableField';

const ParagraphCustomOption = ({
  editItem,
  setIsEdit,
  userEditableField,
  setUserEditableField,
  updateDocumentTemplateItem
}) => {
  return (
    <ParagraphWrapper>
      <EditableField
        editItem={editItem}
        setIsEdit={setIsEdit}
        userEditableField={userEditableField}
        setUserEditableField={setUserEditableField}
        updateDocumentTemplateItem={updateDocumentTemplateItem}
      />
    </ParagraphWrapper>
  );
};

const ParagraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
`;

ParagraphCustomOption.propTypes = {
  item: PropTypes.object,
  onChange: PropTypes.func
};

export default ParagraphCustomOption;
