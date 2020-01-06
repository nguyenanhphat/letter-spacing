import fetchHelper from '../../../helpers/FetchHelper';
import Cookies from 'js-cookie';
import { toastrFail, toastrSuccess, APP_HOME } from '../../commons';

const ENTER_KEY = 13;

const setSession = (authToken, redirectCallback = () => null) => {
  process.env.NODE_ENV === 'development' && Cookies.set('authToken', authToken);
  setTimeout(redirectCallback(), 100);
};

const setUserType = userType => {
  Cookies.set('userType', userType);
};

const login = (body, redirect) => {
  fetchHelper
    .fetch(`/api/account/login`, {
      method: 'POST',
      body: JSON.stringify({
        ...body,
        productData: {},
        formToken: '6f8fac2033d1d74161a0e78bc41a156a'
      })
    })
    .then(([response, status]) => {
      if (response.success) {
        toastrSuccess(response.message);
        setSession(response.authToken, redirect);
        setUserType(response.userType);
      } else {
        toastrFail(response.message);
      }
    });
};

const adminLogin = (body, redirect) => {
  fetchHelper
    .fetch(`/api/documents/padmin/login`, {
      method: 'POST',
      body: JSON.stringify({
        ...body
      })
    })
    .then(([response, status]) => {
      if (response.statusCode === 200) {
        toastrSuccess(response.message);
        setSession(response.authToken, redirect);
        setUserType(response.userType);
      } else {
        toastrFail(response.message);
      }
    });
};

const signup = body => {
  return fetchHelper.fetch(`/api/account/signup`, {
    method: 'POST',
    body: JSON.stringify({
      ...body,
      formToken: '6f8fac2033d1d74161a0e78bc41a156a'
    })
  });
};

const logout = async () => {
  await fetchHelper.fetch(`/account/logout`, {
    medhod: 'POST',
    body: JSON.stringify({
      authToken: Cookies.get('authToken')
    })
  });
  fetchHelper.addDefaultHeader('authorization', '');

  setSession('', () => {
    window.location.href = window.location.origin + APP_HOME;
  });
};

const checkLogin = () => {
  const authToken = Cookies.get('authToken');

  fetch(`/api/account/check-login`, {
    method: 'POST',
    body: JSON.stringify({
      authToken
    })
  })
    .then(response => response.json())
    .then(response => {
      if (!response.success) {
        logout();
      }
    });
};

export { setSession, logout, signup, login, checkLogin, adminLogin, ENTER_KEY };
