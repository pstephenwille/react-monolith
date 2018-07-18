import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './photos.reducer';
import { IPhotos } from 'app/shared/model/photos.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPhotosDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class PhotosDetail extends React.Component<IPhotosDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { photosEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="reactMonolithApp.photos.detail.title">Photos</Translate> [<b>{photosEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="reactMonolithApp.photos.name">Name</Translate>
              </span>
            </dt>
            <dd>{photosEntity.name}</dd>
            <dt>
              <span id="uri">
                <Translate contentKey="reactMonolithApp.photos.uri">Uri</Translate>
              </span>
            </dt>
            <dd>{photosEntity.uri}</dd>
            <dt>
              <span id="text">
                <Translate contentKey="reactMonolithApp.photos.text">Text</Translate>
              </span>
            </dt>
            <dd>{photosEntity.text}</dd>
            <dt>
              <span id="album">
                <Translate contentKey="reactMonolithApp.photos.album">Album</Translate>
              </span>
            </dt>
            <dd>{photosEntity.album}</dd>
          </dl>
          <Button tag={Link} to="/entity/photos" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/photos/${photosEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ photos }: IRootState) => ({
  photosEntity: photos.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PhotosDetail);
