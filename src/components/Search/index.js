import './Search.scss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default class Search extends Component {
  state = {
    keyword: ''
  }
  onSearch = (e) => {
    if (e.key === 'Enter') {
      this.props.onGetList(e.target.value);
      this.setState({
        ...this.state,
        keyword: e.target.value
      })
    }
  }

  render() {
    const { totalHits } = this.props;
    return(
      <div className="search">
        <div className="navigation">
          <Link className="" to="/"><FontAwesomeIcon icon={faChevronLeft} />Back to collection</Link>
        </div>
        <div className="title">
          <span>Search from Nasa</span>
        </div>
        <div className="flex">
          <input onKeyPress={this.onSearch} type="text" placeholder="Type something to search..." />
        </div>
        
        {
          this.state.keyword 
            ?
          <div className="flex">
            <span className="results">{totalHits} results for "{this.state.keyword}"</span>
          </div>
            :
          ''
        }
      </div>
    );
  }
}
