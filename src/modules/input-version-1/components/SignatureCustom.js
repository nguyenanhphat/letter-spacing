import React, {
  useState,
  useRef,
  Fragment,
  useEffect,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, Button, Typography } from '@material-ui/core';
import SignaturePad from 'react-signature-canvas';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/AddAPhotoRounded';
import ModalUI from '../../commons/components/ModalUI';

const styles = () => ({
  sigPad: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  }
});

const SignatureCustom = ({ onChange, item: editItem, classes }) => {
  const [item, setItem] = useState({ ...editItem });
  const [onModal, setModal] = useState(false);
  const [isDraw, setDraw] = useState(true);
  const sigPadRef = useRef(null);

  useEffect(() => setItem(editItem), [editItem, onModal]);

  const initRef = useCallback(
    node => {
      if (node !== null) {
        sigPadRef.current = node;
        sigPadRef.current.fromDataURL(item.data.src);
      }
    },
    [item.data.src]
  );

  const handleFileSelect = async evt => {
    const f = evt.target.files[0]; // FileList object
    const base64Data = await toBase64(f);
    setItem({
      ...item,
      data: {
        ...item.data,
        src: base64Data
      }
    });
    setDraw(true);
  };

  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  const getPositionStyle = position => {
    switch (position) {
      case 'left':
        return 'flex-start';
      case 'center':
        return 'center';
      case 'right':
        return 'flex-end';
      default:
        return 'flex-start';
    }
  };

  const clearStyleBtn = {
    position: 'absolute',
    right: 5,
    top: 5,
    zIndex: 9999,
    overflow: 'hidden',
    backgroundColor: 'white'
  };

  return (
    <Fragment>
      <SignatureWrapper
        className="signature"
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100px' }}
        onClick={() => setModal(true)}
      >
        <Image
          style={{ alignSelf: getPositionStyle(item.data.position) }}
          src={editItem.data.src}
          width="200px"
          height="90px"
        />
      </SignatureWrapper>

      <ModalUI open={onModal} onClose={() => setModal(false)}>
        <ModalContainer>
          <ButtonGroup color="primary">
            <Button
              style={{ backgroundColor: isDraw ? '#151f2a' : 'white' }}
              onClick={() => setDraw(true)}
            >
              <Typography style={{ color: isDraw ? 'white' : '#151f2a' }}>
                Draw
              </Typography>
            </Button>

            <Button
              style={{ backgroundColor: isDraw ? 'white' : '#151f2a' }}
              onClick={() => setDraw(false)}
            >
              <Typography style={{ color: isDraw ? '#151f2a' : 'white' }}>
                Upload
              </Typography>
            </Button>
          </ButtonGroup>

          {isDraw && (
            <SignatureContainer>
              <Button
                onClick={() => {
                  setItem({
                    ...item,
                    data: {
                      ...item.data,
                      src: ''
                    }
                  });
                  sigPadRef.current.clear();
                }}
                style={clearStyleBtn}
                variant="outlined"
              >
                clear
              </Button>

              <SignaturePad
                dotSize={0.5}
                onEnd={() => {
                  setItem({
                    ...item,
                    data: {
                      ...item.data,
                      src: sigPadRef.current.toDataURL()
                    }
                  });
                }}
                canvasProps={{ className: classes.sigPad }}
                ref={initRef}
              />
            </SignatureContainer>
          )}

          {!isDraw && (
            <UploadContainer>
              <Typography>Upload an image of your signature</Typography>

              <IconWrapper htmlFor="image-upload" style={{ opacity: 1 }}>
                <input
                  type="file"
                  accept="image/*"
                  id="image-upload"
                  style={{ display: 'none' }}
                  onChange={handleFileSelect}
                />
                <IconButton
                  color="primary"
                  aria-label="Upload picture"
                  component="span"
                  size="large"
                >
                  <AddIcon style={{ height: '50px', width: '50px' }} />
                </IconButton>
              </IconWrapper>
            </UploadContainer>
          )}

          <Button
            style={{ alignSelf: 'flex-end', marginTop: 20 }}
            variant="contained"
            color="primary"
            onClick={() => {
              onChange(item);
              setModal(false);
            }}
          >
            Save
          </Button>
        </ModalContainer>
      </ModalUI>
    </Fragment>
  );
};

SignatureCustom.propTypes = {
  onChange: PropTypes.func,
  item: PropTypes.object
};

const SignatureWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const ModalContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const SignatureContainer = styled.div`
  height: 200px;
  width: 100%;
  border-radius: 5px;
  border-width: 1px;
  border-color: rgb(187, 187, 187);
  border-style: solid;
  margin-top: 20px;
  padding: 1px;
  position: relative;
`;

const UploadContainer = styled.div`
  height: 200px;
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 200px;
`;

const IconWrapper = styled.label`
  opacity: ${props => (props.onImage ? 1 : 0)};
`;

export default withStyles(styles)(SignatureCustom);
