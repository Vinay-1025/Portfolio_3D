import React, { useState } from 'react';
import { FaAward, FaExternalLinkAlt, FaSearchPlus } from 'react-icons/fa';
import { certificationsData } from '../data/certificationsData';
import ImageModal from './ImageModal';
import './Certifications.css';

export default function Certifications() {
  const [modalConfig, setModalConfig] = useState({ isOpen: false, images: [], index: 0 });

  const openModal = (image) => {
    setModalConfig({ isOpen: true, images: [image], index: 0 });
  };

  return (
    <section id="certifications" className="certifications-section section">
      <div className="container">
        <div className="section-label" style={{ justifyContent: 'center' }}>05. Accomplishments</div>
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '4rem' }}>Certifications</h2>

        <div className="certifications-grid">
          {certificationsData.map((cert) => (
            <div key={cert.id} className="cert-card reveal" onClick={() => openModal(cert.image)}>
              <div className="cert-visual">
                <img src={cert.image} alt={cert.title} className="cert-img" />
                <div className="cert-overlay">
                  <FaSearchPlus size={24} />
                  <span>View Full Certificate</span>
                </div>
                <div
                  className="cert-glow"
                  style={{ background: `radial-gradient(circle, ${cert.accent}30 0%, transparent 70%)` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <ImageModal
        isOpen={modalConfig.isOpen}
        images={modalConfig.images}
        initialIndex={modalConfig.index}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />
    </section>
  );
}
