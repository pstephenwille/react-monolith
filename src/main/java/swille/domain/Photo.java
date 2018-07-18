package swille.domain;

import java.io.Serializable;


public class Photo implements Serializable {

    private static final long serialVersionUID = 1L;
    private int displayOrder;
    private String id;
    private String uri;
    private String album;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public int getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(int displayOrder) {
        this.displayOrder = displayOrder;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public String getAlbum() {
        return album;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

}
