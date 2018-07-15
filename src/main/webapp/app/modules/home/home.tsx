import './home.scss';

import * as React from 'react';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Alert, Col, Row } from 'reactstrap';
import { getSession } from 'app/shared/reducers/authentication';
import { getLoginUrl } from 'app/shared/util/url-utils';
import { postGapiCode, getPhotosList } from '../administration/administration.reducer'

export interface IHomeProp extends StateProps, DispatchProps {}

const SCOPE = 'profile email https://www.googleapis.com/auth/photoslibrary';
// const SCOPE = 'profile email https://www.googleapis.com/auth/drive';

export class Home extends React.Component<IHomeProp> {
  constructor() {
    super();
    this.intiGapiClient = this.intiGapiClient.bind(this);
    this.signInToGoogle = this.signInToGoogle.bind(this);
    this.revokeGapi = this.revokeGapi.bind(window);
    this.getGapiCode = this.getGapiCode.bind(this);
    this.getPhotosList = this.getPhotosList.bind(this);
  }

  componentDidMount() {
    this.props.getSession();
    this.loadGapi();
  }

  loadGapi() {
    window.gapi.load('client:auth2', this.intiGapiClient);
  }

  intiGapiClient() {
    const OauthUrl = 'https://accounts.google.com/o/oauth2/auth';
    const discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
    // window.gapi.client.init({
    //   'apiKey': 'photos2',
    //   'discoveryDocs': [],
    //   'clientId': '537652529956-khsvspnniq7j3l45qkildh8mu0nl852d.apps.googleusercontent.com',
    //   'responseType': 'code',
    //   'accessType': 'offline',
    //   'redirect_uri': 'http://localhost:8080/api/gapi/photos',
    //   'scope': SCOPE
    // }).then(function () {
    //   window.GoogleAuth = window.gapi.auth2.getAuthInstance();
    // });

    window.gapi.auth2.init({
      client_id: '537652529956-khsvspnniq7j3l45qkildh8mu0nl852d.apps.googleusercontent.com',
      scope: SCOPE
    }).then(data => {
      console.log('auth2:', data);
      window.GoogleAuth = window.gapi.auth2.getAuthInstance();
    });
  }

  signInToGoogle() {
    if (!window.GoogleAuth) return;

    if (window.GoogleAuth.isSignedIn.get()) {
      // User is authorized and has clicked 'Sign out' button.
      window.GoogleAuth.signOut();
    } else {
      // User is not signed in. Start Google auth flow.
      window.GoogleAuth.signIn().then(data => {
        const token = window.gapi.auth.getToken();
        // this.props.gapiToken(token.id_token, token.access_token);
      });
    }
  }

  revokeGapi() {
    (window.GoogleAuth) ? window.GoogleAuth.disconnect() : null;
  }

  getPhotosList(){
    this.props.getPhotosList().then(data=>console.log('...photos ', data))
  }

  getGapiCode() {
    let self = this;
    window.GoogleAuth.grantOfflineAccess({
      scope: SCOPE
    }).then(data => {
      self.props.postGapiCode(data.code).then(data => console.log('..resp:', data));
    });
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
            <button id="gapi-signin" onClick={this.signInToGoogle}>Sign in/out of Google</button>
            <button id="gapi-revoke" onClick={this.revokeGapi}>Revoke Google perms</button>
            <button id="gapi-code" onClick={this.getGapiCode}>Get Access Code</button>
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

const mapDispatchToProps = { getSession, postGapiCode, getPhotosList };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
