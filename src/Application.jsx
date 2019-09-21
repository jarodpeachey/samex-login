/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import styled, { ThemeProvider } from 'styled-components';
import theme from './mui-theme';
import styledTheme from './styled-theme';
import Header from './components/Header';
import Main from './components/pages/Main';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Welcome from './components/pages/Welcome';

class Application extends Component {
  static propTypes = {
    history: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {}

  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={styledTheme}>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <>
                  {<Header {...props} pathname={location.pathname} />}
                  <Wrapper>
                    <Main {...props} />
                  </Wrapper>
                </>
              )}
            />
            <Route
              exact
              path="/signup"
              render={props => (
                <>
                  {<Header {...props} pathname={location.pathname} />}
                  <Wrapper>
                    <Signup {...props} />
                  </Wrapper>
                </>
              )}
            />
            <Route
              exact
              path="/login"
              render={props => (
                <>
                  {<Header {...props} pathname={location.pathname} />}
                  <Wrapper>
                    <Login {...props} />
                  </Wrapper>
                </>
              )}
            />
            <Route
              exact
              path="/welcome"
              render={props => (
                <>
                  {<Header {...props} pathname={location.pathname} />}
                  <Wrapper>
                    <Welcome {...props} />
                  </Wrapper>
                </>
              )}
            />
            <Route
              exact
              path="/samex-login"
              render={props => (
                <>
                  {<Header {...props} pathname={location.pathname} />}
                  <Wrapper>
                    <Main {...props} />
                  </Wrapper>
                </>
              )}
            />
            <Route
              exact
              path="/samex-login/signup"
              render={props => (
                <>
                  {<Header {...props} pathname={location.pathname} />}
                  <Wrapper>
                    <Signup {...props} />
                  </Wrapper>
                </>
              )}
            />
            <Route
              exact
              path="/samex-login/login"
              render={props => (
                <>
                  {<Header {...props} pathname={location.pathname} />}
                  <Wrapper>
                    <Login {...props} />
                  </Wrapper>
                </>
              )}
            />
            <Route
              exact
              path="/samex-login/welcome"
              render={props => (
                <>
                  {<Header {...props} pathname={location.pathname} />}
                  <Wrapper>
                    <Welcome {...props} />
                  </Wrapper>
                </>
              )}
            />
          </Switch>
        </ThemeProvider>
      </MuiThemeProvider>
    );
  }
}

const Wrapper = styled.div`
  // background: ${({ theme }) => theme.colors.gray1};
  height: 100% !important;
  padding-top: 68px;
`;

export default Application;
