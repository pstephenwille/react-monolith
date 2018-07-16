package swille.web.rest;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeRequestUrl;
import com.google.api.client.googleapis.auth.oauth2.GoogleBrowserClientRequestUrl;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.googleapis.services.GoogleClientRequestInitializer;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.photoslibrary.v1.PhotosLibrary;
import com.google.api.services.photoslibrary.v1.model.MediaItem;
import com.google.api.services.photoslibrary.v1.model.SearchMediaItemsRequest;
import com.google.api.services.photoslibrary.v1.model.SearchMediaItemsResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import java.io.InputStreamReader;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import swille.service.GAPI.GapiUtility;

@RestController
@RequestMapping("/gapi")
public class PhotosApi {

    private final Logger log = LoggerFactory.getLogger(UserResource.class);

    @Autowired
    private GapiUtility gapiUtility;

    @Value("${google.oauth2.scopes}")
    private String scopes;
    @Value("${google.oauth2.tokeninfo.auth-code-url}")
    private String codeAuthUri;
    @Value("${google.oauth2.callback-uri}")
    private String callbackUri;

    @GetMapping("/authorize")
    public String authorizeGoogle(final HttpServletResponse response) throws Exception {
        GoogleClientSecrets secrets = gapiUtility.getClientSecrets();

        /** Authorizes the application to access user's protected data. */
        // set up authorization code flow
        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
            GoogleNetHttpTransport.newTrustedTransport(),
            JacksonFactory.getDefaultInstance(),
            secrets,
            Collections.singleton(scopes))
            .setApprovalPrompt("force")
            .build();

        GoogleAuthorizationCodeRequestUrl authUrl = flow.newAuthorizationUrl();
        authUrl.setRedirectUri(callbackUri);

        return authUrl.build();
    }

    @GetMapping("/auth/code")
    public RedirectView exchangeCodeForAccessToken(@RequestParam String code) throws Exception {
        /** oauth callback uri handler;
         * Sets access_token on Credentail */
        gapiUtility.createGoogleCredentail(code, new GoogleTokenResponse());

        return new RedirectView("http://localhost:8080");
    }


    @GetMapping("/photos/list")
    public String getGPhotosList() throws Exception {
        SearchMediaItemsRequest searchMediaItemsRequest = new SearchMediaItemsRequest();

        PhotosLibrary photosLibrary = new PhotosLibrary.Builder(
            GoogleNetHttpTransport.newTrustedTransport(),
            JacksonFactory.getDefaultInstance(),
            gapiUtility.getCredential())
            .setApplicationName("photos2")
            .build();

        SearchMediaItemsResponse items = photosLibrary.mediaItems()
            .search(searchMediaItemsRequest)
            .execute();

        List<MediaItem> photos = items.getMediaItems();

        return "photos list length: " + photos.size();
    }
}
