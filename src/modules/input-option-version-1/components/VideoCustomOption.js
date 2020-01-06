import React from 'react';
import { Button, TextField, CircularProgress } from '@material-ui/core';
import { uploadFile } from '../../commons';

const VideoCustomOption = ({ editItem, onChange }) => {
  const [item, setItem] = React.useState({ ...editItem });
  const [isUpload, setIsUpload] = React.useState(false);

  const onChangeVideo = src => {
    setItem({
      ...item,
      data: {
        ...item.data,
        src
      }
    });
  };

  const handleFileSelect = evt => {
    let f = evt.target.files[0]; // FileList object
    setIsUpload(true);

    uploadFile('video', f).then(response => {
      onChangeVideo(response.url);
      setIsUpload(false);
    });
  };

  return (
    <div>
      <TextField
        margin="normal"
        label="Video URL"
        value={item.data.src}
        onChange={e => onChangeVideo(e.target.value)}
        fullWidth
      />

      <input
        type="file"
        accept="video/*"
        id={item.id}
        onChange={handleFileSelect}
      />

      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '30px' }}
        disabled={isUpload}
        onClick={() => {
          onChange(item);
        }}
        fullWidth
      >
        {isUpload ? <CircularProgress color="primary" size={20} /> : 'UPDATE'}
      </Button>
    </div>
  );
};

export default VideoCustomOption;
