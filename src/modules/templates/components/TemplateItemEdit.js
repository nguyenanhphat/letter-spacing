import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import {
  ParagraphCustomOption,
  CheckboxCustomOption,
  InputCustomOption,
  LabelCustomOption,
  ImageCustomOption,
  VideoCustomOption,
  LogoCustomOption,
  DatePickerCustomOption,
  DividerCustomOption,
  FooterCustomOption,
  SignatureCustomOption
} from '../../input-option-version-1';

const ELEMENT_OPTION = {
  Checkboxes: CheckboxCustomOption,
  Text: InputCustomOption,
  Header: LabelCustomOption,
  Paragraph: ParagraphCustomOption,
  Image: ImageCustomOption,
  Video: VideoCustomOption,
  Logo: LogoCustomOption,
  DatePicker: DatePickerCustomOption,
  Dropdown: CheckboxCustomOption,
  Divider: DividerCustomOption,
  Footer: FooterCustomOption,
  Signature: SignatureCustomOption
};

const TemplateItemEdit = ({
  item,
  updateTemplateItem,
  setIsEdit,
  userEditableField,
  setUserEditableField,
  updateDocumentTemplateItem
}) => {
  const withCustomOption = Component => {
    return (
      <Component
        onChange={updateTemplateItem}
        editItem={item}
        setIsEdit={setIsEdit}
        userEditableField={userEditableField}
        setUserEditableField={setUserEditableField}
        updateDocumentTemplateItem={updateDocumentTemplateItem}
      />
    );
  };

  return (
    <Wrapper>
      <Typography
        variant="h2"
        style={{ textAlign: 'center', fontWeight: 'bold', padding: '50px 0' }}
      >
        Template Item Edit
      </Typography>

      {withCustomOption(ELEMENT_OPTION[item.data.element])}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 20px;
`;

TemplateItemEdit.propTypes = {
  item: PropTypes.object,
  updateTemplateItem: PropTypes.func
};

export default TemplateItemEdit;
