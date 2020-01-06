import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Typography, Button, Popover } from '@material-ui/core';
import { ImagePicker } from '../../commons';
import { getCoverBackground } from '..';

const CoverPageOption = ({ templateData, onChangeCover }) => {
  const { coverData } = templateData;
  const [isPopover, setIsPopover] = useState(null);
  const [imageList, setImageList] = useState(null);

  useEffect(() => {
    getCoverBackground(templateData.id).then(([response, statusCode]) => {
      if (response.success) {
        setImageList(response.images);
      }
    });
  }, [templateData.id]);

  const isLogoPosition = item => {
    return item.value === coverData.logo.data.left ? 'primary' : 'inherit';
  };

  const isColumnStatus = item => {
    return item.value === coverData.content.columnCount ? 'primary' : 'inherit';
  };

  const LOGO_POSITION = [
    {
      title: 'Left',
      value: true,
      onChange: () =>
        onChangeCover('logo', {
          ...coverData.logo,
          data: {
            ...coverData.logo.data,
            left: true
          }
        })
    },
    {
      title: 'Right',
      value: false,
      onChange: () =>
        onChangeCover('logo', {
          ...coverData.logo,
          data: {
            ...coverData.logo.data,
            left: false
          }
        })
    }
  ];

  const COLUMN_SHOW = [
    {
      title: 'One Column',
      value: 1,
      onChange: () => {
        onChangeCover('content', {
          ...coverData.content,
          columnCount: 1
        });
      }
    },
    {
      title: 'Two Column',
      value: 2,
      onChange: () => {
        onChangeCover('content', {
          ...coverData.content,
          columnCount: 2
        });
      }
    }
  ];

  const onChangeBackground = imageSelected => {
    onChangeCover('background', imageSelected.imageOriginal);

    setIsPopover(null);
  };

  return (
    <CoverPageWrapper>
      <Typography
        style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '20px' }}
      >
        Cover Page
      </Typography>

      <EditItem>
        <Typography>Background image</Typography>

        {imageList && (
          <Button
            aria-owns={Boolean(isPopover) ? 'simple-popper' : undefined}
            aria-haspopup="true"
            variant="contained"
            onClick={event => setIsPopover(event.currentTarget)}
          >
            Change Background
          </Button>
        )}

        <Popover
          id="simple-popper"
          open={Boolean(isPopover)}
          anchorEl={isPopover}
          onClose={() => setIsPopover(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
          <ImagePicker onChange={onChangeBackground} imageList={imageList} />
        </Popover>
      </EditItem>

      <EditItem>
        <Typography>Logo Image</Typography>

        <div style={{ display: 'flex' }}>
          {LOGO_POSITION.map((item, index) => (
            <Button
              key={index}
              variant="contained"
              color={isLogoPosition(item)}
              style={{ margin: '5px' }}
              onClick={item.onChange}
            >
              {item.title}
            </Button>
          ))}
        </div>
      </EditItem>

      <EditItem>
        <Typography>Text Layout</Typography>

        <div style={{ display: 'flex' }}>
          {COLUMN_SHOW.map((item, index) => (
            <Button
              key={index}
              variant="contained"
              color={isColumnStatus(item)}
              style={{ margin: '5px' }}
              onClick={item.onChange}
            >
              {item.title}
            </Button>
          ))}
        </div>
      </EditItem>
    </CoverPageWrapper>
  );
};

const CoverPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditItem = styled.div`
  border-bottom: 1px solid #e5e5e5;
  padding: 20px;
`;

export default CoverPageOption;
