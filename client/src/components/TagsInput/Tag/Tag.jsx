import React from 'react';

const Tag = ({name, onClick}) => {
  return (
    <div className="tag-item">
      <span className="text">{name}</span>
      <span className='close' onClick={() => onClick(name)}>&times;</span>
    </div>
  )
}

export default Tag