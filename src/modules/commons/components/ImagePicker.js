import React from 'react';
import styled from 'styled-components';
import { Typography, LinearProgress } from '@material-ui/core';
import { uploadFile } from '..';

const ImagePicker = ({ onChange, imageList }) => {
  const [list, setList] = React.useState([...imageList]);
  const [isUpload, setIsUpload] = React.useState(false);

  const handleFileSelect = evt => {
    let f = evt.target.files[0]; // FileList object
    setIsUpload(true);

    uploadFile('image', f).then(response => {
      setIsUpload(false);

      if (response.success) {
        setList([
          ...list,
          {
            ...response
          }
        ]);
      }
    });
  };

  return (
    <PickerWrapper>
      <Typography style={{ color: '#fff' }}>Image Picker</Typography>

      <ImageList>
        <Item onClick={() => onChange({ imageOriginal: null })} />
        {list.map((item, index) => (
          <Item
            key={`image-${index}`}
            background={item.imagePreview}
            onClick={() => onChange(item)}
          />
        ))}
      </ImageList>

      <UploadButton htmlFor="cover-background">UPLOAD IMAGE</UploadButton>

      {isUpload && <LinearProgress style={{ marginTop: '10px' }} />}

      <input
        type="file"
        accept="image/*"
        id="cover-background"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />
    </PickerWrapper>
  );
};

const PickerWrapper = styled.div`
  padding: 10px;
  width: 250px;
  display: flex;
  flex-direction: column;
  background-color: #59616b;
`;

const ImageList = styled.div`
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.div`
  margin: 2px;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  background: #fff;
  background-image: url(${props => props.background});
  background-position: center;
  background-repeat: no-repeat;

  &:hover {
    cursor: pointer;
  }
`;

const UploadButton = styled.label`
  background-color: #151f2a;
  color: #fff;
  border-radius: 5px;
  border: 1px solid #fff;
  padding: 5px;
  text-align: center;

  &:hover {
    cursor: poiter;
  }
`;

export default ImagePicker;
