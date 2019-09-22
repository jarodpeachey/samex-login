/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      emailValue: '',
      passwordValue: '',
      emailError: false,
      passwordError: false,
      mainMessageType: '',
      mainMessage: '',
    };
    this.onEmailInputChange = this.onEmailInputChange.bind(this);
    this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.clearMainError = this.clearMainError.bind(this);
    this.clearFields = this.clearFields.bind(this);
  }

  componentDidMount () {
    this.setState({
      emailValue: 'Email',
      passwordValue: 'Password',
    });
  }

  shouldComponentUpdate (nextState) {
    if (this.state.mainMessage !== nextState.mainMessage) {
      return true;
    }
    if (this.state.mainMessageType !== nextState.mainMessageType) {
      return true;
    }
    if (this.state.emailValue !== nextState.emailValue) {
      return true;
    }
    if (this.state.passwordValue !== nextState.passwordValue) {
      return true;
    }
    return false;
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

  onFormSubmit (e) {
    e.preventDefault();

    if (
      this.state.emailValue === '' ||
      this.state.passwordValue === '' ||
      this.state.mainMessageError
    ) {
      alert('Please fill in all the fields.');
    } else {
      const bodyFormData = new FormData();
      bodyFormData.set('email', this.state.emailValue);
      bodyFormData.set('password', this.state.passwordValue);

      axios({
        method: 'POST',
        url: `${REACT_APP_API}/verify.php`,
        config: {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
        data: bodyFormData,
      })
        .then((res) => {
          console.log('Sent! Response: ', res);
          if (res.data.match) {
            this.setState({
              mainMessageType: 'success',
              mainMessage: 'Success! You are now being redirected to the welcome page.',
            });

            this.clearFields();

            setTimeout(() => {
              this.props.history.push('/samex-login/welcome');
            }, 1000);
          } else {
            this.setState({
              mainMessageType: 'error',
              mainMessage: 'Your email/password is incorrect.',
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
      emailValue: '',
      passwordValue: '',
    });
  }

  render () {
    const { classes } = this.props;
    const {
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
          <Heading>Log In</Heading>
          <form onSubmit={this.onFormSubmit}>
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
              id="password"
              type="password"
              fullWidth
              placeholder="Password"
              variant="outlined"
              margin="dense"
              label="Password"
              onChange={this.onPasswordInputChange}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              classes={{ root: classes.buttonRoot }}
            >
              Login
            </Button>
          </form>
          <SubLink>
            Don
            {"'"}
            t have an account?
            {' '}
            <Link to="/samex-login/signup">Signup</Link>
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
`;

const Message = styled.div`
  width: 100%;
  color: white;
  border-radius: 2px;
  border: none;
  padding: ${props => (props.main ? '12px' : null)};
  font-size: 14px;
  margin: -8px 0 ${({ theme }) => theme.spacing.sm} 0;
  background: ${props => (props.main ? props.error ? '#f66359' : '#6abd6d' : null)}
`;

const SubLink = styled.div`
  margin-top: 4px;
`;

export default withStyles(styles)(Signup);
