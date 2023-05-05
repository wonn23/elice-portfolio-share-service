/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import useInput from 'hooks/useInput';

import { useDispatch } from 'react-redux';
import { addStory } from 'modules/sagas/story';

import 'lib/styles/story/PhotoPanelAddForm.css';

const PhotoPanelAddForm = ({ setVisible, portfolioOwnerId, setIsAdded }) => {
  const dispatch = useDispatch();

  const [description, onChangeDescription] = useInput('');
  const [storyFile, setStoryFile] = useState(null);

  const onChangeStoryFile = (e) => {
    setStoryFile(e.target.files[0]);
  };

  const onClick = () => {
    setVisible(false);
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userId', portfolioOwnerId);
    formData.append('description', description);
    formData.append('storyFile', storyFile);

    const formDataObj = Object.fromEntries(formData);
    console.log(formDataObj);

    dispatch(addStory(formData));
    setVisible(false);
    setIsAdded(true);
  };

  return (
    <Form
      onSubmit={onSubmitForm}
      controlid="formStory"
      style={{ margin: '24px 0 0 0' }}
      encType="multipart/form-data"
    >
      <Form.Group style={{ marginBottom: '12px' }}>
        <Form.Control
          id="formDescriptionStory"
          type="text"
          placeholder="당신의 스토리를 이야기해주세요."
          value={description}
          onChange={onChangeDescription}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>&nbsp;&nbsp;Photo Story</Form.Label>
        <Form.Control
          id="formFileStory"
          type="file"
          onChange={onChangeStoryFile}
        />
      </Form.Group>

      <ButtonWrapper>
        <Button
          id="btnEduConfirm"
          variant="primary"
          type="submit"
          style={{ marginRight: '4px' }}
        >
          확인
        </Button>
        <Button
          id="btnEduCancel"
          variant="secondary"
          onClick={onClick}
          style={{ marginLeft: '4px' }}
        >
          취소
        </Button>
      </ButtonWrapper>
    </Form>
  );
};

export default PhotoPanelAddForm;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
