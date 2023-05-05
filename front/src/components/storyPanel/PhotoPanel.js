/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';

import DecorationBar from 'components/common/DecorationBar';
import rabbitCursor from 'lib/styles/assets/rabbitCursor.svg';
import PhotoPanelAddForm from './PhotoPanelAddForm';

import 'lib/styles/story/PhotoPanel.css';

const PhotoPanel = ({
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
      <Card id="CardStory">
        <Card.Body id="cardStoryBody">
          <Card.Title>
            <Row>
              <Col sm="auto" lg="auto" id="cardTitleStory">
                PHOTO
                <br />
                STORY
              </Col>
              <Col sm="auto" lg="auto" id="cardTitleStoryKor">
                사진첩
              </Col>
            </Row>
          </Card.Title>

          <Card.Text>
            {isEditable && isVisible && (
              <PhotoPanelAddForm
                setVisible={setVisible}
                portfolioOwnerId={portfolioOwnerId}
                setIsAdded={setIsAdded}
              />
            )}
            {!isEditable && (
              <Container fluid>
                <ColWrapper>
                  <RowWrapper>
                    나를 소개하는 포토스토리를 확인해보세요.
                  </RowWrapper>
                  <Row className="justify-content-md-center">
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
                  <RowWrapper>포토스토리 업로드 완료!</RowWrapper>
                  <Row className="justify-content-md-center">
                    <img
                      style={{ width: '84px', height: '84px' }}
                      src={rabbitCursor}
                      alt="토끼이미지"
                    />{' '}
                    📸
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
      </Card>
    </>
  );
};

export default PhotoPanel;

const RowWrapper = styled.div`
  font-weight: 600;
  font-size: 120%;

  text-align: center;

  margin-bottom: 16px;
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
