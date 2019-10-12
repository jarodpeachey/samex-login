import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Welcome extends Component {
  static propTypes = {};

  constructor (props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount () {
    axios({
      method: 'get',
      url: `${this.props.basename}api/users/get.php`,
    })
      .then((res) => {
        console.log(res);
        this.setState({ user: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render () {
    const { user } = this.state;
    return (
      <Wrapper>
        <div className="container py-none">
          <Title>
            Welcome,
            {' '}
            {user.name}
            ! So glad you
            {"'"}
            re here! Thanks for signing in.
          </Title>
        </div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Title = styled.h3`
  text-align: center;
  font-weight: bold;
  font-family: raleway;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  letter-spacing: 4px;
`;

export default withRouter(Welcome);
