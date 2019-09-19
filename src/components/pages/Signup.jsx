import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import axios from 'axios';
// import {} from '../../../api/index.php';

console.log('Hostname: ', window.location.hostname);
console.log('Pathname: ', window.location.pathname);
console.log('Origin: ', window.location.origin);
console.log('Host: ', window.location.host);
console.log('Protocol: ', window.location.protocol);
console.log('PUBLIC_URL: ', process.env.NODE_ENV);

const nodeEnv = process.env.NODE_ENV;

const REACT_APP_API = '/samex-login/api/index.php';

class Signup extends Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {
      nameValue: undefined,
      emailValue: undefined,
      confirmEmailValue: undefined,
      passwordValue: undefined,
      confirmValue: undefined,
      nameError: false,
    };
    this.onNameInputChange = this.onNameInputChange.bind(this);
    this.onEmailInputChange = this.onEmailInputChange.bind(this);
    this.onEmailConfirmInputChange = this.onEmailConfirmInputChange.bind(this);
    this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
    this.onPasswordConfirmInputChange = this.onPasswordConfirmInputChange.bind(
      this,
    );
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount () {
    this.setState({
      nameValue: 'Name',
      emailValue: 'Email',
      emailConfirmValue: 'Confirm Email',
      passwordValue: 'Password',
      confirmValue: 'Confirm Password',
    });
  }

  shouldComponentUpdate (nextState) {
    if (this.state.nameError !== nextState.nameError) {
      return true;
    }
    return false;
  }

  onNameInputChange (e) {
    const regex = /^[a-z]{2,9}$/;
    const stringToTest = e.target.value;
    this.setState({ nameValue: e.target.value });

    if (!regex.test(stringToTest)) {
      this.setState({ nameError: true });
    } else {
      this.setState({ nameError: false });
    }
  }

  onEmailInputChange (e) {
    this.setState({ userNameValue: e.target.value });
  }

  onEmailConfirmInputChange (e) {
    this.setState({ emailConfirmValue: e.target.value });
  }

  onPasswordInputChange (e) {
    this.setState({ passwordValue: e.target.value });
  }

  onPasswordConfirmInputChange (e) {
    this.setState({ confirmValue: e.target.value });
  }

  onFormSubmit = (e) => {
    e.preventDefault();

    if (nodeEnv === 'development') {
      alert(
        'We are not able to reach the api. Please use a development server for PHP, with MAMP, WAMP, XAMPP or AMPPS',
      );
    } else {
      axios({
        method: 'post',
        url: `${REACT_APP_API}`,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS, POST, PUT',
          'Access-Control-Allow-Headers':
            'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
        },
        data: this.state,
      })
        .then(() => {
          console.log('Sent!');
        })
        .catch(() => {
          console.log('Error.');
        });
    }
  };

  render () {
    const { classes } = this.props;
    const { nameError } = this.state;

    return (
      <div>
        <FormWrapper>
          <Heading className="mb-sm">Sign Up</Heading>
          <form onSubmit={this.onFormSubmit}>
            <TextField
              id="name"
              type="text"
              fullWidth
              placeholder="Name"
              variant="outlined"
              margin="dense"
              label="Name"
              error={nameError}
              onChange={this.onNameInputChange}
            />
            {nameError ? (
              <ErrorMessage>
                Please enter a name between 1 and 9 characters
              </ErrorMessage>
            ) : null}
            <TextField
              // id="email"
              type="email"
              fullWidth
              placeholder="Email"
              variant="outlined"
              margin="dense"
              label="Email"
              onChange={this.onEmailInputChange}
            />
            <TextField
              id="email-confirm"
              type="email"
              fullWidth
              placeholder="Confirm Email"
              variant="outlined"
              margin="dense"
              label="Confirm Email"
              onChange={this.onConfirmEmailInputChange}
            />
            <TextField
              id="password"
              type="password"
              fullWidth
              placeholder="Password"
              variant="outlined"
              margin="dense"
              label="Password"
              onChange={this.onPasswordInputChange}
            />
            <TextField
              id="password-confirm"
              type="password"
              fullWidth
              placeholder="Confirm Password"
              variant="outlined"
              margin="dense"
              label="Confirm Password"
              onChange={this.onPasswordConfirmInputChange}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              classes={{ root: classes.buttonRoot }}
            >
              Sign Up
            </Button>
          </form>
          <div className="mt-xs">
            Already have an account?
            {' '}
            <Link to="/login">Login</Link>
          </div>
        </FormWrapper>
      </div>
    );
  }
}

const styles = () => ({
  buttonRoot: {
    margin: 0,
    marginTop: 8,
    height: 43,
  },
});

const FormWrapper = styled.div`
  width: 65%;
  margin: 0 auto;
  max-width: 540px;
  margin-top: ${({ theme }) => theme.spacing.md};
  background: white;
  padding: ${({ theme }) => theme.spacing.md};
`;

const Heading = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.main};
`;

const ErrorMessage = styled.div`
  width: 100%;
  color: #FF6327;
  border-radius: 2px;
  border: none;
  font-size: 14px;
  margin: -8px 0 ${({ theme }) => theme.spacing.sm} 0;
`;

export default withStyles(styles)(Signup);
