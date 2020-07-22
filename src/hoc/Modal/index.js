import React from 'react';

import './Modal.scss';

const modal = (props) => {
  return (
    <div className="modal"
    style={{
      display: props.show ? 'block' : 'none',
      transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
      opacity: props.show ? '1' : '0'
    }}>
      <div className="modal-content">
        {props.children}
      </div>
    </div>
  )
}

export default modal;