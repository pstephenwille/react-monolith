package swille.web.rest;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

import swille.service.GAPI.GapiUtility;

@RestController
@RequestMapping("/gapi")
public class PhotosApi {

    private final Logger log = LoggerFactory.getLogger(UserResource.class);

    @Autowired
    private GapiUtility gapiUtility;

    @Value("${google.oauth2.tokeninfo.auth-code-url}")
    private String codeAuthUri;
    private GoogleCredential credential;

    @PostMapping("/code")
    @ResponseBody
    public ResponseEntity exchangeCodeForAccessToken(@RequestBody Map<String, String> json)
    throws Exception {
        final String code = json.get("code");
        credential = gapiUtility
            .createGoogleCredentail(code, new GoogleTokenResponse())
            .getCredential();

        return new ResponseEntity(HttpStatus.CREATED);
    }


    @GetMapping("/photos/list")
    public String getGPhotosList() throws Exception {

        SearchMediaItemsRequest searchMediaItemsRequest = new SearchMediaItemsRequest();

        PhotosLibrary photosLibrary = new PhotosLibrary.Builder(
            GoogleNetHttpTransport.newTrustedTransport(),
            JacksonFactory.getDefaultInstance(),
            credential)
            .setApplicationName("photos2")
            .build();

        SearchMediaItemsResponse items = photosLibrary.mediaItems()
            .search(searchMediaItemsRequest)
            .execute();

        List<MediaItem> photos = items.getMediaItems();

        return "photos list length: " + photos.size();
    }
}
