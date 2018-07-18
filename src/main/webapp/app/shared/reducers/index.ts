import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from './user-management';
// prettier-ignore
import album, {
  AlbumState
} from 'app/entities/album/album.reducer';
// prettier-ignore
import photos, {
  PhotosState
} from 'app/entities/photos/photos.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

import gapi, { GapiState } from '../gapi/gapi';

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly album: AlbumState;
  readonly photos: PhotosState;
  readonly gapi: GapiState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  album,
  photos,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
  gapi
});

export default rootReducer;
