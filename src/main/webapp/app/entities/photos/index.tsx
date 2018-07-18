import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Photos from './photos';
import PhotosDetail from './photos-detail';
import PhotosUpdate from './photos-update';
import PhotosDeleteDialog from './photos-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PhotosUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PhotosUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PhotosDetail} />
      <ErrorBoundaryRoute path={match.url} component={Photos} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PhotosDeleteDialog} />
  </>
);

export default Routes;
