/* eslint-disable no-shadow */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import rabbitCursor from 'lib/styles/assets/rabbitCursor.svg';
import styled from 'styled-components';

function Footer() {
  const [todo, setTodo] = useState('');

  useEffect(() => {
    const url = 'https://www.boredapi.com/api/activity/';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const { activity } = data;
        setTodo(activity);
      });
  }, []);

  const onClick = () => {
    const url = 'https://www.boredapi.com/api/activity/';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const { activity } = data;
        setTodo(activity);
      });
  };

  return (
    <Container
      className="d-flex justify-content-end"
      fluid
      style={{ padding: '1rem', height: '0.3rem' }}
    >
      <Row className="justify-content-md" style={{ width: '50rem' }}>
        <Col>
          <Triangle />
          <TodoWrapper>
            심심하니? 너에게 필요한 활동을 추천해 줄게. <br />
            <p style={{ margin: '0px', fontWeight: '600' }}>{todo} 🍀</p>
          </TodoWrapper>
        </Col>
        <Col md="auto">
          <ImgWrapper>
            <img width="28px" src={rabbitCursor} alt="퀘스트 주는 토끼" />
          </ImgWrapper>
          <Button variant="dark" onClick={onClick} style={{ width: '100%' }}>
            오늘의 미션
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;

const ImgWrapper = styled.div`
  position: relative;

  top: 12px;
`;

const TodoWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.9);

  border-radius: 10px;
  padding: 4px 12px;

  margin-left: 4px;
`;

const Triangle = styled.div`
  width: 0px;
  height: 0px;
  border-top: 6px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 24px solid rgba(255, 255, 255, 0.8);
  border-right: 6px solid transparent;

  position: relative;
  top: 40px;
  left: 342px;
`;
