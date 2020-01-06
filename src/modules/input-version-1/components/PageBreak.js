import React from 'react';

const PageBreak = () => {
  return (
    <div
      style={{
        backgroundColor: '#e5e5e5',
        height: '10px',
        pageBreakBefore: 'always'
      }}
    />
  );
};

export default PageBreak;
