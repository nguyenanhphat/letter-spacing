import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import {
  Typography,
  FormHelperText,
  Button,
  TextField,
  FormControl
} from '@material-ui/core';

import { toastrFail, APP_HOME } from '../../commons';
import { signup, setSession } from '../action';

const SignUpPage = ({ history }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    password: '',
    confirmPassword: '',
    userEmail: '',
    productData: {}
  });
  const [errorLogin, setErrorLogin] = useState('');

  const onChangeForm = (key, value) => {
    setFormData({
      ...formData,
      [key]: value
    });
  };

  const validateSignUp = () => {
    let error = '';
    if (formData.password !== formData.confirmPassword) {
      error = 'Confirm Password';
    }
    if (_.some(Object.values(formData), param => param === '')) {
      error = 'All of field must be inputted';
    }
    setErrorLogin(error);
    return error === '';
  };

  const handleSignUp = () => {
    if (validateSignUp()) {
      signup(formData).then(([response, statusCode]) => {
        if (response.success) {
          setSession(response.authToken, () => {
            history.push(`${APP_HOME}/`);
          });
        } else {
          toastrFail(response.message);
        }
      });
    } else {
      console.log('has error');
    }
  };

  return (
    <Wrapper>
      <LoginForm>
        <Content>
          <Typography style={{ fontSize: 24, fontWeight: 'bold' }}>
            Create your account
          </Typography>

          <FormControlStyle>
            <TextFieldStyle
              name="full-name"
              margin="normal"
              label="Full Name"
              autoComplete="fullName"
              value={formData.fullName}
              onChange={event => onChangeForm('fullName', event.target.value)}
            />
          </FormControlStyle>

          <FormControlStyle>
            <TextFieldStyle
              type="password"
              name="password"
              margin="normal"
              label="Password"
              autoComplete="password"
              value={formData.password}
              onChange={event => onChangeForm('password', event.target.value)}
            />
          </FormControlStyle>

          <FormControlStyle>
            <TextFieldStyle
              type="password"
              name="confirm-password"
              margin="normal"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={event =>
                onChangeForm('confirmPassword', event.target.value)
              }
            />
          </FormControlStyle>

          <FormControlStyle>
            <TextFieldStyle
              name="userEmail"
              margin="normal"
              label="User Email"
              autoComplete="userEmail"
              value={formData.userEmail}
              onChange={event => onChangeForm('userEmail', event.target.value)}
            />
          </FormControlStyle>

          {errorLogin && (
            <FormHelperText style={{ color: '#b00020' }}>
              {errorLogin}
            </FormHelperText>
          )}

          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 32 }}
            onClick={handleSignUp}
          >
            Sign up
          </Button>

          <Button
            fullWidth
            color="primary"
            style={{ marginTop: 10 }}
            onClick={() => history.push(`${APP_HOME}/sign-in`)}
          >
            BACK TO LOG IN
          </Button>
        </Content>
      </LoginForm>

      <Footer>
        <Content>
          <Typography style={{ fontSize: 10 }}>Form Builder Website</Typography>
        </Content>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100vh;
`;

const LoginForm = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const Content = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Footer = styled.div`
  justify-content: center;
  height: 30px;
  display: flex;
  align-items: center;
  background-color: #efefef;
`;
const TextFieldStyle = styled(TextField)`
  margin: 0px;
`;

const FormControlStyle = styled(FormControl)`
  margin-top: 12px;
  width: 100%;
`;

SignUpPage.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignUpPage);
