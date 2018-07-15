package swille.config.dbmigrations;

import swille.domain.Album;
import swille.domain.Authority;
import swille.domain.User;
import swille.security.AuthoritiesConstants;

import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.time.Instant;
import java.util.ArrayList;

/**
 * Creates the initial database setup
 */
@ChangeLog(order = "001")
public class InitialSetupMigration {

    @ChangeSet(order = "01", author = "initiator", id = "01-addAuthorities")
    public void addAuthorities(MongoTemplate mongoTemplate) {
        Album album = new Album();
        album.setDisplayOrder(0);
        album.setName("album_test");
        album.setPhotos(new ArrayList<>());

        Authority adminAuthority = new Authority();
        adminAuthority.setName(AuthoritiesConstants.ADMIN);
        Authority userAuthority = new Authority();
        userAuthority.setName(AuthoritiesConstants.USER);

        mongoTemplate.save(album);
        mongoTemplate.save(adminAuthority);
        mongoTemplate.save(userAuthority);
    }
}
