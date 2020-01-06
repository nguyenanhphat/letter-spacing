import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import Icon from '../../commons/asset';
const icons = {
  TABLE: Icon.tableIcon,
  HEADER: Icon.headingIcon,
  TEXT: Icon.textIcon,
  PARAGRAPH: Icon.paragraphIcon,
  CHECKBOXES: Icon.checkboxIcon,
  IMAGE: Icon.imageIcon,
  VIDEO: Icon.videoIcon,
  LOGO: Icon.logoIcon,
  DATEPICKER: Icon.datePickerIcon,
  DROPDOWN: Icon.dropDownIcon,
  RATING: Icon.ratingIcon,
  DIVIDER: Icon.dividerIcon,
  COVERPAGE: Icon.coverPageIcon,
  PAGEBREAK: Icon.pageBreakIcon,
  FOOTER: Icon.footerIcon,
  SIGNATURE: Icon.signatureIcon
};

const ElementWrapper = ({ label, itemType }) => {
  return (
    <Element>
      <img
        alt=""
        src={icons[itemType]}
        style={{
          height: 16,
          marginBottom: 7
        }}
      />
      <Typography style={{ fontSize: 13, color: '#777777' }}>
        {label}
      </Typography>
    </Element>
  );
};

const Element = styled.div`
  border: 0.5px solid #e5e5e5;
  border-radius: 3px;
  flex: 1;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  margin-right: 5px;
  padding: 10px;
  height: 70px;
`;

export default ElementWrapper;
