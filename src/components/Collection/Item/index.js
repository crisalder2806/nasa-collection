import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faHeart as faHeartFill } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';

export default class Item extends Component {
  state = {
    defaultSize: "2x",
    heart: faHeart,
    hearted: false
  }
  onHover = () => {
    this.setState({
      ...this.state,
      defaultSize: "3x"
    })
  }

  onLeave = () => {
    this.setState({
      ...this.state,
      defaultSize: "2x"
    })
  }

  onSelect = (item, index) => {
    this.props.openModal(item, index);
  }

  render() {
    const { item, index, onHeart, onDelete, openVideo } = this.props;
    return(
      <li>
        <div className="item">
          <img src={item.preview_image} alt="" />
          {
            item.video
              ?
              <button className="play-btn"
              onClick={openVideo(item.video)} 
              onMouseOver={this.onHover}
              onMouseLeave={this.onLeave}
            ><FontAwesomeIcon size={this.state.defaultSize} icon={faPlay}/></button>
              :
            ''
          }
        </div>
        <div className="info">
          <span>Paolo Lazzarotti</span>
          <span>{ item.date_created }</span>
        </div>
        <div className="article">
          <h1>{ item.title }</h1>
          <span className="description">
          { ((item.description).length > 300) ? 
            (((item.description).substring(0,300-3)) + '...') : 
            item.description }
          </span>
        </div>
        <div className="tools">
          <button onClick={onHeart(index, !item.hearted)} className="tool-btn">
            <FontAwesomeIcon 
              color={item.hearted ? "#E54D42" : "#EBEBED"} 
              size="2x" icon={item.hearted ? faHeartFill : faHeart} />
          </button>
          <button onClick={onDelete(index)} className="tool-btn">
            <FontAwesomeIcon 
              color="#EBEBED"
              size="2x" icon={faTrashAlt} />
          </button>
          <button onClick={() => this.onSelect(item, index)} className="tool-btn">
            <FontAwesomeIcon 
              color="#EBEBED"
              size="2x" icon={faEdit} />
          </button>
        </div>
      </li>
    );
  }
}
