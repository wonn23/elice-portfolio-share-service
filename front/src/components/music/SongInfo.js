/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCover } from 'modules/sagas/music';
import { Card } from 'react-bootstrap';
import Spinners from 'components/common/Spinners';

const SongInfo = () => {
  const { playList, currentIndex, cover, loading } = useSelector(
    ({ music, musics, loading }) => ({
      playList: music.playList,
      currentIndex: music.currentIndex,
      cover: musics.cover,
      loading: loading['music/LOAD_COVER'],
    }),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (playList) {
      console.log(playList[currentIndex]?.cover);
      dispatch(loadCover(playList[currentIndex]?.cover));
    }
  }, [currentIndex, dispatch, playList]);

  if (loading) {
    return <Spinners />;
  }

  return (
    <>
      {playList && !loading && cover && (
        <Card
          style={{
            width: '16rem',
            margin: 'auto',
            border: 'solid 2px #1e1f20',
          }}
          className="d-flex justify-content-center align-items-center"
        >
          {!loading && cover && (
            <Card.Img
              variant="top"
              src={`data:image/jpeg;base64,${cover}`}
              style={{ padding: '16px', borderRadius: '4%' }}
            />
          )}

          <Card.Body style={{ textAlign: 'center' }}>
            <Card.Title style={{ fontSize: '1.5rem' }}>
              {playList[currentIndex]?.title}
            </Card.Title>
            <Card.Text style={{ fontSize: '1.2rem' }}>
              {playList[currentIndex]?.artist}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default SongInfo;
