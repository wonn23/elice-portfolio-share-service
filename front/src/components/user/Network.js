/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from 'modules/sagas/users';
import styled from 'styled-components';

import UserCard from './UserCard';

function Network() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, errorUsers, user, loading } = useSelector(
    ({ users, user, loading }) => ({
      users: users.users,
      errorUsers: users.error,
      user: user.user,
      loading: loading['users/GET_USERS'],
    }),
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    dispatch(getUsers());
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (errorUsers) {
      setError(errorUsers);
    }
  }, [errorUsers]);

  if (error) {
    return <ErrorMessage>에러발생</ErrorMessage>;
  }

  if (loading) {
    return 'loading...';
  }

  return (
    <div>
      {!loading && (
        <Container fluid>
          <Row>
            {!loading && users && (
              <Row
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'left',
                  gap: '2rem',
                }}
              >
                {users.map((user) => (
                  <Col
                    style={{ padding: '4px 0px 16px 0px', flexGrow: 'unset' }}
                  >
                    <UserCard key={user.id} user={user} isNetwork />
                  </Col>
                ))}{' '}
              </Row>
            )}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Network;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 1rem;
  margin-top: 1rem;
`;
