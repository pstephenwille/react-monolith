package swille.repository;

import swille.domain.Album;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Album entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlbumRepository extends MongoRepository<Album, String> {
}
