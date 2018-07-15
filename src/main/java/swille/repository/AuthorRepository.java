package swille.repository;

import swille.domain.Author;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Author entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AuthorRepository extends MongoRepository<Author, String> {

}
