/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadMusic } from 'modules/sagas/music';
import { loadMusicList } from 'modules/reducers/music';
import Spinners from 'components/common/Spinners';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

import SongInfo from './SongInfo';
import Progress from './Progress';
import ControlPanel from './ControlPanel';
import PlayList from './PlayList';

const Music = ({ portfolioOwnerId }) => {
  const progressControlRef = useRef();
  const [showList, setShowList] = useState(false);

  const { musics, error, loading, playList, isAdded } = useSelector(
    ({ musics, loading, music }) => ({
      musics: musics.musics,
      playList: music.playList,
      error: musics.loadMusicListError,
      loading: loading['musics/LOAD_MUSICS'],
      isAdded: musics.isAdded,
    }),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMusic(portfolioOwnerId));
  }, [dispatch, portfolioOwnerId]);

  useEffect(() => {
    if (!loading && musics?.length === 0) {
      dispatch(loadMusicList([]));
    }
    if (!loading && musics && musics.length > 0) {
      dispatch(loadMusicList(musics));
    }
  }, [dispatch, loading, musics, portfolioOwnerId]);

  const onPlay = useCallback(() => {
    progressControlRef.current.play();
  }, []);

  const onPause = useCallback(() => {
    progressControlRef.current.pause();
  }, []);

  const onChangeVolume = useCallback((vol) => {
    progressControlRef.current.changeVolume(vol);
  }, []);

  if (loading) {
    return <Spinners />;
  }

  if (error) {
    return 'MUSIC LOAD ERROR FROM SERVER';
  }

  if (musics?.length === 0) {
    return (
      <Card
        style={{
          width: '18.1rem',
          paddingTop: '16px',
          border: 'solid 2px #1e1f20',
          margin: '20px',
        }}
      >
        <PanelNoMusic>
          No Music
          <br />
          Please Add Music 😢
        </PanelNoMusic>
      </Card>
    );
  }

  if (playList?.length === 0) {
    return 'Please Wait';
  }

  return (
    <>
      {!loading && musics && playList && (
        <Card
          id="CardMusic"
          style={{
            width: '18.1rem',
            paddingTop: '16px',
            border: 'solid 2px #1e1f20',
            margin: '20px',
            borderRadius: '10px',
          }}
        >
          <Card.Title>
            <SongInfo />
          </Card.Title>
          <Card.Body>
            <Progress ref={progressControlRef} />
            <ControlPanel
              setShowList={setShowList}
              onPlay={onPlay}
              onPause={onPause}
              onChangeVolume={onChangeVolume}
            />
          </Card.Body>

          {showList && <PlayList setShowList={setShowList} />}
        </Card>
      )}
    </>
  );
};

export default Music;

const PanelNoMusic = styled.div`
  width: flex;

  background-color: #ffffff;
  text-align: center;

  font-weight: 600;

  padding-bottom: 18px;
`;
