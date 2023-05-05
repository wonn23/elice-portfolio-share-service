import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from 'modules/reducers/loading';

import * as storyAPI from '../api/user';

const createSaga = (type, reqAPI) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  if (type === 'ADD_STORY') {
    return function* ({ payload }) {
      yield put(startLoading(type));

      try {
        const res = yield call(reqAPI, payload);
        yield put({
          type: SUCCESS,
          payload: res.data,
          meta: res,
        });
        yield call(storyAPI.getStoryList(payload.owner));
      } catch (error) {
        yield put({
          type: FAILURE,
          payload: error,
          error: true,
        });
      }

      yield put(finishLoading(type));
    };
  }

  if (type === 'LOAD_STORYS') {
    const LOAD_STORY = 'story/LOAD_STORY';
    return function* ({ payload }) {
      yield put(startLoading(type));

      try {
        const res = yield call(reqAPI, payload);
        const storyUrls = res.data.map((story) => story.story);

        for (let i = 0; i < storyUrls.length; i += 1) {
          const { story } = res.data[i];
          yield put({
            type: LOAD_STORY,
            payload: {
              story,
            },
            meta: res,
          });
        }

        yield put({
          type: SUCCESS,
          payload: res.data,
          meta: res,
        });
      } catch (error) {
        yield put({
          type: FAILURE,
          payload: error,
          error: true,
        });
      }

      yield put(finishLoading(type));
    };
  }

  return function* ({ payload }) {
    yield put(startLoading(type));

    try {
      const res = yield call(reqAPI, payload);
      yield put({
        type: SUCCESS,
        payload: res.data,
        meta: res,
      });
    } catch (error) {
      yield put({
        type: FAILURE,
        payload: error,
        error: true,
      });
    }

    yield put(finishLoading(type));
  };
};

export default createSaga;
