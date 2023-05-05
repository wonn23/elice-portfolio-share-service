/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card } from 'react-bootstrap';
import { ArrowClockwise } from 'react-bootstrap-icons';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { loadStorys } from 'modules/sagas/story';
import Spinners from 'components/common/Spinners';
import StoryInfo from './StoryInfo';

const StorySlick = ({ portfolioOwnerId }) => {
  const [refresh, setRefresh] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const { storys, loadList, isAdded, story } = useSelector(
    ({ storys, loading }) => ({
      storys: storys.storys,
      loadList: loading['story/LOAD_STORYS'],
      isAdded: storys.isAdded,
      story: storys.story,
    }),
  );

  const handleBeforeChange = (currentSlide, nextSlide) => {
    setCurrentIndex(nextSlide);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadStorys(portfolioOwnerId));
  }, [dispatch, portfolioOwnerId, isAdded, refresh]);

  const settings = {
    autoplay: true,
    infinite: storys?.length > 1 ? true : false,
    slidesToShow: storys?.length < 2 ? 1 : 2,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    speed: 300,
    arrows: true,
  };

  const handleClick = () => {
    setRefresh(!refresh);
  };

  if (loadList) {
    return <Spinners />;
  }

  if (storys?.length === 0 || !storys) {
    return (
      <Card
        style={{
          width: '18.1rem',
          paddingTop: '16px',
          border: 'solid 2px #1e1f20',
          margin: '20px',
          display: 'flex',
        }}
      >
        <PanelNoStory>
          No Story
          <br />
          Please Add Some Photo 😢
        </PanelNoStory>
      </Card>
    );
  }

  return (
    <>
      {!loadList && storys && story.length === storys.length && (
        <CardWrapper style={{ width: '18rem', margin: '0 20px' }}>
          <Card.Body>
            <h2 style={{ margin: '8px 0px 16px 8px' }}>Photo Story</h2>
            <Slider {...settings} beforeChange={handleBeforeChange}>
              {storys?.map((data, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <React.Fragment key={data.id}>
                    <StoryInfo data={data} idx={idx} isActive={isActive} />
                  </React.Fragment>
                );
              })}
            </Slider>
          </Card.Body>
          <ButtonWrapper onClick={handleClick}>
            <ArrowClockwise />
          </ButtonWrapper>
        </CardWrapper>
      )}
    </>
  );
};

export default StorySlick;

const CardWrapper = styled(Card)`
  border: solid 2px #1e1f20;
  display: flex;
  align-items: center;
`;

const PanelNoStory = styled.div`
  width: flex;

  background-color: #ffffff;
  text-align: center;

  font-weight: 600;

  padding-bottom: 18px;
`;

const ButtonWrapper = styled.button`
  background-color: #1e1f20;
  color: #ffffff;

  border-radius: 8px;
  position: absolute;
  top: 1px;
  right: 1px;
`;
