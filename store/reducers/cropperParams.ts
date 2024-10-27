const initialState = {
  rows: 1,
  columns: 3,
  ratio: { width: 4, height: 5 },
  compress: 1,
  origin: { x: 0, y: 0 },
  size: { width: 0, height: 0 },
};

export const cropperParamsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_CROP':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
