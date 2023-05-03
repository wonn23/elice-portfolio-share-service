/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import useInput from 'hooks/useInput';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Modals from 'components/common/Modals';
import DatePicker from 'react-datepicker';
import { updateCertificate } from 'modules/sagas/certificate';

const CertificateEditForm = ({ certificateData, setIsEditing }) => {
  const [modalShow, setModalShow] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const dispatch = useDispatch();

  const [certificateName, onChangeCertificateName] = useInput(certificateData.certificateName);
  const [certificateLink, onChangeCertificateLink] = useInput(certificateData.certificateLink);
  const [introduction, onChangeIntroduction] = useInput(certificateData.introduction);
  const [startDate, onChangeStartDate] = useState(certificateData.startDate);
  const [myRole, onChangeMyRole] = useInput(certificateData.myRole);
  const [detail, onChangeDetail] = useInput(certificateData.detail);

  const onSubmitForm = (e) => {
    e.preventDefault();
    setModalShow(true);
  };

  useEffect(() => {
    if (isConfirmed) {
      const { id } = certificateData;
      const updatedCertificateData = {
        id,
        certificateName,
        certificateLink,
        introduction,
        startDate,
        myRole,
        detail,
      };

      // 백앤드와 협의
      // Update API Dispatch [PATCH, PUT 타입]
      // educationDataID 필요함
      // 하지만 백엔드 완성 전 리덕스를 활용하여 faker 데이터들 테스트

      dispatch(updateCertificate(updatedCertificateData));
      console.log(updatedCertificateData);

      setIsEditing(false);
    }
  }, [
    dispatch,
    certificateData,
    setIsEditing,
    isConfirmed,
    certificateName,
    certificateLink,
    introduction,
    startDate,
    myRole,
    detail,
  ]);

  const onClick = () => {
    console.log(certificateData);
    setIsEditing(false);
  };

  return (
    <>
      <Form
        onSubmit={onSubmitForm}
        controlid="formEducation"
        style={{ marginLeft: '0px' }}
      >
        <Form.Group controlid="formSchool" style={{ marginBottom: '12px' }}>
          <Form.Control
            type="text"
            placeholder="프로젝트명을 입력해주세요."
            value={certificateName}
            onChange={onChangeCertificateName}
          />
        </Form.Group>

        <Form.Group controlid="formContest" style={{ marginBottom: '12px' }}>
          <Form.Control
            type="text"
            placeholder="프로젝트 링크를 입력해주세요."
            value={certificateLink}
            onChange={onChangeCertificateLink}
          />
        </Form.Group>

        <Form.Group controlid="formPrize" style={{ marginBottom: '12px' }}>
          <Form.Control
            type="text"
            placeholder="프로젝트 소개를 입력해주세요."
            value={introduction}
            onChange={onChangeIntroduction}
          />
        </Form.Group>

        <Form.Group controlid="formDate" style={{ marginBottom: '12px' }}>
          <DatePicker
            selected={startDate}
            placeholder="프로젝트 기간을 입력해주세요."
            onChange={(date) => onChangeStartDate(date)}
            withPortal
          />
        </Form.Group>

        <Form.Group controlid="formPrize" style={{ marginBottom: '12px' }}>
          <Form.Control
            type="text"
            placeholder="나의 역할을 입력해 주세요."
            value={myRole}
            onChange={onChangeMyRole}
          />
        </Form.Group>

        <FloatingLabel
          controlId="floatingTextarea"
          label="상세 설명"
          className="mb-3"
        >
          <Form.Control
            as="textarea"
            className="form-control"
            placeholder="Leave a comment here"
            value={detail}
            onChange={onChangeDetail}
          />
        </FloatingLabel>

        <ButtonWrapper>
          <Button
            variant="primary"
            type="submit"
            style={{ marginRight: '4px' }}
          >
            확인
          </Button>
          <Button
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
`;