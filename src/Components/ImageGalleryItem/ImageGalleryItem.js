import PropTypes from 'prop-types';
import styles from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({ id, src, alt, largeImage, onClickImage }) {
        return (
            <li key={id} className={styles["ImageGalleryItem"]}>
                <img src={src}
                    alt={alt}
                    className="ImageGalleryItem-image"
                    width="355px"
                    data-largeimage={largeImage}
                    onClick={onClickImage}/>
            </li >
        )
    }


ImageGalleryItem.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
    onClickImage: PropTypes.func.isRequired
}
