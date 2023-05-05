/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Button, Col } from 'react-bootstrap';
import styled from 'styled-components';
import md5 from 'md5';
import 'lib/styles/user/UserCard.css';

function generateImageNumber(userId) {
  const hash = md5(userId);
  const hashNumber = parseInt(hash.slice(0, 8), 16);
  const imageNumber = hashNumber % 10;

  return imageNumber;
}

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const apiKey = 'J7-qkB0K9h5acCnGf00JbHlBLrQJ-7TZXShKQ9lq5G8';

    const url = `https://api.unsplash.com/search/photos?page=1&query=person&client_id=${apiKey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const images = data.results;
        const idx = generateImageNumber(user.id);
        console.log(images);

        const imageUrl = images[idx].urls.thumb;

        setImageSrc(imageUrl);
      });
  }, [user]);

  const navigate = useNavigate();

  return (
    <Card id="UserCard">
      <CardWrapper>
        <Card.Body>
          <Row className="justify-content-md-center">
            <Card.Text id="cardTitleMyProfile">
              MY
              <br />
              PROFILE
            </Card.Text>
            <Card.Img
              id="cardImage"
              style={{
                width: '16rem',
                height: '10rem',
                overflow: 'hidden',
                borderRadius: '10%',
              }}
              src={imageSrc}
              alt="인물 사진"
            />
          </Row>
          <Card.Title id="cardUserName">{user?.name}</Card.Title>
          <Card.Text id="cardUserEmail">{user?.email}</Card.Text>
          <Card.Text
            id="cardUserDescription"
            style={{ height: '3rem', overflow: 'hidden' }}
          >
            {user?.description}
          </Card.Text>

          {isEditable && (
            <Col>
              <Row className="mt-3 text-center text-info">
                <Col sm={{ span: 20 }}>
                  <Button
                    id="btnEditUserCard"
                    variant="outline-info"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    편집
                  </Button>
                </Col>
              </Row>
            </Col>
          )}

          {isNetwork && (
            <LinkWrapper
              id="otherPortfolio"
              className="mt-3"
              href="#"
              onClick={() => navigate(`/users/${user.id}`)}
            >
              포트폴리오
            </LinkWrapper>
          )}
        </Card.Body>
      </CardWrapper>
    </Card>
  );
}

export default UserCard;

const CardWrapper = styled.div`
  border-style: solid;
  border-width: 2px;
  border-radius: 8px;
  border-color: #1e1f20;

  margin: 10px;
  padding: 8px 0px;
`;

const LinkWrapper = styled(Card.Link)`
  border: solid 2px #6700e6;
  border-radius: 20px;

  color: #6700e6;

  font-size: 90%;
  font-weight: 400;

  padding: 4px 12px;
`;
