/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteCertificate } from 'modules/sagas/certificate';
import moment from 'moment-timezone';
import toDateString from 'lib/util/toDate';

import 'lib/styles/certificate/CertificateCard.css';

const CertificateCard = ({ certificateData, isEditable, setIsEditing }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    setIsEditing(true);
  };

  const onClickDelete = () => {
    dispatch(deleteCertificate(certificateData._id));
  };

  return (
    <Container style={{ margin: '12px 0px' }}>
      <Row>
        <Col sm="9" style={{ padding: '0px' }}>
          <Row>
            <Col sm="auto" id="rowCertificateCredit">
              {certificateData.credit} |
            </Col>
            <Col sm="auto" id="rowCertificateGrade">
              {certificateData.grade}
            </Col>
            <Col sm="auto" id="rowCertificateDateAgency">
              ({`${toDateString(
                moment(certificateData.startDate).tz('Asia/Seoul'),
              )}`})
            </Col>
          </Row>
        </Col>
        <Col id="colBtnCertificate">
          {isEditable && (
            <><Button id="btnEditCertificate" onClick={onClick}>
              편집
            </Button>
            <Button id="btnEditCertificate" onClick={onClickDelete}>
                삭제
              </Button></>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CertificateCard;