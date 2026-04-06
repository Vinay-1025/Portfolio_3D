import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import './ImageModal.css';

export default function ImageModal({ isOpen, images, initialIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialIndex]);

  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback((e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="image-modal-overlay" onClick={onClose}>
      <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
        <FaTimes />
      </button>

      <div className="modal-content">
        <div className="modal-header" onClick={(e) => e.stopPropagation()}>
          <h4 className="modal-slide-title">
            {images[currentIndex]?.title || 'Preview'}
          </h4>
        </div>

        <div className="modal-main-row">
          {images.length > 1 && (
            <button className="modal-nav-btn prev" onClick={handlePrev} aria-label="Previous image">
              <FaChevronLeft />
            </button>
          )}

          <div className="modal-image-container">
            <img
              src={typeof images[currentIndex] === 'string' ? images[currentIndex] : images[currentIndex].url}
              alt={images[currentIndex]?.title || `Project view ${currentIndex + 1}`}
              className="modal-main-image"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {images.length > 1 && (
            <button className="modal-nav-btn next" onClick={handleNext} aria-label="Next image">
              <FaChevronRight />
            </button>
          )}
        </div>

        <div className="modal-footer">
          <div className="modal-indicator" onClick={(e) => e.stopPropagation()}>
            <span className="current">{currentIndex + 1}</span>
            <span className="divider">/</span>
            <span className="total">{images.length}</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
