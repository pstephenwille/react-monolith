package swille.domain;

import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

public class Photo implements Serializable {
    private static final long serialVersionUID = 1L;
    private int displayOrder;
    private String id;
    private String uri;
    private String album;

}
