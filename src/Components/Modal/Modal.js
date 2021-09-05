import { useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from "./Modal.module.css"

const useCreatePortalInBody = () => {
    const wrapperRef = useRef(null);
    if (wrapperRef.current === null && typeof document !== 'undefined') {
        const div = document.createElement('div');
        div.setAttribute('data-body-portal', '');
        wrapperRef.current = div;
    }
    useLayoutEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper || typeof document === 'undefined') {
            return;
        }
        document.body.appendChild(wrapper);
        return () => {
            document.body.removeChild(wrapper);
        }
    }, [])
    return (children => wrapperRef.current && createPortal(children, wrapperRef.current))
}



export default function Modal({imageUrl, closeOverlay, closeEsc}) {
    useEffect(()=>{
        window.addEventListener('keydown', closeEsc)

        return ()=> {
            window.removeEventListener('keydown', closeEsc)
        }
    }, [closeEsc])
    
    const createBodyPortal = useCreatePortalInBody();
    return createBodyPortal(
            <div className={styles["Overlay"]} onClick={closeOverlay}>
                <div className={styles["Modal"]}>
                    <img src={imageUrl} alt='' />
                </div>
            </div>
        )
    }

Modal.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    closeOverlay: PropTypes.func.isRequired
}
