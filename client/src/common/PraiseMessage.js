import React, { useState, useEffect } from "react";

const PraiseMessage = ({ message, onClose }) => {
  const [showPraise, setShowPraise] = useState(true);
  useEffect(() => {
    const confettiTimer = setTimeout(() => {
      setShowPraise(false);
      onClose(); 
    }, 5000);

    return () => clearTimeout(confettiTimer);
  }, [onClose]);

  
  return (
    <div className={`modal ${showPraise ? "d-block" : "d-none"}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default PraiseMessage;
