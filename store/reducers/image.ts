const initialState = null;

export const imageReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_IMAGE':
      return action.payload;
    default:
      return state;
  }
};
