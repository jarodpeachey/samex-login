import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {
  static propTypes = {
    pathname: PropTypes.string,
  };

  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {}

  shouldComponentUpdate (nextProps) {
    if (this.props.pathname !== nextProps.pathname) {
      return true;
    }
    if (this.props.baseURL !== nextProps.baseURL) {
      return true;
    }
    return false;
  }

  render () {
    return (
      <span>
        {location.pathname === '/samex-login/welcome' ? (
          <Wrapper>
            <Container className="container">
              <MobileRow>
                <Link to={`${this.props.basename}`}>
                  <BrandName>Samex</BrandName>
                </Link>
              </MobileRow>
            </Container>
          </Wrapper>
        ) : (
          <Wrapper>
            <Container className="container">
              <Row>
                <ColumnOne>
                  <Link to={`${this.props.basename}`}>
                    <BrandName>Samex</BrandName>
                  </Link>
                </ColumnOne>
                <ColumnTwo>
                  <CustomMenu className="menu">
                    <CustomMenuItem className="menu-item">
                      <Link to={`${this.props.basename}signup`}>Signup</Link>
                    </CustomMenuItem>
                    <CustomMenuItem className="menu-item">
                      <Link to={`${this.props.basename}login`}>Login</Link>
                    </CustomMenuItem>
                  </CustomMenu>
                </ColumnTwo>
              </Row>
            </Container>
          </Wrapper>
        )}
      </span>
    );
  }
}

const Container = styled.div`
  padding: 0;
`;

const CustomMenu = styled.ul`
  list-style: none;
  border-radius: 10px;
`;

const CustomMenuItem = styled.li`
  // padding: 12px !important;
  border-bottom: 1px solid transparent;
  :hover {
    border-bottom: ${props => (props.noBorderOnHover ? '1px solid transparent' : '1px solid white')};
    background: #037dd0;
    transition-duration: 0.25s;
  }
  font-weight: ${props => (props.active ? 'bold' : 400)};
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  background: ${({ theme }) => theme.colors.primary} !important;
  color: white !important;
  width: 100%;
  padding: 16px 0;
  box-shadow: 0 20px 40px -25px #666;
  z-index: 999 !important;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MobileRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ColumnOne = styled.div`
  width: fit-content;
`;

const ColumnTwo = styled.div`
  flex: 1 1 0;
  display: flex;
  justify-content: flex-end;
`;

const BrandName = styled.h1`
  color: white !important;
  margin: 0 !important;
`;

export default withRouter(Header);
