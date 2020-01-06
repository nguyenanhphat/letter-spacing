import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Editor } from '@tinymce/tinymce-react';

import { TINY_API_KEY } from '..';

const ParagraphCustom = ({ onChange, item }) => {
  const updateContent = content => {
    onChange({
      ...item,
      data: {
        ...item.data,
        content
      }
    });
  };

  return (
    <ParagraphWrapper className="---Paragraph">
      <Editor
        id={item.id}
        apiKey={TINY_API_KEY}
        value={item.data.content}
        init={{
          plugins: 'link image code autoresize',
          menubar: false,
          autoresize_on_init: false,
          forced_root_block: false
        }}
        onFocusOut={(event, editor) => {
          updateContent(editor.getContent());
        }}
        inline
      />
    </ParagraphWrapper>
  );
};

const ParagraphWrapper = styled.div`
  .mce-edit-focus {
    :focus {
      outline: none;
    }
  }

  .mce-content-body {
    word-break: break-all;
  }
`;

ParagraphCustom.propTypes = {
  onChange: PropTypes.func,
  item: PropTypes.object
};

export default ParagraphCustom;
