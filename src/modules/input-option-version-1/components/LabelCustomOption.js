import React from 'react';
import { Typography, Switch } from '@material-ui/core';
import styled from 'styled-components';
import EditableField from './EditableField';

const LabelCustomOption = ({
  editItem,
  onChange,
  setIsEdit,
  userEditableField,
  setUserEditableField,
  updateDocumentTemplateItem
}) => {
  return (
    <LabelWrapper>
      <EditableField
        editItem={editItem}
        setIsEdit={setIsEdit}
        userEditableField={userEditableField}
        setUserEditableField={setUserEditableField}
        updateDocumentTemplateItem={updateDocumentTemplateItem}
      />
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <Typography>Show page numbers</Typography>
        <Switch
          color="primary"
          checked={editItem.data.showPage}
          onChange={() =>
            onChange(
              {
                ...editItem,
                data: {
                  ...editItem.data,
                  showPage: !editItem.data.showPage
                }
              },
              true
            )
          }
          value
        />
      </div>
    </LabelWrapper>
  );
};

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
`;

export default LabelCustomOption;
