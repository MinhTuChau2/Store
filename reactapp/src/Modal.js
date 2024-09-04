import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, title, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        <div className="modal-content">
          {children}
        </div>
        <button className="modal-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
