/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import axios from 'axios';

const REACT_APP_API = 'http://localhost/samex-login/api/users';

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
      mainMessageType: '',
      mainMessage: '',
    };
    this.onNameInputChange = this.onNameInputChange.bind(this);
    this.onEmailInputChange = this.onEmailInputChange.bind(this);
    this.onEmailConfirmInputChange = this.onEmailConfirmInputChange.bind(this);
    this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
    this.onPasswordConfirmInputChange = this.onPasswordConfirmInputChange.bind(
      this,
    );
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.clearMainError = this.clearMainError.bind(this);
    this.clearFields = this.clearFields.bind(this);
  }

  shouldComponentUpdate (nextState) {
    if (this.state.mainMessage !== nextState.mainMessage) {
      return true;
    }
    if (this.state.mainMessage !== nextState.mainMessage) {
      return true;
    }
    if (this.state.mainMessageError !== nextState.mainMessageError) {
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

    this.clearMainError();
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

    this.clearMainError();
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

    this.clearMainError();
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

    this.clearMainError();
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

    this.clearMainError();
  }

  onFormSubmit (e) {
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
      this.state.passwordConfirmValue === '' ||
      this.state.mainMessageError
    ) {
      this.setState({
        mainMessageType: 'error',
        mainMessage: 'Please fix all the errors',
      });
    } else {
      const bodyFormData = new FormData();
      bodyFormData.set('name', this.state.nameValue);
      bodyFormData.set('email', this.state.emailValue);
      bodyFormData.set('password', this.state.passwordValue);

      axios({
        method: 'POST',
        url: `${REACT_APP_API}/create.php`,
        config: {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
        data: bodyFormData,
      })
        .then((res) => {
          console.log('Sent! Response: ', res);
          if (res.data.email_used) {
            this.setState({
              mainMessageType: 'error',
              mainMessage: (
                <span>
                  This email is already connected to an account. You can log in
                  {' '}
                  <Link to="/samex-login/login">here.</Link>
                </span>
              ),
            });
          } else if (res.data.success) {
            this.setState({
              mainMessageType: 'success',
              mainMessage: 'Success! You are now registered.',
            });
            this.clearFields();
            this.props.history.push('/samex-login/login');
          } else {
            this.setState({
              mainMessageType: 'error',
              mainMessage: 'There was a problem adding you. Please try again',
            });
          }
        })
        .catch(() => {
          console.log('Error.');
        });
    }
  }

  clearMainError () {
    if (this.setState({ mainMessageType: '', mainMessage: '' }));
  }

  clearFields () {
    this.setState({
      nameValue: '',
      emailValue: '',
      emailConfirmValue: '',
      passwordValue: '',
      passwordConfirmValue: '',
    });
  }

  render () {
    const { classes } = this.props;
    const {
      nameError,
      emailError,
      emailConfirmError,
      passwordError,
      passwordConfirmError,
      mainMessage,
      mainMessageType,
    } = this.state;

    return (
      <div className="container">
        <FormWrapper>
          {mainMessage !== '' ? (
            <Message main error={mainMessageType === 'error'}>
              {mainMessage}
            </Message>
          ) : null}
          <Heading>Sign Up</Heading>
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
              <Message error>
                Please enter a name between 1 and 9 characters
              </Message>
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
              <Message error>
                Please enter a valid email including the infix @samex
              </Message>
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
              <Message error>Your emails do not match</Message>
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
              <Message error>
                Your password must:
                <ErrorList>
                  <li>Contain at least 1 uppercase letter</li>
                  <li>Contain at least 2 numbers</li>
                  <li>End with a $</li>
                  <li>Be between 8 and 16 characters long</li>
                </ErrorList>
              </Message>
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
              <Message error>Your passwords do not match</Message>
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
          <SubLink>
            Already have an account?
            {' '}
            <Link to="/samex-login/login">Login</Link>
          </SubLink>
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
  max-width: 769px;
  margin: 0 auto;
  max-width: 540px;
  margin-top: ${({ theme }) => theme.spacing.md};
  background: white;
  padding: ${({ theme }) => theme.spacing.md};
`;

const Heading = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.main};
  margin-bottom: 8px;
`;

const Message = styled.div`
  width: 100%;
  color: ${props => (props.main ? 'white' : '#f66359')};
  border-radius: 2px;
  border: none;
  padding: ${props => (props.main ? '12px' : null)};
  font-size: 14px;
  margin: -8px 0 ${({ theme }) => theme.spacing.sm} 0;
  background: ${props => (props.main ? (props.error ? '#f66359' : '#6abd6d') : null)};
`;

const ErrorList = styled.ul`
  margin-top: 12px;
  margin-left: ${({ theme }) => theme.spacing.md};
`;

const SubLink = styled.div`
  margin-top: 4px;
`;

export default withStyles(styles)(Signup);
