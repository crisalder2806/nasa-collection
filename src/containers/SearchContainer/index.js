import React, { Component } from 'react';
import { connect } from 'react-redux';

import CollectionLayout from '../../layouts/CollectionLayout';
import Result from '../../components/Search/Result';
import Search from '../../components/Search';
import { getList, addToCollection, resetSelectedItem } from '../../redux/actions/listActions';
import * as util from '../../utils/localStorageHelper';
import * as validator from '../../utils/validationHelper';
import AddToCollection from '../../components/Collection/AddToCollection';


class SearchContainer extends Component {
  state = {
    isShowing: false,
    isShowingVideo: false,
    url: '',
    selectedItem: this.props.data.selectedItem
  }

  openModalHandler = (item = {}) => {
    this.setState({
      ...this.state,
      isShowing: true,
      selectedItem: item
    });

    document.body.style.overflow = "hidden";
  }

  closeModalHandler = () => {
    this.setState({
      ...this.state,
      isShowing: false
    });
    document.body.style.overflow = "auto";
  }

  openVideoPlayer = (url = '') => () => {
    this.setState({
      ...this.state,
      isShowingVideo: true,
      url: url
    });
    document.body.style.overflow = "hidden";
  }

  closeVideoPlayer = () => {
    this.setState({
      ...this.state,
      isShowingVideo: false
    });
    document.body.style.overflow = "auto";
  }

  onSelectItem = (item = {}) => () => {
    this.setState({
      ...this.state,
      selectedItem: item
    });
    this.openModalHandler()
  }

  onAddItem = () => {
    if (!this.state.selectedItem.preview_image || (!this.state.selectedItem.video && this.state.selectedItem.type === 'video')) {
      return;
    } else {
      util.setList(this.state.selectedItem);
      this.closeModalHandler();
    }
  }

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

  onChangeHandler = event => {
    let nam = event.target.name;
    let val = event.target.value;

    const item = {
      ...this.state.selectedItem,
      [nam]: val
    }

    this.setState({
      ...this.state,
      selectedItem: item
    });
  }

  render() {
    const { onGetList, data } = this.props;
    return(
      <CollectionLayout>
        <AddToCollection
            title={'Add to collection'}
            isShowing={this.state.isShowing}
            url={this.state.url}
            selectedItem={this.state.selectedItem}
            closeModalHandler={this.closeModalHandler}
            onChangeHandler={this.onChangeHandler}
            clicked={this.onAddItem}
            buttonText={'Add to collection'}
          />
        <Search totalHits={data.total_hits} onGetList={onGetList} />
        <Result 
          data={data}
          openModalHandler={this.openModalHandler}
          onSelectItem={this.onSelectItem}
          openVideoPlayer={this.openVideoPlayer}
          closeVideoPlayer={this.closeVideoPlayer}
          isShowingVideo={this.state.isShowingVideo}
          videoUrl={this.state.url}
        />
      </CollectionLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.listReducer
})

const mapDispatchToProps = dispatch => {
  return {
    onGetList: val => dispatch(getList(val)),
    onAddItem: val => dispatch(addToCollection(val)),
    onResetItem: () => dispatch(resetSelectedItem())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);