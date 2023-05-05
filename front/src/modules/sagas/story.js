/* eslint-disable prettier/prettier */
import {
  all,
  fork,
  takeEvery,
  takeLatest,
  call,
  put,
  delay,
} from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import { startLoading, finishLoading } from 'modules/reducers/loading';

import createType from 'lib/util/createType';
import createSaga from 'lib/util/createSaga';

import * as storyAPI from '../../lib/api/user';

// prettier-ignore
export const [
  LOAD_STORYS,
  LOAD_STORYS_SUCCESS,
  LOAD_STORYS_FAILURE,
] = createType('story/LOAD_STORYS');

// prettier-ignore
export const [
  LOAD_STORY,
  LOAD_STORY_SUCCESS,
  LOAD_STORY_FAILURE,
] = createType('story/LOAD_STORY');

// prettier-ignore
export const [
  ADD_STORY,
  ADD_STORY_SUCCESS,
  ADD_STORY_FAILURE,
] = createType('story/ADD_STORY');

function* createLoadStorySaga({ payload }) {
  yield put(startLoading(LOAD_STORYS));

  try {
    const res = yield call(storyAPI.getStoryList, payload);
    const storyUrls = res.data.map((story) => story.story);

    for (let i = 0; i < storyUrls.length; i += 1) {
      const { story } = res.data[i];
      console.log(res.data[i]);

      yield put({
        type: LOAD_STORY,
        payload: { storyID: story, idx: i },
      });
    }

    yield put({
      type: LOAD_STORYS_SUCCESS,
      payload: res.data,
      meta: res,
    });
  } catch (error) {
    yield put({
      type: LOAD_STORYS_FAILURE,
      payload: error,
      error: true,
    });
  }

  yield put(finishLoading(LOAD_STORYS));
}

function* createAddStorySaga({ payload }) {
  yield put(startLoading(ADD_STORY));

  try {
    const res = yield call(storyAPI.addStoryCover, payload);
    yield put({
      type: ADD_STORY_SUCCESS,
      payload: res.data,
      meta: res,
    });
    yield call(storyAPI.getStoryList, payload.owner);
  } catch (error) {
    yield put({
      type: ADD_STORY_FAILURE,
      payload: error,
      error: true,
    });
  }

  yield put(finishLoading(ADD_STORY));
}

export const loadStorys = createAction(LOAD_STORYS, (id) => id);
export const loadStory = createAction(LOAD_STORY, (coverID) => coverID);
export const addStory = createAction(ADD_STORY, (data) => data);

// const loadStorysSaga = createSaga(LOAD_STORYS, storyAPI.getStoryList);
const loadStoryCoverSaga = createSaga(LOAD_STORY, storyAPI.getStoryCover);
// const addStorySaga = createSaga(ADD_STORY, storyAPI.addStoryCover);

function* watchLoadStorysSaga() {
  yield takeLatest(LOAD_STORYS, createLoadStorySaga);
}

function* watchLoadStoryCoverSaga() {
  yield takeEvery(LOAD_STORY, loadStoryCoverSaga);
}

function* watchAddStory() {
  yield takeLatest(ADD_STORY, createAddStorySaga);
}

export function* storysSaga() {
  yield all([
    fork(watchLoadStorysSaga),
    fork(watchLoadStoryCoverSaga),
    fork(watchAddStory),
  ]);
}
