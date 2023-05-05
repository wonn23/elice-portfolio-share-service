/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Clock from 'react-live-clock';
import styled from 'styled-components';
import { Col, Row } from 'react-bootstrap';

const LocalTimeBadge = () => {
  return (
    <BadgeWrapper>
      <ClockWrapper>
        <Row>
          <Col sm="1" style={{ padding: '7px 24px 0 10px' }}><StyledCircle /></Col>
          <Col sm="auto" style={{ padding: '3px 0 0 0' }}>
            <p style={{ fontWeight: '600', margin: '0px' }}>LOCAL TIME →</p>
          </Col>
          <Col sm="auto" style={{ padding: '0px 0px 2px 8px' }}>
            <DesignedClock
              format="HH:mm:ss"
              ticking
              timezone="ASIA/Seoul"
              Label="LOCAL TIME →"
              style={{ margin: '0px' }}
            />
          </Col>
        </Row>
      </ClockWrapper>
    </BadgeWrapper>
  );
};

export default LocalTimeBadge;

const StyledCircle = styled.div`
  height: 16px;
  width: 16px;

  background-color: #6700e6;

  border-radius: 10px;
`;

const BadgeWrapper = styled.div`
  position: relative;

  display: flex;
  justify-contents: center;
  align-items: center;
`;

const ClockWrapper = styled.div`
  color: #1e1f20;
  background-color: #ffffff;

  border: solid 2px #1e1f20;
  border-radius: 40px;

  padding: 0px 12px;

  position: fixed;
  top: 80px;
  left: 24px;
`;

const DesignedClock = styled(Clock)`
  font-size: 120%;
  font-weight: 600;
`;
