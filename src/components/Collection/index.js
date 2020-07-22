import './Collection.scss';

import React, { Component } from 'react';

import Item from './Item';
import VideoModal from '../../hoc/VideoModal';
import * as validator from '../../utils/validationHelper';

export default class Collection extends Component {

  validateUrl = (url) => {
    if (!url) {
      return false;
    }
    else if (!validator.validateUrl(url)) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    const { list, videoUrl } = this.props;
    return(
      <>
        <ul className="collection">
          {
            list.map((item, key) => 
              <Item 
                item={item} 
                index={key} 
                key={key} 
                openModal={this.props.openModalHandler} 
                onHeart={this.props.onHeart}
                onDelete={this.props.onDelete}
                openVideo={this.props.openVideoPlayer}/>)
          }
        </ul>
        <VideoModal
        className="video-modal"
        show={this.props.isShowingVideo}>
          <div className="modal-header flex">
            <span className="modal-title">Edit</span>
            <span onClick={this.props.closeVideoPlayer} className="close">&times;</span>
          </div>
          {
            this.props.isShowingVideo
            ?
              <video
                controls
                src={videoUrl} type="video/mp4" 
              />
            : ''
          }
        </VideoModal>
      </>
    );
  }
}
