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

  render () {
    console.log(this.props.basename);
    return (
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={styledTheme}>
          <Switch>
            <Route
              exact
              path={this.props.basename}
              render={props => (
                <>
                  {<Header {...props} basename={this.props.basename} pathname={location.pathname} />}
                  <Wrapper>
                    <Main {...props} basename={this.props.basename} />
                  </Wrapper>
                </>
              )}
            />
            <Route
              exact
              path={`${this.props.basename}signup`}
              render={props => (
                <>
                  {<Header {...props} basename={this.props.basename} pathname={location.pathname} />}
                  <Wrapper>
                    <Signup {...props} basename={this.props.basename} />
                  </Wrapper>
                </>
              )}
            />
            <Route
              exact
              path={`${this.props.basename}login`}
              render={props => (
                <>
                  {<Header {...props} basename={this.props.basename} pathname={location.pathname} />}
                  <Wrapper>
                    <Login {...props} basename={this.props.basename} />
                  </Wrapper>
                </>
              )}
            />
            <Route
              exact
              path={`${this.props.basename}welcome`}
              render={props => (
                <>
                  {<Header {...props} pathname={location.pathname} basename={this.props.basename} />}
                  <Wrapper>
                    <Welcome {...props} basename={this.props.basename} />
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
