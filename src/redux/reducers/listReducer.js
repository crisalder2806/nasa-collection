import * as actions from '../actionTypes';

const initialState = {
  total_hits: 0,
  list: [],
  selectedItem: {
    title: '',
    description: '',
    type: 'video',
    preview_image: '',
    video: '',
    hearted: false,
    date_created: ''
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_LIST:
      return {
        ...state,
        list: [...action.payload.list],
        total_hits: action.payload.total_hits
      };
    case actions.ADD_LIST:
      return {
        ...state,
        selectedItem: {...action.payload.selectedItem}
      }
      case actions.RESET_SELECTED_ITEM:
        return {
          ...state,
          selectedItem: {...initialState.selectedItem}
        }
    default: return {...state};
  }
}