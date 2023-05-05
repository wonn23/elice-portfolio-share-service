import React from 'react';
import styled from 'styled-components';
import LoginForm from 'components/user/LoginForm';
import LocalTimeBadge from 'components/common/LocalTimeBadge';
import DecorationBadge from 'components/common/DecorationBadge';
import DecorationMarquee from 'components/common/DecorationMarquee';
import DecorationSite from 'components/common/DecorationSite';
import Page from './Page';

const LoginPage = () => {
  return (
    <Page title="LoginPage">
      <DecorationPosition1>
        <DecorationWrapper1>
          <DecorationSite />
        </DecorationWrapper1>
      </DecorationPosition1>

      <DecorationPosition2>
        <DecorationWrapper2>
          <DecorationSite />
        </DecorationWrapper2>
      </DecorationPosition2>

      <DecorationBadge />
      <LocalTimeBadge />

      <WelcomeLog>안녕하세요? <br/> 다시 만나 반갑습니다.</WelcomeLog>
      <LoginForm />
    </Page>
  );
};

export default LoginPage;

const DecorationPosition1 = styled.div`
  position: relative;
`;

const DecorationWrapper1 = styled.div`
  position: absolute;

  top: 700px;
  left: 60px;
`;

const DecorationPosition2 = styled.div`
  position: relative;
`;

const DecorationWrapper2 = styled.div`
  position: absolute;

  top: 540px;
  left: 60px;
`;

const WelcomeLog = styled.div`
  font-size: 200%;
  font-weight: 400;

  text-align: center;

  margin: 60px 0 80px 0;
`;