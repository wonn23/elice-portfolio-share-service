/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { loadEducation } from 'modules/sagas/education';

import Spinners from 'components/common/Spinners';
import DecorationBar from 'components/common/DecorationBar';
import EducationAddForm from './EducationAddForm';
import EducationView from './EducationView';

import 'lib/styles/education/Education.css';

const Education = ({ isEditable, portfolioOwnerId }) => {
  const dispatch = useDispatch();
  const { educationDatas, error, loading } = useSelector(
    ({ education, loading }) => ({
      educationDatas: education.datas,
      error: education.loadEducationError,
      loading: loading['education/LOAD_EDUCATION'],
      updateError: education.updateError,
    }),
  );

  const [isVisible, setVisible] = useState(false);

  const onClick = () => {
    setVisible(true);
  };

  useEffect(() => {
    dispatch(loadEducation(portfolioOwnerId));
  }, [dispatch, portfolioOwnerId]);

  if (loading) {
    return <Spinners />;
  }

  if (error) {
    return `${error.message}`;
  }

  return (
    <div>
      <DecorationBar />
      {!loading && (
        <Card id="CardEducation">
          <Card.Body id="cardEducationBody">
            <Card.Title>
              <Row>
                  <Col sm="auto" lg="auto" id="cardTitleEducation">EDUCATION</Col>
                  <Col sm="auto" lg="auto" id="cardTitleEducationKor">학력</Col>
                </Row>
            </Card.Title>
            <CardWrapper>
              <Card.Text>
                {educationDatas?.map((data) => (
                  <EducationView
                    key={data._id}
                    educationData={data}
                    isEditable={isEditable}
                  />
                ))}
              </Card.Text>
            </CardWrapper>

            <ButtonWrapper>
              {isEditable && (
                <Button id="btnAddEducation" onClick={onClick}>
                  +
                </Button>
              )}
            </ButtonWrapper>

            <Card.Text>
              {isVisible && (
                <EducationAddForm
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

export default Education;

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
  padding: 8px 0px;
`;
