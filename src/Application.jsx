/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import styled, { ThemeProvider } from 'styled-components';
import theme from './mui-theme';
import styledTheme from './styled-theme';
import Header from './components/Header';
import Main from './components/pages/Main';
import { getData } from './actions/dataActions';

class Application extends Component {
  static propTypes = {
    getData: PropTypes.func,
    history: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount () {
    this.props.getData();
  }

  render () {
    const { testData } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={styledTheme}>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <>
                  {
                    <Header
                      {...props}
                      pathname={location.pathname}
                      data={testData}
                    />
                  }
                  <Wrapper>
                    <Main {...props} data={testData} />
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

const mapStateToProps = state => ({
  testData: state.dataReducer.data,
});

export default connect(
  mapStateToProps,
  { getData },
)(Application);
