import { handleActions } from 'redux-actions';
import { produce } from 'immer';

// prettier-ignore
import {
  LOAD_STORYS_SUCCESS,
  LOAD_STORYS_FAILURE,
  ADD_STORY_SUCCESS,
  ADD_STORY_FAILURE,
  LOAD_STORY_SUCCESS,
  LOAD_STORY_FAILURE,
} from 'modules/sagas/story';

const initialState = {
  storys: null,
  story: [],
  loadStoryListError: null,
  addStoryError: null,
  loadStoryError: null,
  isAdded: false,
};

const storys = handleActions(
  {
    [LOAD_STORYS_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.story = [];
        draft.storys = action.payload;
        draft.loadStoryListError = null;
        draft.isAdded = false;
      }),
    [LOAD_STORYS_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.loadStoryListError = action.payload;
      }),
    [ADD_STORY_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.addStoryError = null;
        draft.isAdded = true;
      }),
    [ADD_STORY_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.addStoryError = action.payload;
        draft.isAdded = false;
      }),
    [LOAD_STORY_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        if (draft.story.length === draft.storys.length) return;
        const index = action.payload.order;
        draft.story[index] = action.payload.image;
        draft.loadStoryError = null;
      }),
    [LOAD_STORY_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.loadStoryError = action.payload;
      }),
  },
  initialState,
);

export default storys;
