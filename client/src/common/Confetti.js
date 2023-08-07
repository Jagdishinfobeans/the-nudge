import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const CustomConfetti = ({ message, onComplete }) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
      onComplete(); // Call the onComplete function after the confetti animation is completed
    }, 3000); // Adjust the duration as needed (in milliseconds)

    return () => clearTimeout(confettiTimer);
  }, [onComplete]);

  if (!showConfetti) return null;

  return (
    <div>
      <Confetti />
      <div className={`modal ${showConfetti ? "d-block" : "d-none"}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">{message}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomConfetti;
