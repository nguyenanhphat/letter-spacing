import React from "react";
import Progress from "react-progress-2";
import styled from "styled-components";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { TemplateNew, TemplatePage } from "./modules/templates";
import { LetterEditor } from "./modules/letters";
import {
  PrivateLayout,
  PublicLayout,
  PRIMARY_COLOR,
  APP_HOME
} from "./modules/commons";
import { SignInPage, SignUpPage, checkLogin } from "./modules/auths";
import fetchHelper from "./helpers/FetchHelper";
import "react-progress-2/main.css";
import "./App.css";

fetchHelper.addBeforeRequestInterceptor(() => Progress.show());
fetchHelper.addAfterResonseInterceptor(() => Progress.hide());

const isLogin = () => {
  const authToken = Cookies.get("authToken");

  if (authToken) {
    checkLogin();
    fetchHelper.addDefaultHeader("Authorization", `Bearer ${authToken}`);
  }

  return authToken;
};

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLogin() && restricted ? (
          <Redirect
            to={{ pathname: "/pandadoc", state: { from: props.location } }}
          />
        ) : (
          <PublicLayout>
            <Component {...props} />
          </PublicLayout>
        )
      }
    />
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLogin() ? (
          <PrivateLayout title={rest.title}>
            <Component {...props} />
          </PrivateLayout>
        ) : (
          <Redirect
            to={{
              pathname: "/pandadoc/sign-in",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const App = () => {
  return (
    <div className="App">
      <ProgressWrapper>
        <Progress.Component />
      </ProgressWrapper>

      <Router>
        <PrivateRoute
          path={APP_HOME}
          component={TemplatePage}
          title="Template Management"
          exact
        />
        <PrivateRoute
          path={`${APP_HOME}/template/:templateId`}
          component={TemplateNew}
          title="Template Design"
          exact
        />
        <PublicRoute
          path={`${APP_HOME}/sign-in`}
          component={SignInPage}
          exact
          restricted
        />
        <PublicRoute
          path={`${APP_HOME}/admin/sign-in`}
          component={SignInPage}
          exact
          restricted
        />
        <PublicRoute
          path={`${APP_HOME}/sign-up`}
          component={SignUpPage}
          exact
          restricted
        />
        <PrivateRoute path={"/letter-editor"} component={LetterEditor} exact />
      </Router>
    </div>
  );
};

const ProgressWrapper = styled.div`
  height: 0.2rem;
  .loader-60devs {
    z-index: 10051;
  }
  .loader-60devs .loader-60devs-progress {
    height: 0.2rem;
    width: 100%;
    background-color: ${PRIMARY_COLOR};
  }
  /* comment below if you want react-progress-2 to block UI */
  .loader-60devs::before {
    display: none;
  }
`;

export default App;
