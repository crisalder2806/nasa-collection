import React from 'react';
import Item from './Item';
import VideoModal from '../../../hoc/VideoModal';

const result = props => {
  const { data } = props;
    return(
      <>
        <ul className="collection">
          {
            data.list.map((item, index) => 
            <Item 
              item={item} 
              key={index} 
              openVideo={props.openVideoPlayer} 
              openModal={props.openModalHandler} 
              onSelect={props.onSelectItem}
            />)
          }
        </ul>
        <VideoModal
          className="video-modal"
          show={props.isShowingVideo}>
          <div className="modal-header flex">
            <span className="modal-title">Add to collection</span>
            <span onClick={props.closeVideoPlayer} className="close">&times;</span>
          </div>
          {
            props.isShowingVideo
              ?
              <video
                controls
                src={props.videoUrl} type="video/mp4" 
              />
              :
            ''
          }
        </VideoModal>
      </>
    );
};

export default result;
