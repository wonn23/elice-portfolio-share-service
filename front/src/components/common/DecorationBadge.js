/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const DecorationBadge = () => {
  return (
    <BadgeWrapper>
      <StyledButton>THANK YOU FOR YOUR VISIT!</StyledButton>
    </BadgeWrapper>
  );
};

export default DecorationBadge;

const BadgeWrapper = styled.div`
  position: relative;

  display: flex;
  justify-contents: center;
  align-items: center;
`;

const StyledButton = styled(Button)`
  background-color: #ffffff;
  color: #1e1f20;

  border: solid 2px #1e1f20;
  border-radius: 20px;

  position: fixed;
  top: 36px;
  left: 48px;

  padding: 4px 12px;

  font-weight: 600;
`;