/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import Spinners from 'components/common/Spinners';
import styled from 'styled-components';

const StoryInfo = ({ data, idx, isActive }) => {
  const { story, loadingLoadStory } = useSelector(({ storys, loading }) => ({
    story: storys.story,
    loadingLoadStory: loading['story/LOAD_STORY'],
  }));
  const [loading, setLoading] = useState(true);

  if (loadingLoadStory) {
    return <Spinners />;
  }

  return (
    <CardWrapper isActive={isActive}>
      {story[idx] && !loadingLoadStory && (
        <>
          {loading && <Spinners animation="border" />}
          <Card.Img
            variant="top"
            src={`data:image/jpeg;base64,${story[idx]}`}
            onLoad={() => setLoading(false)}
            style={{ display: loading ? 'none' : 'block' }}
          />
          <Card.Body style={{ textAlign: 'center' }}>
            {data?.description && (
              <Card.Title
                style={{
                  fontSize: '0.8rem',
                  lineHeight: '150%',
                  margin: '0px',
                }}
              >
                {data.description}
              </Card.Title>
            )}
          </Card.Body>
        </>
      )}
    </CardWrapper>
  );
};

export default StoryInfo;

const CardWrapper = styled(Card)`
  width: 15.6rem;
  margin: 6px 0px;
  border: solid 2px #1e1f20;

  ${({ isActive }) =>
    isActive &&
    `
    border: 3px solid black;
    
  `}
`;
