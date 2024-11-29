const initialState = { data: null, isLoading: false, error: null };

export const imageReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "FETCH_IMAGE":
      return { ...state, isLoading: true, error: null };
    case "FETCH_IMAGE_SUCCESS":
      return { ...state, isLoading: false, data: action.payload };
    case "FETCH_IMAGE_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "RESET_IMAGE":
      return { ...state, data: null, isLoading: false, error: null };
    default:
      return state;
  }
};
