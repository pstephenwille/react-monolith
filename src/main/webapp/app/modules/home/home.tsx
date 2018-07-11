import './home.scss';

import * as React from 'react';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Alert, Col, Row } from 'reactstrap';
import { getSession } from 'app/shared/reducers/authentication';
import { getLoginUrl } from 'app/shared/util/url-utils';
import { gapiToken } from '../administration/administration.reducer'

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  constructor() {
    super();
    this.intiGapiClient = this.intiGapiClient.bind(this);
    this.signInToGoogle = this.signInToGoogle.bind(this);
    this.revokeGapi = this.revokeGapi.bind(window);
  }

  componentDidMount() {
    this.props.getSession();
    this.loadGapi();
  }

  loadGapi() {
    window.gapi.load('client:auth2', this.intiGapiClient);
  }

  intiGapiClient() {
    const SCOPE = 'https://www.googleapis.com/auth/drive';
    const discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
    window.gapi.client.init({
      'apiKey': 'photos2',
      'discoveryDocs': [],
      'clientId': '537652529956-khsvspnniq7j3l45qkildh8mu0nl852d.apps.googleusercontent.com',
      'scope': SCOPE
    }).then(function () {
      window.GoogleAuth = window.gapi.auth2.getAuthInstance();
    })
  }

  // postGapiToken() {
  //   const token = window.gapi.auth.getToken();

  // fetch(`/api/token/${token.id_token}/${token.access_token}`)
  //   .then(data => {
  //     console.log('token then ', data);
  //   })
  // }

  signInToGoogle() {
    console.log('singin');
    if (window.GoogleAuth.isSignedIn.get()) {
      // User is authorized and has clicked 'Sign out' button.
      window.GoogleAuth.signOut();
    } else {
      // User is not signed in. Start Google auth flow.
      window.GoogleAuth.signIn().then(data => {
        const token = window.gapi.auth.getToken();
        this.props.gapiToken(token.id_token, token.access_token);

        $.ajax({
          url:`https://accounts.google.com/o/oauth2/token=${token.access_token}&client_id=537652529956-khsvspnniq7j3l45qkildh8mu0nl852d.apps.googleusercontent.com&client_secret=D3xHEX4b3qG3nZyrTWTzizxw&redirect_uri=http://localhost:8080/api/gapit/photos&grant_type=authorization_code`,
        dataType:'jsonp'})
      }).then(data => {
        console.log('token callback:', data);
      });
    }
  }

  revokeGapi() {
    window.GoogleAuth.disconnect();
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
            <button id="gapi-signin" onClick={this.revokeGapi}>Revoke Google perms</button>
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

const mapDispatchToProps = { getSession, gapiToken };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
