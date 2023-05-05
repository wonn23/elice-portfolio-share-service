import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';

function Spinners() {
  return (
    <SpinnerWrapper>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </SpinnerWrapper>
  );
}

export default Spinners;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin: 24px 0px;
`;
