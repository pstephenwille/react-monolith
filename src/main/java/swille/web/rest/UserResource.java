package swille.web.rest;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;

import com.codahale.metrics.annotation.Timed;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

import io.github.jhipster.web.util.ResponseUtil;
import swille.config.Constants;
import swille.security.AuthoritiesConstants;
import swille.service.UserService;
import swille.service.dto.UserDTO;
import swille.web.rest.util.PaginationUtil;


/**
 * REST controller for managing users.
 * <p>
 * This class accesses the User entity, and needs to fetch its collection of authorities.
 * <p>
 * For a normal use-case, it would be better to have an eager relationship between User and Authority,
 * and send everything to the client side: there would be no View Model and DTO, a lot less code, and an outer-join
 * which would be good for performance.
 * <p>
 * We use a View Model and a DTO for 3 reasons:
 * <ul>
 * <li>We want to keep a lazy association between the user and the authorities, because people will
 * quite often do relationships with the user, and we don't want them to get the authorities all
 * the time for nothing (for performance reasons). This is the #1 goal: we should not impact our users'
 * application because of this use-case.</li>
 * <li> Not having an outer join causes n+1 requests to the database. This is not a real issue as
 * we have by default a second-level cache. This means on the first HTTP call we do the n+1 requests,
 * but then all authorities come from the cache, so in fact it's much better than doing an outer join
 * (which will get lots of data from the database, for each HTTP call).</li>
 * <li> As this manages users, for security reasons, we'd rather have a DTO layer.</li>
 * </ul>
 * <p>
 * Another option would be to have a specific JPA entity graph to handle this case.
 */
@RestController
@RequestMapping("/api")
public class UserResource {

    private static HttpTransport transport = new NetHttpTransport();
    private static final JacksonFactory jacksonFactory = new JacksonFactory();
    private final Logger log = LoggerFactory.getLogger(UserResource.class);
    private final UserService userService;
    @Value("${google.oauth2.tokeninfo.url}") private String tokenUrl;
    @Value("${google.oauth2.client-id}") private String clientId;

    public UserResource(UserService userService) {
        this.userService = userService;
    }

    /*
    * https://accounts.google.com/o/oauth2/token
code=4/X9lG6uWd8-MMJPElWggHZRzyFKtp.QubAT_P-GEwePvB8fYmgkJzntDnaiAI
&client_id={ClientId}.apps.googleusercontent.com
&client_secret={ClientSecret}
&redirect_uri=urn:ietf:wg:oauth:2.0:oob
&grant_type=authorization_code
*/
    @PutMapping("/gapi/token/{id}/{access}")
    public String handleToken(@PathVariable String id, @PathVariable String access)
        throws Exception {

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jacksonFactory)
            .setAudience(Collections.singleton(clientId))
            .build();

        GoogleIdToken idToken = verifier.verify(id);

        if (idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();


            if(payload.get("aud").equals(clientId)){
                System.out.println((char)27 + "[30;43m"+ "aud is good" +(char)27+"[0m");
                // if valid, create session for user
            }
        }

        return "woot";
    }

    @GetMapping("/gapi/photos")
    public String redirect(){
        System.out.println((char)27 + "[30;43m"+ "gapi photos" +(char)27+"[0m");
        return "good redirect";
    }

    /**
     * GET /users : get all users.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and with body all users
     */
    @GetMapping("/users")
    @Timed
    public ResponseEntity<List<UserDTO>> getAllUsers(Pageable pageable) {
        final Page<UserDTO> page = userService.getAllManagedUsers(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/users");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * @return a string list of the all of the roles
     */
    @GetMapping("/users/authorities")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public List<String> getAuthorities() {
        return userService.getAuthorities();
    }

    /**
     * GET /users/:login : get the "login" user.
     *
     * @param login the login of the user to find
     * @return the ResponseEntity with status 200 (OK) and with body the "login" user, or with status 404 (Not Found)
     */
    @GetMapping("/users/{login:" + Constants.LOGIN_REGEX + "}")
    @Timed
    public ResponseEntity<UserDTO> getUser(@PathVariable String login) {
        log.debug("REST request to get User : {}", login);
        return ResponseUtil.wrapOrNotFound(
            userService.getUserWithAuthoritiesByLogin(login)
                .map(UserDTO::new));
    }
}
