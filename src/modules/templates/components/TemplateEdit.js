import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TemplateEdit = props => {
  const { template } = props;

  return <TemplateEditWrapper>{template.name}</TemplateEditWrapper>;
};

const TemplateEditWrapper = styled.div`
  border: 1px solid;
  margin: 10;
`;

TemplateEdit.propTypes = {
  template: PropTypes.object
};

export default TemplateEdit;
