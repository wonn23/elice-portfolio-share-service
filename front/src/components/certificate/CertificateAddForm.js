/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import useInput from 'hooks/useInput';
import DatePicker from 'react-datepicker';
import { addCertificate } from 'modules/sagas/certificate';

import { useDispatch } from 'react-redux';

import 'lib/styles/certificate/CertificateAddForm.css';

const CertificateAddForm = ({ setVisible, portfolioOwnerId }) => {
  const dispatch = useDispatch();

  const [agency, onChangeAgency] = useInput('');
  const [credit, onChangeCredit] = useInput('');
  const [grade, onChangeGrade] = useInput('');
  const [acquireDate, onChangeAcquireDate] = useState(new Date());

  const onClick = () => {
    setVisible(false);
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    const newCertificateData = {
      userId: portfolioOwnerId,
      agency,
      credit,
      grade,
      acquireDate,
    };
    dispatch(addCertificate(newCertificateData));
    setVisible(false);
  };

  return (
    <Form
      onSubmit={onSubmitForm}
      id="formCertificate"
      style={{ marginLeft: '0px' }}
    >

      <Form.Group style={{ marginBottom: '12px' }}>
        <Form.Control
          id="formCredit"
          type="text"
          placeholder="자격증명을 입력해 주세요."
          value={credit}
          onChange={onChangeCredit}
        />
      </Form.Group>

      <Form.Group style={{ marginBottom: '12px' }}>
        <Form.Control
          id="formGrade"
          type="text"
          placeholder="등급 및 점수를 입력해 주세요."
          value={grade}
          onChange={onChangeGrade}
        />
      </Form.Group>

      <Form.Group style={{ marginBottom: '12px' }}>
        <Row>
          <Col sm="auto" style={{ paddingTop: '8px' }}>
              <p id="pCertificateAgency">발급기관</p>
          </Col>
          <Col>
              <Form.Control
            id="formAgency"
            type="text"
            placeholder="발급기관 입력해 주세요."
            value={agency}
            onChange={onChangeAgency}
          />
          </Col>
          <Col sm="auto" style={{ paddingTop: '8px' }}>
            <p id="pAcquireDate">취득일자</p>
          </Col>
          <Col>
            <DatePicker
              id="formAquireDate"
              dateFormat="yyyy년 MM월 dd일"
              dateFormatCalendar="yyyy년 MM월"
              selected={acquireDate}
              onChange={(date) => onChangeAcquireDate(date)}
              withPortal
            />
          </Col>
        </Row>
      </Form.Group>

      <ButtonWrapper>
        <Button id="btnCertificateConfirm" variant="primary" type="submit" style={{ marginRight: '4px' }}>
          확인
        </Button>
        <Button
          id="btnCertificateCancel"
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

export default CertificateAddForm;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin: 32px 0;
`;
