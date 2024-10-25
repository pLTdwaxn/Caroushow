const initialState = {
  uri: null,
  width: null,
  height: null,
};

export const imageReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_IMAGE':
      return action.payload;
    default:
      return state;
  }
};
