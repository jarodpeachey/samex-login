import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import axios from 'axios';
// import {} from '../../../api/post_receive.php';

console.log('Hostname: ', window.location.hostname);
console.log('Pathname: ', window.location.pathname);
console.log('Origin: ', window.location.origin);

const REACT_APP_API = `${window.location.origin}/api/index.php`;

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

  shouldComponentUpdate () {
    return false;
  }

  onNameInputChange (e) {
    this.setState({ nameValue: e.target.value });
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
    axios({
      method: 'post',
      url: `${REACT_APP_API}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS, POST, PUT',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
      },
      data: this.state,
    })
      .then(() => {
        console.log('Sent!');
      })
      .catch(() => {
        console.log('Error.');
      });
  };

  render () {
    const { classes } = this.props;

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
              onChange={this.onNameInputChange}
            />
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

export default withStyles(styles)(Signup);
