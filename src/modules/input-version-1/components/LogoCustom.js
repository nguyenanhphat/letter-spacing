import React from 'react';
import styled from 'styled-components';
import { LinearProgress } from '@material-ui/core';
import { uploadFile } from '../../commons';

const LogoCustom = ({ item, onChange }) => {
  const [isUpload, setIsUpload] = React.useState(false);

  const handleFileSelect = evt => {
    let f = evt.target.files[0]; // FileList object
    setIsUpload(true);

    uploadFile('image', f).then(response => {
      setIsUpload(false);
      updateItem('src', response.url);
    });
  };

  const updateItem = (key, value) => {
    onChange({
      ...item,
      data: {
        ...item.data,
        [key]: value
      }
    });
  };

  const isLeft = item.data.left;

  return (
    <LogoWrapper
      style={{
        display: 'flex',
        height: '230px',
        flexDirection: isLeft ? 'row' : 'row-reverse'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <img width="240px" height="210px" alt={item.id} src={item.data.src} />

        {isUpload && <LinearProgress width="210px" />}

        <InputStyle
          type="file"
          accept="image/*"
          className="icon-wrapper"
          style={{ display: 'none' }}
          id={item.id}
          name={item.id}
          onChange={handleFileSelect}
        />
      </div>

      <InputStyle
        value={item.data.label}
        onChange={event => updateItem('label', event.target.value)}
        style={{
          flex: 1,
          fontWeight: 'bold',
          fontSize: '24px',
          margin: '10px',
          border: 'unset'
        }}
      />
    </LogoWrapper>
  );
};

const LogoWrapper = styled.div`
  &:hover {
    div {
      .icon-wrapper {
        display: unset !important;
      }
    }
  }
`;

const InputStyle = styled.input`
  &:focus {
    outline: none;
  }
`;

export default LogoCustom;
