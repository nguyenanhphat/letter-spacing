import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { FormHelperText, Button, TextField } from '@material-ui/core';

import { ENTER_KEY, login, adminLogin } from '../action';
import { APP_HOME } from '../../commons';

const SignInPage = ({ history, location }) => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState('');

  const isAdmin = location.pathname === '/pandadoc/admin/sign-in';

  const handleLogin = () => {
    if (userEmail && password) {
      if (isAdmin) {
        adminLogin({ email: userEmail, password }, () => {
          history.push('/pandadoc');
        });
      } else {
        login({ userEmail, password }, () => {
          history.push(location.state.from.pathname);
        });
      }
    } else {
      setErrorLogin('Email and Password must be filled');
    }
  };

  return (
    <Wrapper>
      <LoginForm>
        <Content>
          <Title>Dashboard Login</Title>

          <TextFieldStyle
            className="input"
            label="Email*"
            variant="outlined"
            value={userEmail}
            onChange={event => setUserEmail(event.target.value)}
            onKeyDown={e => e.keyCode === ENTER_KEY && handleLogin()}
          />

          <TextFieldStyle
            className="input"
            type="password"
            label="Password*"
            variant="outlined"
            value={password}
            onChange={event => setPassword(event.target.value)}
            onKeyDown={e => e.keyCode === ENTER_KEY && handleLogin()}
          />

          {errorLogin && (
            <FormHelperText style={{ color: '#b00020' }}>
              {errorLogin}
            </FormHelperText>
          )}

          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 16 }}
            onClick={handleLogin}
          >
            Login
          </Button>

          {!isAdmin && (
            <Button
              color="primary"
              onClick={() => history.push(`${APP_HOME}/sign-up`)}
            >
              Sign up
            </Button>
          )}
        </Content>
      </LoginForm>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
`;

const LoginForm = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Content = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5% 10%;
  border-radius: 5px;
  background: white;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);

  .input {
    margin: 10px 0;
  }
`;

const Title = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10%;
`;

const TextFieldStyle = styled(TextField)``;

SignInPage.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignInPage);
