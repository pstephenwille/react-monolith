import './home.scss';

import * as React from 'react';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Alert, Col, Row } from 'reactstrap';
import { getSession } from 'app/shared/reducers/authentication';
import { getLoginUrl } from 'app/shared/util/url-utils';
import { getPhotosList, getGoogleLogin } from '../administration/administration.reducer'

export interface IHomeProp extends StateProps, DispatchProps {}

const SCOPE = 'profile email https://www.googleapis.com/auth/photoslibrary';

// const SCOPE = 'profile email https://www.googleapis.com/auth/drive';

export class Home extends React.Component<IHomeProp> {
  constructor() {
    super();
    this.getPhotosList = this.getPhotosList.bind(this);
    this.loginToGoogle = this.loginToGoogle.bind(this);
  }

  componentDidMount() {
    this.props.getSession();
  }

  getPhotosList() {
    this.props.getPhotosList().then(data => console.log('...photos ', data))
  }

  loginToGoogle() {
    this.props.getGoogleLogin().then(data => window.location.replace(data.value.data));
  }

  render() {
    const { account } = this.props;
    return (
      <Row>
        <Col md="9">
          <h2>
            <Translate contentKey="home.title">Welcome, Java Hipster!</Translate>
          </h2>
          <p className="lead">
            <Translate contentKey="home.subtitle">This is your homepage</Translate>
          </p>
          <div>
            <button id="google-login" onClick={this.loginToGoogle}>Login to Google</button>
            <button id="gapi-code" onClick={this.getPhotosList}>Get Photos List</button>
          </div>

          {account && account.login ? (
            <div>
              <Alert color="success">
                <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>
                  You are logged in as user {account.login}.
                </Translate>
              </Alert>
            </div>
          ) : (
             <div>
               <Alert color="warning">
                 <Translate contentKey="global.messages.info.authenticated.prefix">If you want to </Translate>
                 <a href={getLoginUrl()} className="alert-link">
                   <Translate contentKey="global.messages.info.authenticated.link">sign in</Translate>
                 </a>
                 <Translate contentKey="global.messages.info.authenticated.suffix">
                   , you can try the default accounts:
                   <br/>- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                   <br/>- User (login=&quot;user&quot; and password=&quot;user&quot;).
                 </Translate>
               </Alert>
             </div>
           )}

          <p>
            <Translate contentKey="home.question">If you have any question on JHipster:</Translate>
          </p>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession, getPhotosList, getGoogleLogin };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
