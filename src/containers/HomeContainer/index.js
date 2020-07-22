import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollectionLayout from '../../layouts/CollectionLayout';
import Header from '../../components/Header';
import Collection from '../../components/Collection';
import { addToCollection, resetSelectedItem } from '../../redux/actions/listActions';
import * as util from '../../utils/localStorageHelper';
import AddToCollection from '../../components/Collection/AddToCollection';

class HomeContainer extends Component {
  state = {
    isShowing: false,
    isShowingVideo: false,
    list: util.getList(),
    url: '',
    selectedIndex: null,
    selectedItem: this.props.data.selectedItem
  }

  onAddItem = () => {
    if (!this.state.selectedItem.preview_image || (!this.state.selectedItem.video && this.state.selectedItem.type === 'video')) {
      return;
    } else {
      util.setList(this.state.selectedItem);
      this.props.onAddItem(this.state.selectedItem);
      window.location.reload();
      this.closeModalHandler();
    }
  }

  onChangeHandler = event => {
    event.persist();
    let name = event.target.name;
    let val = event.target.value;

    const item = {
      ...this.state.selectedItem,
      [name]: val
    }

    this.setState({
      ...this.state,
      selectedItem: item
    });
  }

  openModalHandler = (item = {}, index) => {
    this.setState({
      ...this.state,
      isShowing: true,
      selectedItem: item,
      selectedIndex: index
    });

    document.body.style.overflow = "hidden";
  }

  closeModalHandler = () => {
    this.setState({
      ...this.state,
      isShowing: false
    });
    this.props.onResetItem();
    document.body.style.overflow = "auto";
  }

  onHeart = (index, hearted) => () => {
    const { list } = this.state;
    list[index].hearted = hearted;
    this.setState({
      ...this.state,
      list: list
    });

    util.updateList(this.state.list);
  }

  onDelete = (index) => () => {
    const { list } = this.state;
    list.splice(index, 1);
    this.setState({
      ...this.state,
      list: list
    });

    util.updateList(this.state.list);
  }

  onChangeHandler = event => {
    let name = event.target.name;
    let val = event.target.value;

    const item = {
      ...this.state.selectedItem,
      [name]: val
    }

    this.setState({
      ...this.state,
      selectedItem: item
    });
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

  onEdit = () => {
    const { list } = this.state;
    list[this.state.selectedIndex] = this.state.selectedItem;
    this.setState({
      ...this.state,
      list: list
    });

    util.updateList(this.state.list);
    this.closeModalHandler();
  }

  render() {
      return(
        <CollectionLayout>
          <AddToCollection
            title={this.state.selectedItem.title ? 'Edit collection' : 'Add to collection'}
            isShowing={this.state.isShowing}
            url={this.state.url}
            selectedItem={this.state.selectedItem}
            closeModalHandler={this.closeModalHandler}
            onChangeHandler={this.onChangeHandler}
            clicked={this.state.selectedItem.title ? this.onEdit : this.onAddItem}
            buttonText={this.state.selectedItem.title ? 'Save' : 'Add to collection'}
          />
          <Header openModalHandler={this.openModalHandler} />
          <Collection 
            list={this.state.list}
            isShowingVideo={this.state.isShowingVideo}
            openVideoPlayer={this.openVideoPlayer}
            videoUrl={this.state.url}
            openModalHandler={this.openModalHandler}
            closeVideoPlayer={this.closeVideoPlayer}
            onHeart={this.onHeart}
            onDelete={this.onDelete}
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
    onAddItem: val => dispatch(addToCollection(val)),
    onResetItem: () => dispatch(resetSelectedItem())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);