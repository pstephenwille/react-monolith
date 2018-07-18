import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IPhotos, defaultValue } from 'app/shared/model/photos.model';

export const ACTION_TYPES = {
  FETCH_PHOTOS_LIST: 'photos/FETCH_PHOTOS_LIST',
  FETCH_PHOTOS: 'photos/FETCH_PHOTOS',
  CREATE_PHOTOS: 'photos/CREATE_PHOTOS',
  UPDATE_PHOTOS: 'photos/UPDATE_PHOTOS',
  DELETE_PHOTOS: 'photos/DELETE_PHOTOS',
  RESET: 'photos/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPhotos>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PhotosState = Readonly<typeof initialState>;

// Reducer

export default (state: PhotosState = initialState, action): PhotosState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PHOTOS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PHOTOS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PHOTOS):
    case REQUEST(ACTION_TYPES.UPDATE_PHOTOS):
    case REQUEST(ACTION_TYPES.DELETE_PHOTOS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PHOTOS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PHOTOS):
    case FAILURE(ACTION_TYPES.CREATE_PHOTOS):
    case FAILURE(ACTION_TYPES.UPDATE_PHOTOS):
    case FAILURE(ACTION_TYPES.DELETE_PHOTOS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PHOTOS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PHOTOS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PHOTOS):
    case SUCCESS(ACTION_TYPES.UPDATE_PHOTOS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PHOTOS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = SERVER_API_URL + '/api/photos';

// Actions

export const getEntities: ICrudGetAllAction<IPhotos> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PHOTOS_LIST,
  payload: axios.get<IPhotos>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPhotos> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PHOTOS,
    payload: axios.get<IPhotos>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPhotos> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PHOTOS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPhotos> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PHOTOS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPhotos> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PHOTOS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
