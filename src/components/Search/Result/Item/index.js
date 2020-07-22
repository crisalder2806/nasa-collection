import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';

export default class Item extends Component {
  state = {
    defaultSize: "2x",
    isShowing: false
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

  onSelect = (item) => {
    this.props.openModal({
      title: item.title,
      description: item.description,
      type: (item.video) ? 'video' : 'image',
      preview_image: item.preview_image,
      video: item.video,
      hearted: false,
      date_created: item.date_created
    });
  }
  
  render() {
    const { item, openVideo } = this.props;
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
          <span>{item.date_created}</span>
        </div>
        <div className="article">
          <h1>{ item.title }</h1>
          <span className="description">
          { ((item.description).length > 300) ? 
            (((item.description).substring(0,300-3)) + '...') : 
            item.description }
          </span>
        </div>
        <button onClick={() => this.onSelect(item)} className="add-btn"><FontAwesomeIcon size="2x" icon={faPlus}/><span>Add to NASA collection</span></button>
      </li>
    );
  }
}
