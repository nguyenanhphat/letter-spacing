import React from 'react';
import styled from 'styled-components';
import { LinearProgress } from '@material-ui/core';
import { uploadFile } from '../../commons';

const ImageCustom = ({ item, onChange }) => {
  const [isUpload, setIsUpload] = React.useState(false);

  const handleFileSelect = evt => {
    let f = evt.target.files[0]; // FileList object
    setIsUpload(true);

    uploadFile('image', f).then(response => {
      setIsUpload(false);

      onChange({
        ...item,
        data: {
          ...item.data,
          src: response.url
        }
      });
    });
  };

  return (
    <ImageWrapper>
      <Image>
        <img
          width="auto"
          height="365px"
          alt={item.data.id}
          src={item.data.src}
        />

        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id={item.id}
          onChange={handleFileSelect}
        />
      </Image>

      {isUpload && (
        <LinearProgress color="primary" style={{ marginBottom: '5px' }} />
      )}
    </ImageWrapper>
  );
};

const ImageWrapper = styled.div`
  height: 400px;
`;

const Image = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 390px;

  input {
    margin: auto;
  }

  &:hover {
    input {
      display: unset !important;
    }
  }
`;

export default ImageCustom;
