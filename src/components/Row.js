import React from 'react';
import Box from './Box';

const Row = ({ cols, id }) => {
  return (
    <div class="flex-container" id={id}>
      {cols.map((item, index) => (
        <Box key={`col-${index}`} id={`col-${index}`} index={index} />
      ))}
    </div>
  );
};

export default Row;
