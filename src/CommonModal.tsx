import React from 'react';
import ReactDOM from 'react-dom';

interface IStyles {
  [key: string]: React.CSSProperties;
}


interface ICommonModal {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const CommonModal = ({ isOpen, onClose, children }: ICommonModal) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={styles.closeButton}>×</button>
        {children}
      </div>
    </div>,
    document.body
  );
};

const styles:IStyles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    background: '#fff',
    padding: '24px',
    borderRadius: '8px',
    minWidth: '70%',
    position: 'relative',
    maxHeight:'66%',
    overflow:'scroll',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
  },
  closeButton: {
    color:'black',
    position: 'absolute',
    top: '10px',
    right: '12px',
    fontSize: '24px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    lineHeight: '1'
  }
};

export default CommonModal;
