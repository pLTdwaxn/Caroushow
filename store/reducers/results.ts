const initialState = { data: [], isLoading: false, error: null };

export const resultsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "FETCH_CROPPED_IMAGES":
      return { ...state, isLoading: true, error: null };
    case "FETCH_CROPPED_IMAGES_SUCCESS":
      return { ...state, isLoading: false, data: action.payload };
    case "FETCH_CROPPED_IMAGES_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "RESET_RESULTS":
      return { ...state, data: [], isLoading: false, error: null };
    default:
      return state;
  }
};
