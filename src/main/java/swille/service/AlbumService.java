package swille.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import swille.domain.Album;
import swille.repository.AlbumRepo;

@Service
public class AlbumService {

    private final Logger log = LoggerFactory.getLogger(AuthorService.class);

    private final AlbumRepo albumRepo;

    public AlbumService(AlbumRepo repo) {
        this.albumRepo = repo;
    }

    public Album save(Album album) {
        log.debug("Request to save Album: {}", album);
        return albumRepo.save(album);

    }

}
