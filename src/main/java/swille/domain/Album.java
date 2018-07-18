package swille.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * A Album.
 */
@Document(collection = "album")
public class Album implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("name")
    private String name;

    @Field("display_order")
    private Integer displayOrder;

    @Field("photos")
    private List<Photo> photosList = new ArrayList<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Album name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public Album displayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
        return this;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    public List<Photo> getPhotosList() {
        return photosList;
    }

    public void setPhotosList(List<Photo> photosList) {
        this.photosList = photosList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Album album = (Album) o;
        if (album.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), album.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Album{" +
               "id=" + getId() +
               ", name='" + getName() + "'" +
               ", displayOrder=" + getDisplayOrder() +
               "}";
    }
}
