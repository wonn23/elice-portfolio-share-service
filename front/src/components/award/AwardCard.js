/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { deleteAward } from 'modules/sagas/award';
import moment from 'moment-timezone';
import toDateString from 'lib/util/toDate';

import 'lib/styles/award/AwardCard.css';

const AwardCard = ({ awardData, isEditable, setIsEditing }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    setIsEditing(true);
  };

  const onClickDelete = () => {
    dispatch(deleteAward(awardData._id));
  };

  return (
    <Container style={{ marginTop: '28px', padding: '0px' }}>
      <Row>
        <Col sm="auto" id="colAwardAssociation">
          {awardData.association} |
        </Col>
        <Col sm="auto" id="colAwardContest">
          {awardData.contest}
        </Col>
        <Col sm="auto" id="colAwardDate">
          ({`${toDateString(moment(awardData.startDate).tz('Asia/Seoul'))}`})
        </Col>
        <Col id="colBtnAward">
          {isEditable && (
          <><Button id="btnEditAward" onClick={onClick}>
              편집
            </Button><Button id="btnEditAward" onClick={onClickDelete}>
                삭제
              </Button></>
          )}
          </Col>
      </Row>
      <Row id="rowAwardPrize">
          {awardData.prize}
      </Row>
      <Row id="rowAwardDetail">
        {awardData.detail}
      </Row>
      <RowWrapper />
    </Container>
  );
};

export default AwardCard;

const RowWrapper = styled(Row)`
  border-style: solid;
  border-width: 2px 0px 0px 0px;
  border-color: #1e1f20;

  margin: 28px 0px;
  padding: 0px;
`;