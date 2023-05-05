/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'modules/reducers/user';
import { initAuth } from 'modules/reducers/auth';
import { initProfile } from 'modules/reducers/profile';

import Toggle from 'lib/theme/Toggle';

import 'lib/styles/Header.css';

const Header = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const onClick = () => {
    sessionStorage.removeItem('userToken');
    dispatch(logout());
    dispatch(initAuth());
    dispatch(initProfile());
    navigate('/');
  };

  return (
    <Nav
      activeKey={location.pathname}
      style={{ padding: '1rem' }}
      // className="d-flex justify-content-center align-items-center"
      id="Header"
    >
      <Nav.Item id="headerNavigateMyPage">
        <Nav.Link
          onClick={() => navigate('/')}
          style={{ color: '#1E1F20', fontWeight: '500' }}
        >
          MY PORTFOILO
        </Nav.Link>
      </Nav.Item>
      <Nav.Item id="headerNavigateNetwork">
        <Nav.Link
          onClick={() => navigate('/network')}
          style={{ color: '#1E1F20', fontWeight: '500' }}
        >
          NETWORK
        </Nav.Link>
      </Nav.Item>

      <Nav.Item id="headerTitle">
        <div style={{ color: '#1E1F20', fontWeight: '600' }}>
          안녕하세요, 포트폴리오 공유 서비스입니다
        </div>
      </Nav.Item>

      {user && (
        <Nav.Item id="headerLogout">
          <Nav.Link
            onClick={onClick}
            style={{ color: '#1E1F20', fontWeight: '500' }}
          >
            LOGOUT
          </Nav.Link>
        </Nav.Item>
      )}
      <Nav.Item id="headerToggle">
        <Toggle theme={theme} toggleTheme={toggleTheme} />
      </Nav.Item>
    </Nav>
  );
};

export default Header;
