/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FloatingLabel, Row } from 'react-bootstrap';
import useInput from 'hooks/useInput';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Modals from 'components/common/Modals';
import DatePicker from 'react-datepicker';
import { updateAward } from 'modules/sagas/award';
import moment from 'moment-timezone';

import 'lib/styles/award/AwardEditForm.css';

const AwardEditForm = ({ awardData, setIsEditing }) => {
  const [modalShow, setModalShow] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const dispatch = useDispatch();

  const [association, onChangeAssociation] = useInput(awardData.association);
  const [contest, onChangeContest] = useInput(awardData.contest);
  const [startDate, onChangeStartDate] = useState(
    moment(awardData.startDate).tz('Asia/Seoul'),
  );
  const [prize, onChangePrize] = useInput(awardData.prize);
  const [detail, onChangeDetail] = useInput(awardData.detail);

  const onSubmitForm = (e) => {
    e.preventDefault();
    setModalShow(true);
  };

  useEffect(() => {
    if (isConfirmed) {
      const { _id } = awardData;
      const updatedAwardData = {
        _id,
        association,
        contest,
        startDate,
        prize,
        detail,
      };

      dispatch(updateAward(updatedAwardData));
      console.log(updatedAwardData);

      setIsEditing(false);
    }
  }, [
    association,
    awardData,
    contest,
    detail,
    dispatch,
    isConfirmed,
    prize,
    setIsEditing,
    startDate,
  ]);

  const onClick = () => {
    console.log(awardData);
    setIsEditing(false);
  };

  return (
    <>
      <Form
        onSubmit={onSubmitForm}
        id="formAward"
        style={{ margin: '40px 0 0 0' }}
      >
        <Form.Group style={{ margin: '6px 0' }}>
          <Row>
            <Col sm="auto" style={{ paddingTop: '8px' }}>
              <p id="pAwardDate">수상일자</p>
            </Col>
            <Col>
              <DatePicker
                id="formStartDate"
                selected={startDate.toDate()}
                onChange={(date) =>
                  onChangeStartDate(moment(date).tz('Asia/Seoul'))
                }
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

        <FloatingLabel id="floatingTextarea" label="상세내용" className="mb-3">

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
          <Button
            id="btnAwardConfirm"
            variant="primary"
            type="submit"
            style={{ marginRight: '4px' }}
          >
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

      <Modals
        show={modalShow}
        setModalShow={setModalShow}
        setIsConfirmed={setIsConfirmed}
      />
    </>
  );
};

export default AwardEditForm;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin: 32px 0;
`;
