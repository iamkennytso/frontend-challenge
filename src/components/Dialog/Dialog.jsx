import React, { useEffect } from 'react';
import * as styles from './Dialog.module.scss'

const Dialog = ({open, onClose, children }) => {
  const ESCAPE_KEY_CODE = 27

  const handleKeyUp = (e) => {
    if (e.keyCode === ESCAPE_KEY_CODE) {
      window.removeEventListener('keyup', handleKeyUp, false);
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp, false);

    return () => {
      window.removeEventListener('keyup', handleKeyUp, false);
    };
  }, [handleKeyUp]);

  return <div className={`${styles.dialog} ${open ? styles.isOpen : styles.isClosed}`}>
    { open
      ? <div onClick={() => onClose()} className={styles.backDrop} />
      : null 
    }
    <div className={styles.content}>
      {children}
    </div>
  </div>
}

export default Dialog