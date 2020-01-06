import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Editor } from '@tinymce/tinymce-react';

const TINY_API_KEY = 'z39fysztyoavfi56ajlyryx9feto25yc4ilnzx1u4nxpy0hp';

const specialChars = [
  { text: 'username', value: '[user name]' },
  { text: 'contact', value: '[contact]' },
  { text: 'phone number', value: '[phone number]' }
];

const ParagraphCustom = ({ onChange, item }) => {
  return (
    <ParagraphWrapper className="---Paragraph">
      <Editor
        id={item.id}
        apiKey={TINY_API_KEY}
        value={item.data.content}
        init={{
          plugins: 'link image code autoresize',
          toolbar:
            'undo redo | bold italic | alignleft aligncenter alignright | code',
          autoresize_on_init: false,
          selector: `div#${item.id}`,
          setup: editor => {
            editor.ui.registry.addAutocompleter('specialchars', {
              ch: '[',
              minChars: 0,
              columns: 'auto',
              fetch: pattern => {
                let matchedChars = specialChars.filter(char => {
                  return char.text.indexOf(pattern) !== -1;
                });

                return new window.tinymce.util.Promise(resolve => {
                  let results = matchedChars.map(char => {
                    return {
                      value: char.value,
                      text: char.text,
                      icon: char.value
                    };
                  });
                  resolve(results);
                });
              },
              onAction: (autocompleteApi, rng, value) => {
                editor.selection.setRng(rng);
                editor.insertContent(value);
                autocompleteApi.hide();
              }
            });
          }
        }}
        onChange={(event, editor) =>
          onChange({
            ...item,
            data: { ...item.data, content: event.target.getContent() }
          })
        }
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

  .tox {
    tox-collection--grid {
      tox-collection__group {
        flex-direction: column;
      }
    }
  }
`;

ParagraphCustom.propTypes = {
  onChange: PropTypes.func,
  item: PropTypes.object
};

export default ParagraphCustom;
