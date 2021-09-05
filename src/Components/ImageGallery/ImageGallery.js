import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import PropTypes from 'prop-types';
import styles from "./ImageGallery.module.css";

export default function ImageGallery({ images, onClick }){
    return (
            <ul className={styles["ImageGallery"]}>
                {images.map(image => {
                    return (
                        <ImageGalleryItem
                            key={image.id}
                            src={image.webformatURL}
                            alt={image.tags}
                            largeImage={image.largeImageURL}
                            onClickImage={onClick}
                        />
                    )})}
            </ul>
        )
}

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
}