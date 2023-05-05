/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';

import rabbitCursor from 'lib/styles/assets/rabbitCursor.svg';
import DecorationBar from 'components/common/DecorationBar';
import MusicPanelAddForm from './MusicPanelAddForm';

const MusicPanel = ({
  isEditable,
  portfolioOwnerId,
  isVisible,
  setVisible,
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const onClick = () => {
    setVisible(true);
    setIsAdded(false);
  };

  return (
    <>
      <DecorationBar />
      <CardWrapper>
        <Card.Body style={{ padding: '28px' }}>
          <Card.Title>
            <Row>
              <Col sm="auto" lg="auto" id="cardTitleProject">
                MUSIC
              </Col>
              <Col sm="auto" lg="auto" id="cardTitleProjectKor">
                음악
              </Col>
            </Row>
          </Card.Title>

          {/* <ButtonWrapper>
        {isEditable && (
          <Button col="6" onClick={onClick} style={{ opacity: '0.5' }}>
            +
          </Button>
        )}
      </ButtonWrapper> */}

          <Card.Text>
            {isEditable && isVisible && (
              <MusicPanelAddForm
                setVisible={setVisible}
                portfolioOwnerId={portfolioOwnerId}
                setIsAdded={setIsAdded}
              />
            )}
            {!isEditable && (
              <Container fluid>
                <ColWrapper>
                  <RowWrapper>
                    나를 소개하는 플레이리스트를 들어보세요.
                  </RowWrapper>
                  <Row className="justify-content-md-center">
                    🎵{' '}
                    <img
                      style={{ width: '84px', height: '84px' }}
                      src={rabbitCursor}
                      alt="토끼이미지"
                    />
                  </Row>
                </ColWrapper>
              </Container>
            )}
            {isAdded && (
              <Container fluid>
                <ColWrapper>
                  <RowWrapper>음악 업로드 완료!</RowWrapper>
                  <Row className="justify-content-md-center">
                    🎵{' '}
                    <img
                      style={{ width: '84px', height: '84px' }}
                      src={rabbitCursor}
                      alt="토끼이미지"
                    />
                  </Row>
                  <ButtonWrapper>
                    <Button
                      onClick={onClick}
                      style={{
                        backgroundColor: '#6700e6',
                        color: '#ffffff',
                        border: 'solid 2px #6700e6',
                        borderRadius: '20px',
                      }}
                    >
                      또 업로드하기
                    </Button>
                  </ButtonWrapper>
                </ColWrapper>
              </Container>
            )}
          </Card.Text>
        </Card.Body>
      </CardWrapper>
    </>
  );
};

export default MusicPanel;

const CardWrapper = styled(Card)`
  border-style: solid;
  border-width: 2px;
  border-color: #1e1f20;
  border-radius: 10px;

  margin: 0 20px 20px 20px;
  padding: 6px 12px 12px 12px;
`;

const RowWrapper = styled.div`
  font-weight: 600;
  font-size: 120%;

  text-align: center;

  margin-bottom: 24px;
`;

const ColWrapper = styled(Col)`
  background-color: #ececec;

  border-radius: 20px;

  padding: 60px 0 40px 0;

  margin: 40px 20px 8px 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;

  margin: 12px 0px;
`;
