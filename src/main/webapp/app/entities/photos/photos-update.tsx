import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './photos.reducer';
import { IPhotos } from 'app/shared/model/photos.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IPhotosUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IPhotosUpdateState {
  isNew: boolean;
}

export class PhotosUpdate extends React.Component<IPhotosUpdateProps, IPhotosUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { photosEntity } = this.props;
      const entity = {
        ...photosEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/photos');
  };

  render() {
    const isInvalid = false;
    const { photosEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="reactMonolithApp.photos.home.createOrEditLabel">
              <Translate contentKey="reactMonolithApp.photos.home.createOrEditLabel">Create or edit a Photos</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : photosEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="photos-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="reactMonolithApp.photos.name">Name</Translate>
                  </Label>
                  <AvField id="photos-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="uriLabel" for="uri">
                    <Translate contentKey="reactMonolithApp.photos.uri">Uri</Translate>
                  </Label>
                  <AvField id="photos-uri" type="text" name="uri" />
                </AvGroup>
                <AvGroup>
                  <Label id="textLabel" for="text">
                    <Translate contentKey="reactMonolithApp.photos.text">Text</Translate>
                  </Label>
                  <AvField id="photos-text" type="text" name="text" />
                </AvGroup>
                <AvGroup>
                  <Label id="albumLabel" for="album">
                    <Translate contentKey="reactMonolithApp.photos.album">Album</Translate>
                  </Label>
                  <AvField id="photos-album" type="text" name="album" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/photos" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={isInvalid || updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  photosEntity: storeState.photos.entity,
  loading: storeState.photos.loading,
  updating: storeState.photos.updating
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PhotosUpdate);
