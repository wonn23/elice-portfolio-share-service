/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { deleteEducation } from 'modules/sagas/education';

import 'lib/styles/education/EducationCard.css';

const EducationCard = ({ educationData, isEditable, setIsEditing }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    setIsEditing(true);
  };

  const onClickDelete = () => {
    dispatch(deleteEducation(educationData._id));
  };

  return (
    <Container style = {{ marginTop: '28px' }}>
      <Row style={{ marginBottom: '28px' }}>
        <Col sm="auto" id="colEduStatus">
          {educationData.status}
        </Col>
        <Col sm="6">
          <Row id="rowEduSchool">
            {educationData.school}
          </Row>
          <Row id="rowEduMajor">
            {educationData.major}
          </Row>
        </Col>
        <Col id="colBtnEdu">
          {isEditable && (
            <><Button id="btnEditEducation" onClick={onClick}>
              편집
            </Button><Button id="btnEditEducation" onClick={onClickDelete}>
                삭제
              </Button></>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default EducationCard;