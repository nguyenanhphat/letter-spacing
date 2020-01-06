import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { Typography, Input, Button } from '@material-ui/core';
import { updateUserEditableField } from '../action';
import { getTemplateId } from '../../commons';

const EditableField = ({
  editItem,
  setIsEdit,
  userEditableField,
  setUserEditableField,
  updateDocumentTemplateItem,
  history
}) => {
  const onChangeField = (id, newValue, oldValue) => {
    setUserEditableField(
      userEditableField.map(field => {
        return field.id === id
          ? { ...field, value: newValue ? `[${newValue}]` : null, oldValue }
          : field;
      })
    );
  };

  const formatValue = value => {
    return value ? value.replace(/\[|\]/g, '') : '';
  };

  return (
    <>
      {userEditableField.map(field => (
        <Field key={field.id}>
          <Typography>{field.fieldName}</Typography>
          <Input
            value={formatValue(field.value)}
            onChange={event => {
              onChangeField(
                field.id,
                event.target.value,
                field.value || field.fieldName
              );
            }}
            fullWidth
          />
        </Field>
      ))}
      {!_.isEmpty(userEditableField) && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            updateUserEditableField(
              getTemplateId(history.location.pathname),
              userEditableField
            );
            setIsEdit(false);
            updateDocumentTemplateItem();
          }}
        >
          UPDATE EDITABLE FIELD
        </Button>
      )}
    </>
  );
};

const Field = styled.div`
  margin: 20px 0;
`;

export default withRouter(EditableField);
