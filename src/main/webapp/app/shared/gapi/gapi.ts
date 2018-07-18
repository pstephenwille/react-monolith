import axios from 'axios';
import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
  GET_PHOTO_LIST: 'gapi/GET_PHOTO_LIST',
  GET_GOOGLE_PROFILE: 'gapi/GET_GOOGLE_PROFILE'
};

const initialState = {
  loading: false,
  profile: {},
  photoList: []
};

export type GapiState = Readonly<typeof initialState>;

export default (state: GapiState = initialState, action): GapiState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_PHOTO_LIST):
    // case REQUEST(ACTION_TYPES.GET_GOOGLE_PROFILE):
      return {
        ...state,
        loading: true,
        photoList: [ ' start' ]
      };
    case SUCCESS(ACTION_TYPES.GET_PHOTO_LIST):
      return {
        ...state,
        loading: false,
        photoList: action.payload.data
      };
    default:
      return state;
  }
};

export const getGoogleProfile = () => dispatchEvent => ({
  type: ACTION_TYPES.GET_GOOGLE_PROFILE,
  payload: axios.get('/gapi/profile')
});

export const getPhotoList = () => dispatch =>
  dispatch({
    type: ACTION_TYPES.GET_PHOTO_LIST,
    payload: axios.get('/gapi/photos/list')
  });
