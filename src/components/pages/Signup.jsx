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

const REACT_APP_API = '/samex-login/api/users/create.php';

class Signup extends Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {
      nameValue: '',
      emailValue: '',
      emailConfirmValue: '',
      passwordValue: '',
      passwordConfirmValue: '',
      nameError: false,
      emailError: false,
      emailConfirmError: false,
      passwordError: false,
      passwordConfirmError: false,
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
    const regex = /^[a-zA-Z\s]{1,9}$/;
    const stringToTest = e.target.value;
    this.setState({ nameValue: e.target.value });

    if (!regex.test(stringToTest) && e.target.value !== '') {
      this.setState({ nameError: true });
    } else {
      this.setState({ nameError: false });
    }
  }

  onEmailInputChange (e) {
    const regex = /[^<>()[\]\\,;:%#^\s@"$&!@]+@(samex)\.[a-z]{2,3}/;
    const stringToTest = e.target.value;
    this.setState({ emailValue: e.target.value });

    console.log('Email regex: ', regex.test(stringToTest));

    if (!regex.test(stringToTest) && e.target.value !== '') {
      this.setState({ emailError: true });
    } else {
      this.setState({ emailError: false });
    }
  }

  onEmailConfirmInputChange (e) {
    const regex = /[^<>()[\]\\,;:%#^\s@"$&!@]+@(samex)\.[a-z]{2,3}/;
    const stringToTest = e.target.value;
    this.setState({ emailConfirmValue: e.target.value });

    if (
      (!regex.test(stringToTest) || e.target.value !== this.state.emailValue) &&
      e.target.value !== ''
    ) {
      this.setState({ emailConfirmError: true });
    } else {
      this.setState({ emailConfirmError: false });
    }
  }

  onPasswordInputChange (e) {
    const regexComplete = /^(?=.*[A-Z])(?=.*\d.*\d)[^\s]{9,15}\$$/;

    const stringToTest = e.target.value;
    this.setState({ passwordValue: e.target.value });

    if (!regexComplete.test(stringToTest) && e.target.value !== '') {
      this.setState({ passwordError: true });
    } else {
      this.setState({ passwordError: false });
    }
  }

  onPasswordConfirmInputChange (e) {
    const regex = /^.{8,14}\${1}$/;
    const stringToTest = e.target.value;
    this.setState({ passwordConfirmValue: e.target.value });

    if (
      (!regex.test(stringToTest) ||
        e.target.value !== this.state.passwordValue) &&
      e.target.value !== ''
    ) {
      this.setState({ passwordConfirmError: true });
    } else {
      this.setState({ passwordConfirmError: false });
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault();

    if (
      this.state.nameError ||
      this.state.emailError ||
      this.state.emailConfirmError ||
      this.state.passwordError ||
      this.state.passwordConfirmError ||
      this.state.nameValue === '' ||
      this.state.emailValue === '' ||
      this.state.emailConfirmValue === '' ||
      this.state.passwordValue === '' ||
      this.state.passwordConfirmValue === ''
    ) {
      alert('Please fix the errors');
    } else {
      console.log('Fields match.');
      if (nodeEnv === 'development') {
        alert(
          'We are not able to reach the api. Please use a development server for PHP, with MAMP, WAMP, XAMPP or AMPPS',
        );
      } else {
        const bodyFormData = new FormData();
        bodyFormData.set('name', this.state.nameValue);
        bodyFormData.set('email', this.state.emailValue);
        bodyFormData.set('password', this.state.passwordValue);

        axios({
          method: 'POST',
          url: `${REACT_APP_API}`,
          config: {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
          data: bodyFormData,
        })
          .then((res) => {
            console.log('Sent! Response: ', res);
          })
          .catch(() => {
            console.log('Error.');
          });
      }
    }
  };

  render () {
    const { classes } = this.props;
    const {
      nameError,
      emailError,
      emailConfirmError,
      passwordError,
      passwordConfirmError,
    } = this.state;

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
              error={emailError}
              onChange={this.onEmailInputChange}
            />
            {emailError ? (
              <ErrorMessage>
                Please enter a valid email including the infix @samex
              </ErrorMessage>
            ) : null}
            <TextField
              id="email-confirm"
              type="email"
              fullWidth
              placeholder="Confirm Email"
              variant="outlined"
              margin="dense"
              label="Confirm Email"
              error={emailConfirmError}
              onChange={this.onEmailConfirmInputChange}
            />
            {emailConfirmError ? (
              <ErrorMessage>Your emails do not match</ErrorMessage>
            ) : null}
            <TextField
              id="password"
              type="password"
              fullWidth
              placeholder="Password"
              variant="outlined"
              margin="dense"
              label="Password"
              error={passwordError}
              onChange={this.onPasswordInputChange}
            />
            {passwordError ? (
              <ErrorMessage>
                Your password must:
                <ErrorList>
                  <li>Contain at least 1 uppercase letter</li>
                  <li>Contain at least 2 numbers</li>
                  <li>End with a $</li>
                  <li>Be between 8 and 16 characters long</li>
                </ErrorList>
              </ErrorMessage>
            ) : null}
            <TextField
              id="password-confirm"
              type="password"
              fullWidth
              placeholder="Confirm Password"
              variant="outlined"
              margin="dense"
              label="Confirm Password"
              error={passwordConfirmError}
              onChange={this.onPasswordConfirmInputChange}
            />
            {passwordConfirmError ? (
              <ErrorMessage>Your passwords do not match</ErrorMessage>
            ) : null}
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
  color: #ff6327;
  border-radius: 2px;
  border: none;
  font-size: 14px;
  margin: -8px 0 ${({ theme }) => theme.spacing.sm} 0;
`;

const ErrorList = styled.ul`
  margin-top: 12px;
  margin-left: ${({ theme }) => theme.spacing.md};
`;

export default withStyles(styles)(Signup);
