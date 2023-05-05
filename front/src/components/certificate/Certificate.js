/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { loadCertificate } from 'modules/sagas/certificate';

import Spinners from 'components/common/Spinners';
import DecorationBar from 'components/common/DecorationBar';
import CertificateAddForm from './CertificateAddForm';
import CertificateView from './CertificateView';

import 'lib/styles/certificate/Certificate.css';

const Certificate = ({ isEditable, portfolioOwnerId }) => {
  const dispatch = useDispatch();
  // prettier-ignore
  const { certificateDatas, error, loading } = useSelector(
    ({ certificate, loading }) => ({
      certificateDatas: certificate.datas,
      error: certificate.loadCertificateError,
      loading: loading['certificate/LOAD_CERTIFICATE'],
    }),
  );

  const [isVisible, setVisible] = useState(false);

  const onClick = () => {
    setVisible(true);
  };

  useEffect(() => {
    dispatch(loadCertificate(portfolioOwnerId));
  }, [dispatch, portfolioOwnerId]);

  if (loading) {
    return <Spinners />;
  }

  if (error) {
    return 'LOAD ERROR';
  }

  return (
    <div>
      <DecorationBar />
      {!loading && (
        <Card id="CardAward">
          <Card.Body id="cardAwardBody">
            <Card.Title >
              <Row>
                <Col sm="auto" lg="auto" id="cardTitleAward">CERTIFICATE</Col>
                <Col sm="auto" lg="auto" id="cardTitleAwardKor">자격사항</Col>
              </Row>
            </Card.Title>
            <CardWrapper>
              <Card.Text>
                {certificateDatas?.map((data) => (
                  <CertificateView
                    key={data._id}
                    certificateData={data}
                    isEditable={isEditable}
                  />
                ))}
              </Card.Text>
            </CardWrapper>

            <ButtonWrapper>
                {isEditable && (
                  <Button id="btnAddCertificate" onClick={onClick}>
                    +
                  </Button>
                )}
            </ButtonWrapper>

            <Card.Text>
                {isVisible && (
                  <CertificateAddForm
                    setVisible={setVisible}
                    portfolioOwnerId={portfolioOwnerId}
                  />
                )}
              </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Certificate;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 12px 0;
`;

const CardWrapper = styled.div`
  border-style: solid;
  border-width: 2px 0px 2px 0px;
  border-color: #1e1f20;

  margin: 30px 0px;
  padding: 16px 0px;
`;