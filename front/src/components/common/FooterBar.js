import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Container, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

const FooterBar = () => {
  return (
    <NavFooter>
      <Nav.Item style={{ margin: '0px' }}>
        <Container>
          <Row sm="auto" style={{ margin: '0px 1px' }}>
            만든 사람들
          </Row>
          <Col sm="auto">김한빈 서민재 서원준 이원규 허창원 황준성</Col>
        </Container>
      </Nav.Item>
    </NavFooter>
  );
};

export default FooterBar;

const NavFooter = styled(Nav)`
  background-color: rgba(255, 255, 255, 0.4);
  border: solid #1e1f20;
  border-width: 2px 0 0 0;

  padding: 20px 8px 8px 8px;

  position: absolute;
  bottom: -3.2rem;
`;
