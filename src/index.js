import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Gallery from "react-photo-gallery";
import { Photos } from "./Photos";
import Carousel, { Modal, ModalGateway } from "react-images";

export default function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <div>
      {/* <h1>Hi</h1> */}
      <Gallery photos={Photos} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={Photos.map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}

// const BasicRows = () => <Gallery Photos={Photos} />;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
