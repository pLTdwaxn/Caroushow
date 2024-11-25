const aspectRatios = [
  { width: 1, height: 1 }, // 1.0
  { width: 4, height: 5 }, // 0.8
  { width: 3, height: 4 }, // 0.75
  { width: 5, height: 7 }, // 0.71
  { width: 2, height: 3 }, // 0.67
  { width: 3, height: 5 }, // 0.6
];
// Ranked from most square to most rectangular

const initialState = {
  rows: 1,
  columns: 3,
  ratio: aspectRatios[0],
  resize: 1080,
  compress: 1,
};

export const cropperParamsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_CROP':
      return { ...state, ...action.payload };
    case 'CYCLE_ASPECT_RATIO':
      const currentIndex = aspectRatios.indexOf(state.ratio);
      const nextIndex = (currentIndex + 1) % aspectRatios.length;
      return { ...state, ratio: aspectRatios[nextIndex] };
    default:
      return state;
  }
};
