/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { deleteProject } from 'modules/sagas/project';
import moment from 'moment-timezone';
import toDateString from 'lib/util/toDate';

import 'lib/styles/project/ProjectCard.css';

const ProjectCard = ({ projectData, isEditable, setIsEditing }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    setIsEditing(true);
  };

  const onClickDelete = () => {
    dispatch(deleteProject(projectData._id));
  };

  return (
    <>
      <Container style={{ marginTop: '28px', padding: '0px' }}>
        <Row>
          <Col sm="9">
            <Row>
              <Col sm="auto" id="colProjectName">
                {projectData.projectName} ({`${toDateString(
                  moment(projectData.startDate).tz('Asia/Seoul')
                )}`})
              </Col>
              <Col sm="auto" id="colProjectLink">
                ▶ {projectData.projectLink}
              </Col>
            </Row>
          </Col>
          <Col sm="auto" id="colBtnProject">
            {isEditable && (
              <><Button id="btnEditProject" onClick={onClick}>
                편집
              </Button><Button id="btnEditProject" onClick={onClickDelete}>
                  삭제
                </Button></>
            )}
          </Col>
        </Row>

        <Row id="rowProjectIntroduction">
          <Col sm="auto" id="pIntroduction">[Intro]</Col>
          <Col sm="8">{projectData.introduction}</Col>
        </Row>
        <Row id="rowProjectMyRole">
          <Col sm="auto" id="pMyRole"><p>[Role] </p></Col>
          <Col sm="9">{projectData.myRole}</Col>
        </Row>
        <Row id="rowProjectDetail">
          {projectData.detail}
        </Row>
      </Container><RowWrapper />
    </>
  );
};

export default ProjectCard;

const RowWrapper = styled(Row)`
  border-style: solid;
  border-width: 2px 0px 0px 0px;
  border-color: #1e1f20;

  margin: 28px 0px;
  padding: 0px;
`;