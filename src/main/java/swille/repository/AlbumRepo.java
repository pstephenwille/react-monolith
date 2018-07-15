package swille.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import swille.domain.Album;

@SuppressWarnings
@Repository
public interface AlbumRepo extends MongoRepository<Album, String> {
}
