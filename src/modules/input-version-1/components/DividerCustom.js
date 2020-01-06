import React from 'react';

const DividerCustom = ({ item }) => {
  return <div style={{ height: `${item.data.value}px` }} />;
};

export default DividerCustom;
