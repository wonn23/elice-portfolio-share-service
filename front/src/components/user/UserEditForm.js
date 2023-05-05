/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import useInput from 'hooks/useInput';
import { updateUser } from 'modules/sagas/user';
import styled from 'styled-components';

import 'lib/styles/user/UserEditForm.css';

const UserEditForm = ({ user, setIsEditing }) => {
  const dispatch = useDispatch();
  const [name, onChangeName] = useInput(user.name);
  const [email, onChangeEmail] = useInput(user.email);
  const [description, onChangeDescription] = useInput(user.description);
  const [error, setError] = useState(null);

  const { loading } = useSelector(({ loading }) => ({
    loading: loading['user/UPDATE_USER'],
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(
        updateUser({
          id: user.id,
          name,
          email,
          description,
        }),
      );
    } catch (err) {
      setError(err);
    }

    setIsEditing(false);
  };

  if (loading) {
    return 'loading...';
  }

  return (
    <div>
      {!loading && (
        <Card className="mb-2" id="UserEditCard">
          <CardWrapper>
            <Card.Body>
              <Card.Text id="cardTitleMyProfile">
                EDIT
                <br />
                ME
              </Card.Text>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="useEditName" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="이름"
                    value={name}
                    onChange={onChangeName}
                  />
                </Form.Group>

                <Form.Group controlId="userEditEmail" className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={onChangeEmail}
                  />
                </Form.Group>

                <Form.Group controlId="userEditDescription">
                  <Form.Control
                    type="text"
                    placeholder="정보, 인사말"
                    value={description}
                    onChange={onChangeDescription}
                  />
                </Form.Group>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <Form.Group as={Row} className="mt-3 text-center">
                  <Col sm="auto">
                    <ButtonWrapper>
                      <Button
                        id="btnProfileConfirm"
                        variant="primary"
                        type="submit"
                        className="me-3"
                      >
                        확인
                      </Button>
                      <Button
                        id="btnProfileCancel"
                        variant="secondary"
                        onClick={() => setIsEditing(false)}
                      >
                        취소
                      </Button>
                    </ButtonWrapper>
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
          </CardWrapper>
        </Card>
      )}
    </div>
  );
};

export default UserEditForm;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 1rem;
  margin-top: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 12px 0 0 52px;
`;

const CardWrapper = styled.div`
  border-style: solid;
  border-width: 2px;
  border-radius: 10px;
  border-color: #1e1f20;

  margin: 10px;
  padding: 8px 0px;
`;
