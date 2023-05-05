/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import styled from 'styled-components';
import classNames from 'classname';
import { useSelector } from 'react-redux';
import { serverUrl } from 'lib/api/client';

const getMetaData = (src) => {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.onloadedmetadata = () => {
      const minutes = `0${parseInt(audio.duration / 60, 10)}`;
      const seconds = `0${parseInt(audio.duration % 60, 10)}`;
      resolve(`${minutes}:${seconds.slice(-2)}`);
    };
    audio.src = src;
  });
};

const PlayListItem = ({ item, idx }) => {
  const { currentIndex } = useSelector(({ music }) => ({
    currentIndex: music.currentIndex,
  }));
  const [duration, setDuration] = useState('00:00');

  useEffect(() => {
    async function getDurationTime() {
      const durationTime = await getMetaData(
        `${serverUrl}audio/music/${item.music}`,
      );
      setDuration(durationTime);
    }

    getDurationTime();
  }, [item.music]);

  return (
    <ListGroup.Item style={{ width: '16rem' }}>
      <Infos>
        <InfoWrapper
          className={classNames([
            {
              playing: currentIndex === idx,
            },
          ])}
        >
          <div id="title" style={{ fontSize: '120%', fontWeight: '600' }}>
            {item.title}
          </div>
          <div id="artist" style={{ fontWeight: '600' }}>
            {item.artist}
          </div>
          <div
            id="duration"
            style={{ fontWeight: '400', marginBottom: '24px' }}
          >
            {duration}
          </div>
        </InfoWrapper>
      </Infos>
    </ListGroup.Item>
  );
};

export default PlayListItem;

const Infos = styled.div`
  .playing {
    background: linear-gradient(to right, #1c7ed6, #7950f2);
    color: transparent;
    -webkit-background-clip: text;

    font-weight: 600;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;

  border-style: solid;
  border-width: 0px 0px 2px 0px;
  border-color: #1e1f20;

  padding: 0 20px 0 0;
  margin: 0 0 0 -12px;

  width: 240px;
`;
