import React from 'react';

const CheckMarkOrCross = ({ showCheckMark }) => {
  return (
    <>
      {showCheckMark ? (
        <span style={{ fontSize: '64px', color: 'green' }}><span>&#10003;</span></span>
      ) : (
        <span style={{ fontSize: '64px', color: 'red' }}><span>&#10539;</span></span>
      )}
    </>
  );
};

export default CheckMarkOrCross;