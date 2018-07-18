import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './photos.reducer';
import { IPhotos } from 'app/shared/model/photos.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPhotosProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Photos extends React.Component<IPhotosProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { photosList, match } = this.props;
    return (
      <div>
        <h2 id="photos-heading">
          <Translate contentKey="reactMonolithApp.photos.home.title">Photos</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="reactMonolithApp.photos.home.createLabel">Create new Photos</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="reactMonolithApp.photos.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="reactMonolithApp.photos.uri">Uri</Translate>
                </th>
                <th>
                  <Translate contentKey="reactMonolithApp.photos.text">Text</Translate>
                </th>
                <th>
                  <Translate contentKey="reactMonolithApp.photos.album">Album</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {photosList.map((photos, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${photos.id}`} color="link" size="sm">
                      {photos.id}
                    </Button>
                  </td>
                  <td>{photos.name}</td>
                  <td>{photos.uri}</td>
                  <td>{photos.text}</td>
                  <td>{photos.album}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${photos.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${photos.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${photos.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ photos }: IRootState) => ({
  photosList: photos.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Photos);