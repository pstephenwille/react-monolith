package swille.service;

import swille.domain.Author;
import swille.repository.AuthorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing Author.
 */
@Service
public class AuthorService {

    private final Logger log = LoggerFactory.getLogger(AuthorService.class);

    private final AuthorRepository authorRepository;

    public AuthorService(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    /**
     * Save a author.
     *
     * @param author the entity to save
     * @return the persisted entity
     */
    public Author save(Author author) {
        log.debug("Request to save Author : {}", author);        return authorRepository.save(author);
    }

    /**
     * Get all the authors.
     *
     * @return the list of entities
     */
    public List<Author> findAll() {
        log.debug("Request to get all Authors");
        return authorRepository.findAll();
    }


    /**
     * Get one author by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    public Optional<Author> findOne(String id) {
        log.debug("Request to get Author : {}", id);
        return authorRepository.findById(id);
    }

    /**
     * Delete the author by id.
     *
     * @param id the id of the entity
     */
    public void delete(String id) {
        log.debug("Request to delete Author : {}", id);
        authorRepository.deleteById(id);
    }
}
