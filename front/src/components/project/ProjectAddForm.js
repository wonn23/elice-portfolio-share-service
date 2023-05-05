/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Col, Form, FloatingLabel, Row } from 'react-bootstrap';
import styled from 'styled-components';
import useInput from 'hooks/useInput';
import DatePicker from 'react-datepicker';
import { addProject } from 'modules/sagas/project';

import { useDispatch } from 'react-redux';

import 'lib/styles/project/ProjectAddForm.css';

const ProjectAddForm = ({ setVisible, portfolioOwnerId }) => {
  const dispatch = useDispatch();

  const [projectName, onChangeProjectName] = useInput('');
  const [projectLink, onChangeProjectLink] = useInput('');
  const [introduction, onChangeIntroduction] = useInput('');
  const [startDate, onChangeStartDate] = useState(new Date());
  const [myRole, onChangeMyRole] = useInput('');
  const [detail, onChangeDetail] = useInput('');

  const onClick = () => {
    setVisible(false);
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    const newProjectData = {
      userId: portfolioOwnerId,
      projectName,
      projectLink,
      introduction,
      startDate,
      myRole,
      detail,
    };
    dispatch(addProject(newProjectData));

    setVisible(false);
  };

  return (
    <Form
    onSubmit={onSubmitForm}
    id="formProject"
    style={{ marginLeft: '0px' }}
    >
      <Form.Group style={{ marginBottom: '12px' }}>
        <Form.Control
          id="formProjectName"
          type="text"
          placeholder="프로젝트명을 입력해 주세요."
          value={projectName}
          onChange={onChangeProjectName}
        />
      </Form.Group>

      <Form.Group style={{ marginBottom: '12px' }}>
        <Row>
          <Col sm="auto" style={{ paddingTop: '8px' }}>
              <p id="pProjectDate">진행일자</p>
          </Col>
          <Col sm="auto">
            <DatePicker
            id="formDate"
            dateFormat="yyyy년 MM월 dd일"
            dateFormatCalendar="yyyy년 MM월"
            selected={startDate}
            onChange={(date) => onChangeStartDate(date)}
            withPortal
          />
          </Col>
          <Col sm="auto" style={{ paddingTop: '8px' }}>
              <p id="pProjectLink">프로젝트 링크</p>
            </Col>
          <Col sm="6">
            <Form.Control
            id="formProjectLink"
            type="text"
            placeholder="링크를 입력해 주세요."
            value={projectLink}
            onChange={onChangeProjectLink}
          />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group style={{ marginBottom: '12px' }}>
        <Form.Control
          id="formIntroduction"
          type="text"
          placeholder="프로젝트 소개 내용을 입력해주세요."
          value={introduction}
          onChange={onChangeIntroduction}
        />
      </Form.Group>

      <Form.Group style={{ marginBottom: '12px' }}>
        <Form.Control
          id="formMyRole"
          type="text"
          placeholder="나의 역할을 입력해 주세요."
          value={myRole}
          onChange={onChangeMyRole}
        />
      </Form.Group>

      <FloatingLabel
        controlId="floatingTextarea"
        label="상세 설명을 입력해 주세요."
        className="mb-3"
      >
        <Form.Control
          id="formDetail"
          as="textarea"
          className="form-control"
          placeholder="Leave a comment here"
          value={detail}
          onChange={onChangeDetail}
        />
      </FloatingLabel>

      <ButtonWrapper>
        <Button id="btnProjectConfirm" variant="primary" type="submit" style={{ marginRight: '4px' }}>
          확인
        </Button>
        <Button
          id="btnProjectCancel"
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

export default ProjectAddForm;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin: 32px 0;
`;
