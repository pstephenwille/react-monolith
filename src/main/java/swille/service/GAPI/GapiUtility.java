package swille.service.GAPI;

import com.google.api.client.auth.oauth2.AuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStreamReader;

import swille.web.rest.UserResource;

@Service
public class GapiUtility {

    private final Logger log = LoggerFactory.getLogger(UserResource.class);

    public GoogleClientSecrets getClientSecrets() {
        return clientSecrets;
    }

    private GoogleClientSecrets clientSecrets;


    private GoogleCredential credential;
    @Value("${google.oauth2.tokeninfo.auth-code-url}")
    private String codeAuthUri;

    @Value("${google.oauth2.callback-uri}")
    private String callbackUri;

    public GapiUtility() {
        try {
            this.clientSecrets = GoogleClientSecrets.load(
                JacksonFactory.getDefaultInstance(),
                new InputStreamReader(this.getClass()
                    .getResourceAsStream("/private/photos2.gapi.json")));
        } catch (Exception e) {
            log.error("G-clientSecrets failed:", e);
        }
    }


    public GapiUtility createGoogleCredentail(String code, GoogleTokenResponse token) {
        try {
            token = new GoogleAuthorizationCodeTokenRequest(
                GoogleNetHttpTransport.newTrustedTransport(),
                JacksonFactory.getDefaultInstance(),
                codeAuthUri,
                this.clientSecrets.getDetails().getClientId(),
                this.clientSecrets.getDetails().getClientSecret(),
                code,
                callbackUri).execute();

            this.credential = new GoogleCredential().setAccessToken(token.getAccessToken());

        } catch (Exception e) {
            log.error("G-credential failed:", e);
        }
        return this;
    }

    public GoogleCredential getCredential() {
        return credential;
    }
}
