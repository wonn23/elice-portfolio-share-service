import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

const DecorationBar = () => {
  return (
    <div>
      <DecoWrapper>
        <Row style={{ display: 'flex', justifyContent: 'center' }}>
          <Col sm="auto" style={{ padding: '0px', margin: '3px 8px 0 8px' }}>
            <Head style={{ transform: 'rotate(225deg)' }}>
              <Line />
            </Head>
          </Col>
          <Col sm="auto" style={{ margin: '0 8px 1px 8px', padding: '4px' }}>
            <Head>
              <Line />
            </Head>
          </Col>
          <Col sm="auto" style={{ padding: '2px', margin: '0 8px' }}>
            <Circle />
          </Col>
          <Col sm="10" style={{ padding: '0px' }}>
            <AddressBar />
          </Col>
        </Row>
      </DecoWrapper>
    </div>
  );
};

export default DecorationBar;

const Head = styled.div`
  width: 16px;
  height: 16px;

  border-style: solid;
  border-width: 2px 2px 0 0;
  border-color: #1e1f20;

  transform: rotate(45deg);
`;

const Line = styled.div`
  margin-left: 3px;
  margin-top: 4px;

  width: 20px;
  height: 20px;

  border-style: solid;
  border-width: 2px 0 0 0;
  border-color: #1e1f20;

  transform: rotate(-45deg);
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;

  border-style: solid;
  border-width: 2px;
  border-color: #1e1f20;
  border-radius: 20px;
`;

const AddressBar = styled.div`
  width: flex;
  height: 24px;

  border-style: solid;
  border-width: 2px;
  border-color: #1e1f20;
  border-radius: 8px;
`;

const DecoWrapper = styled.div`
  margin: 24px 0;
`;
