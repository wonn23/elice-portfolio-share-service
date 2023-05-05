/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { loadAward } from 'modules/sagas/award';

import Spinners from 'components/common/Spinners';
import DecorationBar from 'components/common/DecorationBar';
import AwardAddForm from './AwardAddForm';
import AwardView from './AwardView';

import 'lib/styles/award/Award.css';

const Award = ({ isEditable, portfolioOwnerId }) => {
  const dispatch = useDispatch();
  // prettier-ignore
  const { awardDatas, error, loading } = useSelector(
    ({ award, loading }) => ({
      awardDatas: award.datas,
      error: award.loadAwardError,
      loading: loading['award/LOAD_AWARD'],
    }),
  );

  const [isVisible, setVisible] = useState(false);

  const onClick = () => {
    setVisible(true);
  };

  useEffect(() => {
    dispatch(loadAward(portfolioOwnerId));
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
          <Card.Title>
              <Row>
                <Col sm="auto" lg="auto" id="cardTitleAward">AWARD</Col>
                <Col sm="auto" lg="auto" id="cardTitleAwardKor">수상 이력</Col>
              </Row>
            </Card.Title>
            <CardWrapper>
              <Card.Text>
                {awardDatas?.map((data) => (
                  <AwardView
                    key={data._id}
                    awardData={data}
                    isEditable={isEditable}
                  />
                ))}
              </Card.Text>

              <ButtonWrapper>
                    {isEditable && (
                      <Button id="btnAddAward" onClick={onClick}>
                        +
                      </Button>
                    )}
                  </ButtonWrapper>

              <Card.Text>
                {isVisible && (
                  <AwardAddForm
                    setVisible={setVisible}
                    portfolioOwnerId={portfolioOwnerId}
                  />
                )}
              </Card.Text>
            </CardWrapper>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Award;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 12px 0;
`;

const CardWrapper = styled.div`
  border-style: solid;
  border-width: 2px 0px 0px 0px;
  border-color: #1e1f20;

  margin: 30px 0px;
  padding: 0px 0px 16px 0px;
`;