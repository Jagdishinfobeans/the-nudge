import React from 'react';

const GridCell = ({ cellData, onClick, isCorrectAnswer }) => {
  console.log('isCorrectAnswer: ', isCorrectAnswer);
  return (
    <div className={`col-4 border border-dark cell text-white ${isCorrectAnswer === true && "bg-green" } ${isCorrectAnswer === false && "bg-red" } ${isCorrectAnswer === undefined && "bg-gray" }`} onClick={onClick}>
      {cellData}
    </div>
  );
};

export default GridCell;
