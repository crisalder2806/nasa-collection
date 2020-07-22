import React from 'react';
import Modal from '../../../hoc/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { validateUrl } from '../../../utils/validationHelper';

const urlValidate = (url) => {
  if (!url) {
    return false;
  }
  else if (!validateUrl(url)) {
    return false;
  } else {
    return true;
  }
}

const addToCollection = props => {
    const form = <form>
        <div className="form-input">
          <input  
            onChange={props.onChangeHandler}
            value={props.selectedItem.title}
            type="text" 
            name="title"
            required/>
          <span className='place-holder'>Title</span>
        </div>
        <div className="form-input">
          <textarea 
            onFocus={props.onFocus} 
            onBlur={props.onFocusOut} 
            value={props.selectedItem.description}
            onChange={props.onChangeHandler}
            name="description"
            required></textarea>
          <span className='place-holder'>Description</span>
        </div>
        <div className="form-input">
          <select name="type" value={props.selectedItem.type} onChange={props.onChangeHandler}>
            <option value='video'>Video</option>
            <option value='image'>Image</option>
          </select>
          <span className="place-holder top">Type</span>
        </div>
        <div className="form-input">
          <input 
            onFocus={props.onFocus} 
            onBlur={props.onFocusOut}
            onChange={props.onChangeHandler}
            value={props.selectedItem.preview_image}
            type="text" 
            name="preview_image"
            required
            />
          <span className='place-holder'>Link preview image url<span className="required">*</span></span>
          {
            (!urlValidate(props.selectedItem.preview_image))
              ? <p className="error">Link preview image is required</p>
              : ''
          }
        </div>
        {
          props.selectedItem.type === 'video'
            ?
            <div className="form-input">
            <input 
            onFocus={props.onFocus}
            onBlur={props.onFocusOut} 
            onChange={props.onChangeHandler}
            value={props.selectedItem.video}
            type="text" 
            name="video"
            required/>
            <span className='place-holder'>Link file url<span className="required">*</span></span>
            {
              (!urlValidate(props.selectedItem.video))
                ? <p className="error">Link file url is required</p>
                : ''
            }
          </div>
            :
          '' 
        }
      </form>
    return (
        <Modal
          className="modal"
          show={props.isShowing}
          close={props.closeModalHandler}>
            <div className="modal-header flex">
              <span className="modal-title">{props.title}</span>
              <span onClick={props.closeModalHandler} className="close">&times;</span>
            </div>
            {props.isShowing ? form : ''}
            <div className="modal-footer">
              <button 
                onClick={props.clicked} 
                disabled={(!props.selectedItem.video && props.selectedItem.type === 'video') || !props.selectedItem.preview_image} 
                className="btn"><FontAwesomeIcon size="lg" icon={faCheck} />{props.buttonText}</button>
            </div>
        </Modal>
    )
}

export default addToCollection;
