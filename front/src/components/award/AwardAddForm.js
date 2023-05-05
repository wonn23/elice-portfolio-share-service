/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Col, Form, FloatingLabel, Row } from 'react-bootstrap';
import styled from 'styled-components';
import useInput from 'hooks/useInput';
import DatePicker from 'react-datepicker';
import { addAward } from 'modules/sagas/award';

import { useDispatch } from 'react-redux';

import 'lib/styles/award/AwardAddForm.css';

const AwardAddForm = ({ setVisible, portfolioOwnerId }) => {
  const dispatch = useDispatch();

  const [association, onChangeAssociation] = useInput('');
  const [contest, onChangeContest] = useInput('');
  const [startDate, onChangeStartDate] = useState(new Date());
  const [prize, onChangePrize] = useInput('');
  const [detail, onChangeDetail] = useInput('');

  const onClick = () => {
    setVisible(false);
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    const newAwardData = {
      userId: portfolioOwnerId,
      association,
      contest,
      startDate,
      prize,
      detail,
    };
    dispatch(addAward(newAwardData));
    setVisible(false);
  };

  return (
    <Form
      onSubmit={onSubmitForm}
      controlid="formEducation"
      style={{ marginLeft: '0px' }}
    >
      <Form.Group style={{ marginBottom: '12px' }}>
        <Row>
           <Col sm="auto" style={{ paddingTop: '8px' }}>
              <p id="ColAwardDate">수상일자</p>
            </Col>
            <Col>
              <DatePicker
                id="formStartDate"
                dateFormat="yyyy년 MM월 dd일"
                dateFormatCalendar="yyyy년 MM월"
                selected={startDate}
                onChange={(date) => onChangeStartDate(date)}
                withPortal
              />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group style={{ marginBottom: '12px' }}>
        <Form.Control
          id="formAssociation"
          type="text"
          placeholder="기관 이름을 입력해 주세요."
          value={association}
          onChange={onChangeAssociation}
        />
      </Form.Group>

      <Form.Group style={{ marginBottom: '12px' }}>
        <Form.Control
          id="formContest"
          type="text"
          placeholder="대회명을 입력해 주세요."
          value={contest}
          onChange={onChangeContest}
        />
      </Form.Group>

      <Form.Group style={{ marginBottom: '12px' }}>
        <Form.Control
          id="formPrize"
          type="text"
          placeholder="수상명 입력해 주세요."
          value={prize}
          onChange={onChangePrize}
        />
      </Form.Group>

      <FloatingLabel
        controlId="floatingTextarea"
        label="상세내용"
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
        <Button id="btnAwardConfirm" variant="primary" type="submit" style={{ marginRight: '4px' }}>
          확인
        </Button>
        <Button
          id="btnAwardCancel"
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

export default AwardAddForm;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin: 32px 0;
`;
