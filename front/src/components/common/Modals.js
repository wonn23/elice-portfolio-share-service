/* eslint-disable react/prop-types */
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';

function Modals({ show, setModalShow, setIsConfirmed }) {
  const handleClose = () => setModalShow(false);

  const handleEdit = () => {
    setIsConfirmed(true);
    setModalShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontWeight: '600' }}>학력</Modal.Title>
      </Modal.Header>
      <Modal.Body>수정하시겠습니까?</Modal.Body>
      <Modal.Footer>
        <ButtonCancel onClick={handleClose}>취소</ButtonCancel>
        <ButtonEdit onClick={handleEdit}>수정</ButtonEdit>
      </Modal.Footer>
    </Modal>
  );
}

export default Modals;

const ButtonCancel = styled(Button)`
  border: solid 2px #1e1f20;
  border-radius: 20px;

  background-color: #ffffff;
  color: #1e1f20;

  &:hover {
    background-color: #cecece;
    border: solid 2px #1e1f20;
  }
`;

const ButtonEdit = styled(Button)`
  border: solid 2px #1e1f20;
  border-radius: 20px;

  background-color: #1e1f20;
  color: #ffffff;

  &:hover {
    background-color: #000000;
    border: solid 2px #000000
  }

  &:active {
    background-color: #000000;
    border: solid 2px #000000;
  }
`;
