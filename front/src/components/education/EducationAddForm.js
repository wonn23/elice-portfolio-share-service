/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import useInput from 'hooks/useInput';

import { useDispatch } from 'react-redux';
import { addEducation } from 'modules/sagas/education';

import 'lib/styles/education/EducationAddForm.css';

// 컴포넌트 밖에 선언된 상수 배열
const statusList = ['재학중', '학사졸업', '석사졸업', '박사졸업'];

const EducationAddForm = ({ setVisible, portfolioOwnerId }) => {
  const dispatch = useDispatch();

  const [school, onChangeSchool] = useInput('');
  const [major, onChangeMajor] = useInput('');
  const [status, onChangeStatus] = useInput('');

  const onClick = () => {
    setVisible(false);
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    const newEducationData = {
      userId: portfolioOwnerId,
      school,
      major,
      status,
    };
    dispatch(addEducation(newEducationData));
    setVisible(false);
  };

  return (
    <Form
      onSubmit={onSubmitForm}
      controlid="formEducation"
      style={{ marginLeft: '0px' }}
    >
      <Form.Group style={{ marginBottom: '12px' }}>
        <Form.Control
          id="formSchool"
          type="text"
          placeholder="학교 이름을 입력해 주세요."
          value={school}
          onChange={onChangeSchool}
        />
      </Form.Group>

      <Form.Group style={{ marginBottom: '12px' }}>
        <Form.Control
          id="formMajor"
          type="text"
          placeholder="전공명을 입력해 주세요."
          value={major}
          onChange={onChangeMajor}
        />
      </Form.Group>

      <RadioWrapper>
        <Form.Group controlid="formStatus" style={{ marginBottom: '8px' }}>
          {statusList.map((status) => (
            <Form.Check
              key={status}
              inline
              label={status}
              name="group1"
              type="radio"
              value={status}
              id={`inline-${status}`}
              onChange={onChangeStatus}
            />
          ))}
        </Form.Group>
      </RadioWrapper>

      <ButtonWrapper>
        <Button id="btnEduConfirm" variant="primary" type="submit" style={{ marginRight: '4px' }}>
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

export default EducationAddForm;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin: 32px 0;
`;

const RadioWrapper = styled.div`
  margin: 24px 0 0 0;
`;
