package swille.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import swille.domain.Album;

public interface AlbumRepo extends MongoRepository<Album, String> {
}
