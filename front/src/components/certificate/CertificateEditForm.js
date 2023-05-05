/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import useInput from 'hooks/useInput';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Modals from 'components/common/Modals';
import DatePicker from 'react-datepicker';
import { updateCertificate } from 'modules/sagas/certificate';
import moment from 'moment-timezone';

import 'lib/styles/certificate/CertificateEditForm.css';

const CertificateEditForm = ({ certificateData, setIsEditing }) => {
  const [modalShow, setModalShow] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const dispatch = useDispatch();

  const [agency, onChangeAgency] = useInput(certificateData.agency);
  const [credit, onChangeCredit] = useInput(certificateData.credit);
  const [grade, onChangeGrade] = useInput(certificateData.grade);
  const [acquireDate, onChangeAcquireDate] = useState(
    moment(certificateData.startDate).tz('Asia/Seoul'),
  );

  const onSubmitForm = (e) => {
    e.preventDefault();
    setModalShow(true);
  };

  useEffect(() => {
    if (isConfirmed) {
      const { _id } = certificateData;
      const updatedCertificateData = {
        _id,
        agency,
        credit,
        grade,
        acquireDate,
      };
      dispatch(updateCertificate(updatedCertificateData));
      console.log(updatedCertificateData);

      setIsEditing(false);
    }
  }, [
    dispatch,
    certificateData,
    agency,
    credit,
    isConfirmed,
    grade,
    setIsEditing,
    acquireDate,
  ]);

  const onClick = () => {
    console.log(certificateData);
    setIsEditing(false);
  };

  return (
    <>
      <Form onSubmit={onSubmitForm} id="formCertificate">
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
                placeholder="발급기관을 입력해 주세요."
                value={agency}
                onChange={onChangeAgency}
              />
            </Col>
            <Col sm="auto" style={{ paddingTop: '8px' }}>
              <p id="pAcquireDate">취득일자</p>
            </Col>
            <Col>
              <DatePicker
                id="formAcquireDate"
                selected={acquireDate.toDate()}
                onChange={(date) =>
                  onChangeAcquireDate(moment(date).tz('Asia/Seoul'))
                }
                withPortal
              />
            </Col>
          </Row>
        </Form.Group>

        <ButtonWrapper>
          <Button
            id="btnCertificateConfirm"
            variant="primary"
            type="submit"
            style={{ marginRight: '4px' }}
          >
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

      <Modals
        show={modalShow}
        setModalShow={setModalShow}
        setIsConfirmed={setIsConfirmed}
      />
    </>
  );
};

export default CertificateEditForm;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin: 32px 0;
`;
