import React, { useEffect } from 'react';

interface FlashMessageProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const FlashMessage: React.FC<FlashMessageProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
<div className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full shadow-md ${type === 'success' ? 'bg-green-400' : 'bg-red-400'}`}>
  <p>{message}</p>
</div>
  );
};

export default FlashMessage;
