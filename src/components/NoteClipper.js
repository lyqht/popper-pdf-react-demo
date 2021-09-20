import React, { useState } from 'react';
import { usePopper } from 'react-popper';

const NoteClipper = ({ virtualReference, toShow }) => {
  const [popperElement, setPopperElement] = React.useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(virtualReference, popperElement, {
    modifiers: [
      {
        name: 'arrow',
        options: { element: arrowElement },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  return (
    <div
      ref={setPopperElement}
      className={'tooltip-container'}
      style={{
        ...styles.popper,
        display: `${toShow ? 'block' : 'none'}`,
      }}
      {...attributes.popper}
    >
      <div
        ref={setArrowElement}
        className={'tooltip-arrow'}
        style={{
          ...styles.arrow,
        }}
      />
      <p>Save Note?</p>
      <button>Yes</button>
    </div>
  );
};

export default NoteClipper;
