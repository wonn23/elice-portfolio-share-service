/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Col, Nav, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'modules/sagas/user';
import styled from 'styled-components';

import Footer2 from 'components/common/Footer2';
import User from './user/User';
import Education from './education/Education';
import Award from './award/Award';
import Certificate from './certificate/Certificate';
import Project from './project/Project';
import Music from './music/Music';
import MusicPanel from './musicPanel/MusicPanel';
import BackgroundCover from './BackgroundCover';
import StorySlick from './story/StorySlick';
import PhotoPanel from './storyPanel/PhotoPanel';

import 'lib/styles/Portfolio.css';
import LocalTimeBadge from './common/LocalTimeBadge';
import Spinners from './common/Spinners';
import Footer from './common/Footer';

const Portfolio = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const [isVisible, setVisible] = useState(true);

  const [isEducationClicked, setIsEducationClicked] = useState(true);
  const [isAwardClicked, setIsAwardClicked] = useState(false);
  const [isCertificateClicked, setIsCertificateClicked] = useState(false);
  const [isProjectClicked, setIsProjectClicked] = useState(false);
  const [isMusicClicked, setIsMusicClicked] = useState(false);
  const [isStoryClicked, setIsStoryClicked] = useState(false);

  const { fetchUser, fetchError, loading, user } = useSelector(
    ({ profile, loading, user }) => ({
      fetchUser: profile.user,
      fetchError: profile.error,
      loading: loading['profile/GET_USER'],
      user: user.user,
    }),
  );

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }

    const ownerId = params.userId || user.id;
    dispatch(getUser(ownerId));
  }, [user, navigate, params.userId, dispatch]);

  if (loading) {
    return <Spinners />;
  }

  if (fetchError) {
    return <ErrorMessage>에러발생</ErrorMessage>;
  }

  return (
    <div>
      <BackgroundCover />
      {!loading && fetchUser && user && (
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col lg="auto">
              <User
                portfolioOwnerId={fetchUser.id}
                isEditable={fetchUser.id === user?.id}
              />
              <Music portfolioOwnerId={fetchUser.id} />
            </Col>

            <Col sm="auto">
              <Row>
                <Nav variant="tabs" id="NavBar">
                  <Nav.Item>
                    <Nav.Link
                      id="navEducation"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsEducationClicked(true);
                        setIsAwardClicked(false);
                        setIsCertificateClicked(false);
                        setIsProjectClicked(false);
                        setIsMusicClicked(false);
                        setIsStoryClicked(false);
                      }}
                    >
                      EDUCATION X
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      id="navAward"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsEducationClicked(false);
                        setIsAwardClicked(true);
                        setIsCertificateClicked(false);
                        setIsProjectClicked(false);
                        setIsMusicClicked(false);
                        setIsStoryClicked(false);
                      }}
                    >
                      AWARD X
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      id="navCertificate"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsEducationClicked(false);
                        setIsAwardClicked(false);
                        setIsCertificateClicked(true);
                        setIsProjectClicked(false);
                        setIsMusicClicked(false);
                        setIsStoryClicked(false);
                      }}
                    >
                      CERTIFICATE X
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      id="navProject"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsEducationClicked(false);
                        setIsAwardClicked(false);
                        setIsCertificateClicked(false);
                        setIsProjectClicked(true);
                        setIsMusicClicked(false);
                        setIsStoryClicked(false);
                      }}
                    >
                      PROJECT X
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item id="navItemMusic">
                    <Nav.Link
                      id="navMusic"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsEducationClicked(false);
                        setIsAwardClicked(false);
                        setIsCertificateClicked(false);
                        setIsProjectClicked(false);
                        setIsMusicClicked(true);
                        setIsStoryClicked(false);
                        setVisible(true);
                      }}
                    >
                      🎧
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item id="navItemStory">
                    <Nav.Link
                      id="navStory"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsEducationClicked(false);
                        setIsAwardClicked(false);
                        setIsCertificateClicked(false);
                        setIsProjectClicked(false);
                        setIsMusicClicked(false);
                        setIsStoryClicked(true);
                        setVisible(true);
                      }}
                    >
                      스토리 한 스푼 더하기🍀
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Row>

              <Row>
                <CardWrapper id="cardWrapper">
                  {isEducationClicked && (
                    <Education
                      portfolioOwnerId={fetchUser.id}
                      isEditable={fetchUser.id === user?.id}
                      isVisible={isVisible}
                      setVisible={setVisible}
                    />
                  )}
                  {isAwardClicked && (
                    <Award
                      portfolioOwnerId={fetchUser.id}
                      isEditable={fetchUser.id === user?.id}
                      isVisible={isVisible}
                      setVisible={setVisible}
                    />
                  )}
                  {isCertificateClicked && (
                    <Certificate
                      portfolioOwnerId={fetchUser.id}
                      isEditable={fetchUser.id === user?.id}
                      isVisible={isVisible}
                      setVisible={setVisible}
                    />
                  )}
                  {isProjectClicked && (
                    <Project
                      portfolioOwnerId={fetchUser.id}
                      isEditable={fetchUser.id === user?.id}
                      isVisible={isVisible}
                      setVisible={setVisible}
                    />
                  )}
                  {isMusicClicked && (
                    <MusicPanel
                      portfolioOwnerId={fetchUser.id}
                      isEditable={fetchUser.id === user?.id}
                      isVisible={isVisible}
                      setVisible={setVisible}
                    />
                  )}
                  {isStoryClicked && (
                    <PhotoPanel
                      portfolioOwnerId={fetchUser.id}
                      isEditable={fetchUser.id === user?.id}
                      isVisible={isVisible}
                      setVisible={setVisible}
                    />
                  )}
                </CardWrapper>
              </Row>
            </Col>

            <Col lg="auto">
              <StorySlick portfolioOwnerId={fetchUser.id} />
              <Footer2 />
              <FootWrapper>
                <Footer />
              </FootWrapper>
            </Col>
          </Row>
        </Container>
      )}
      <LocalTimeBadge />
    </div>
  );
};

export default Portfolio;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 1rem;
  margin-top: 1rem;
`;

const CardWrapper = styled(Container)`
  width: 1080px;

  background-color: #ffffff;

  border-style: solid;
  border-width: 2px;
  border-radius: 10px;
  border-color: #1e1f20;

  margin-bottom: 1px;
  margin-top: -1px;
`;

const FootWrapper = styled.div`
  position: relative;
  top: 1rem;
  left: -30.5rem;
`;
