import { useEffect, useState } from "react";
import { fetchImages } from "./services/images-api";
import Searchbar from "./Components/Searchbar";
import ImageGallery from "./Components/ImageGallery";
import Button from "./Components/Button";
import Modal from "./Components/Modal";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function App() {
    const [name, setName] = useState('');
    const [imageArr, setImageArr] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [largeImageUrl, setLargeImageUrl] = useState('');
    const [openModal, setOpenModal] = useState(false)

    const handleSubmit = (search) => {
        setName(search);
        setImageArr([]);
        setPageNumber(1);
        setError(null);
    }
    
     useEffect(()=>{
          if (!name) {
      return;
    }
            fetchImages(name)
        .then(nextImages=> {
            setImageArr(prevArr => [...prevArr, ...nextImages]);
            // setPageNumber(prevPage => prevPage+1);
            
        })
        .catch((error) => setError(true))
        .finally(() => {
            setIsLoading(false);
            if (pageNumber > 1) {
                    window.scrollTo({
                        top: document.documentElement.scrollHeight,
                        behavior: 'smooth',
                    });
                }
            })
        }, [name, pageNumber])

    const loadImages = () => {
        setIsLoading(true);
        setPageNumber(prevPage => prevPage+1)
    }

    const onClickImage = (e) => {
        setLargeImageUrl(e.target.dataset.largeimage);
        setOpenModal(true)
        console.log(largeImageUrl)
    }

    const toggleModal = () => setOpenModal(!openModal);
  
    const closeModalESC = (e) => {
        if (e.code === 'Escape') {
            toggleModal()
        }
    }

    const closeModalOverlay = (e) => {
        if (e.currentTarget === e.target) {
            toggleModal()
        }
    }

    return (
            <>
                <Searchbar
                    onSubmit={handleSubmit}
                />
                <ImageGallery
                    images={imageArr}
                    onClick={onClickImage}
                />
                {isLoading &&
                    <Loader
                        type="Hearts"
                        color="#00BFFF"
                        height={80}
                        width={80} />              
                }
                {error && <h1>Error...</h1>}
                {imageArr.length > 0 && <Button onClick={loadImages} />}
                {openModal && <Modal
                    imageUrl={largeImageUrl}
                    closeEsc={closeModalESC}
                    closeOverlay={closeModalOverlay}
                    onClose={toggleModal}
                />}
            </>
        )
}


