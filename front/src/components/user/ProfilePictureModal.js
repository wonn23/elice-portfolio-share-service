/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

const ProfilePictureModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const { fetchUser } = useSelector(({ profile }) => ({
    fetchUser: profile.user,
  }));

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('File submitted:', file);
    const formData = new FormData();
    formData.append('userId', fetchUser.id);
    formData.append('profileFile', file);

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>프로필 사진 수정</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="formFile">
            <Form.Label>새로운 프로필 사진을 선택하세요.</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" type="submit" disabled={!file}>
            프로필 수정
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ProfilePictureModal;
