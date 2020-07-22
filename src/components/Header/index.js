import './Header.scss';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const header = props => {
  return(
    <header>
        <h1>NASA Collection</h1>
        <div className="group-btn">
          <button onClick={props.openModalHandler} className="btn"><FontAwesomeIcon size="lg" icon={faPlus} />Add new item</button>
          <button className="btn"><FontAwesomeIcon size="lg" icon={faArrowRight} />
            <Link className="" to="/search">To Search Page</Link>
          </button>
        </div>
      </header>
  );
};

export default header;
