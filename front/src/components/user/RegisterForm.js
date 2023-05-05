/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useInput from 'hooks/useInput';
import {
  validateEmail,
  validatePassword,
  validateName,
} from 'lib/util/validate';
import { useDispatch, useSelector } from 'react-redux';
import { register } from 'modules/sagas/auth';
import { initAuth } from 'modules/reducers/auth';

import 'lib/styles/user/RegisterForm.css';

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [confirmPassword, onChangeConfirmPassword] = useInput('');
  const [name, onChangeName] = useInput('');

  const { user, authError, loading } = useSelector(({ auth, loading }) => ({
    user: auth.auth,
    authError: auth.authError,
    loading: loading['auth/REGISTER'],
  }));

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const isPasswordSame = password === confirmPassword;
  const isNameValid = validateName(name);

  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ email, password, name }));
  };

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      setError('회원가입 실패');
    }
  }, [authError]);

  useEffect(() => {
    if (user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (loading) {
    return 'loading...';
  }

  return (
    <div>
      {!loading && (
        <Container id="ContainerRegister">
          <Row id="rowRegister">
            <Col lg={8}>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>이메일 주소</Form.Label>
                  <Form.Control
                    id="registerEmail"
                    type="email"
                    autoComplete="off"
                    value={email}
                    onChange={onChangeEmail}
                  />
                  {!isEmailValid && (
                    <Form.Text id="text-success">
                      이메일 형식이 올바르지 않습니다.
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>비밀번호</Form.Label>
                  <Form.Control
                    id="registerPassword"
                    type="password"
                    autoComplete="off"
                    value={password}
                    onChange={onChangePassword}
                  />
                  {!isPasswordValid && (
                    <Form.Text id="text-success">
                      비밀번호는 4글자 이상으로 설정해 주세요.
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>비밀번호 재확인</Form.Label>
                  <Form.Control
                    id="registerConfirmPassword"
                    type="password"
                    autoComplete="off"
                    value={confirmPassword}
                    onChange={onChangeConfirmPassword}
                  />
                  {!isPasswordSame && (
                    <Form.Text id="text-success">
                      비밀번호가 일치하지 않습니다.
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>이름</Form.Label>
                  <Form.Control
                    id="registerName"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onChangeName}
                  />
                  {!isNameValid && (
                    <Form.Text id="text-success">
                      이름은 2글자 이상으로 설정해 주세요.
                    </Form.Text>
                  )}
                </Form.Group>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <Form.Group as={Row} className="mt-3 text-center">
                  <Col sm={{ span: 20 }}>
                    <Button
                      id="btnSignup"
                      variant="primary"
                      type="submit"
                      disabled={!isFormValid}
                    >
                      회원가입
                    </Button>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mt-3 text-center">
                  <Col sm={{ span: 20 }}>
                    <Button
                      id="btnLogin"
                      variant="light"
                      onClick={() => navigate('/login')}
                    >
                      로그인하기
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default RegisterForm;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 1rem;
  margin-top: 1rem;
`;
