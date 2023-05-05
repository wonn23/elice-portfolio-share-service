/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { loadProject } from 'modules/sagas/project';

import Spinners from 'components/common/Spinners';
import DecorationBar from 'components/common/DecorationBar';
import ProjectAddForm from './ProjectAddForm';
import ProjectView from './ProjectView';

import 'lib/styles/project/Project.css';

const Project = ({ isEditable, portfolioOwnerId }) => {
  const dispatch = useDispatch();
  // prettier-ignore
  const { projectDatas, error, loading } = useSelector(
    ({ project, loading }) => ({
      projectDatas: project.datas,
      error: project.loadProjectError,
      loading: loading['project/LOAD_PROJECT'],
    }),
  );

  const [isVisible, setVisible] = useState(false);

  const onClick = () => {
    setVisible(true);
  };

  useEffect(() => {
    dispatch(loadProject(portfolioOwnerId));
  }, [dispatch, portfolioOwnerId]);

  if (loading) {
    return <Spinners />;
  }

  if (error) {
    return 'LOAD ERROR';
  }

  return (
    <div>
      <DecorationBar />
      {!loading && (
        <Card id="CardProject">
          <Card.Body id="cardProjectBody">
            <Card.Title>
              <Row>
                <Col sm="auto" lg="auto" id="cardTitleProject">PROJECT</Col>
                <Col sm="auto" lg="auto" id="cardTitleProjectKor">프로젝트 이력</Col>
              </Row>
            </Card.Title>
            <CardWrapper>
              <Card.Text>
                {projectDatas?.map((data) => (
                  <ProjectView
                    key={data._id}
                    projectData={data}
                    isEditable={isEditable}
                  />
                ))}
              </Card.Text>

            <ButtonWrapper>
                {isEditable && (
                  <Button id="btnAddProject" onClick={onClick}>
                    +
                  </Button>
                )}
              </ButtonWrapper>

              <Card.Text>
                {isVisible && (
                  <ProjectAddForm
                    setVisible={setVisible}
                    portfolioOwnerId={portfolioOwnerId}
                  />
                )}
              </Card.Text>
            </CardWrapper>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Project;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 12px 0;
`;

const CardWrapper = styled.div`
  border-style: solid;
  border-width: 2px 0px 0px 0px;
  border-color: #1e1f20;

  margin: 30px 0px;
  padding: 0px 0px 16px 0px;
`;
