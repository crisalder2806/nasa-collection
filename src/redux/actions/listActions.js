import * as actions from '../actionTypes';
import axios from '../../config/axios';
import moment from 'moment';

// export const getList = (query = '') => dispatch =>
//   dispatch({
//     type: actions.GET_LIST,
//     payload: {
//       query: query
//     }
//   });

export const BASE_API_URL = 'https://images-api.nasa.gov';

export const getList = (query = '') => dispatch => {
  if (query) {
    axios.get(`${BASE_API_URL}/search?q=${query}`)
      .then(response => {
        const data = {
          total_hits: response.collection.metadata.total_hits,
          next: '',
          prev: '',
          list: []
        }
        let items = response.collection.items.map((item) => {
          return {
            title: item.data[0].title,
            description: item.data[0].description,
            preview_image: (item.links) ? item.links[0].href : '',
            author: '',
            date_created: moment(item.data[0].date_created).format("DD MMM, YYYY"),
            heart: false,
            video: (item.data[0].media_type === 'video') 
              ? `https://images-assets.nasa.gov/video/${item.data[0].nasa_id}/${item.data[0].nasa_id}~orig.mp4` 
              : ''
          }
        });

        data.list = [...items];

        dispatch(getListSuccess(data));
      })
      .catch(error => {
        throw (error);
      });
    };
};

export const getListSuccess = (data) => {
  return {
    type: actions.GET_LIST,
    payload: data
  }
};

export const addToCollection = data => {
  return {
    type: actions.ADD_LIST,
    payload: data
  }
};

export const resetSelectedItem = data => {
  return {
    type: actions.RESET_SELECTED_ITEM,
    payload: data
  }
};