import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import { TINY_API_KEY } from '..';

const LabelCustom = ({ onChange, item }) => {
  return (
    <Editor
      id={item.id}
      apiKey={TINY_API_KEY}
      value={item.data.content}
      onChange={(event, editor) =>
        onChange({
          ...item,
          data: { ...item.data, content: event.target.getContent() }
        })
      }
      init={{
        plugins: 'link image code autoresize',
        toolbar: 'undo redo | formatselect | alignleft aligncenter alignright',
        menubar: false,
        autoresize_on_init: false
      }}
      inline
    />
  );
};

LabelCustom.propTypes = {
  onChange: PropTypes.func,
  item: PropTypes.object
};

export default LabelCustom;
