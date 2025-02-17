const aspectRatios = [
  { width: 1, height: 1 }, // 1.0
  { width: 4, height: 5 }, // 0.8
  { width: 3, height: 4 }, // 0.75
  { width: 5, height: 7 }, // 0.71
  { width: 2, height: 3 }, // 0.67
  { width: 3, height: 5 }, // 0.6
];
// Ranked from most square to most rectangular

const columns = [2, 3, 4, 5];

const initialState = {
  scale: 1,
  translation: { x: 0, y: 0 },
  compress: 1,
  resize: 1080,
  aspectRatio: aspectRatios[0],
  split: { rows: 1, columns: columns[1] },
  // To be deprecated
  ratio: aspectRatios[0],
  columns: columns[1],
};

export const cropperParamsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_CROP":
      return { ...state, ...action.payload };
    case "CYCLE_ASPECT_RATIOS":
      const currentIndex = aspectRatios.indexOf(state.ratio);
      const nextIndex = (currentIndex + 1) % aspectRatios.length;
      return { ...state, ratio: aspectRatios[nextIndex] };
    case "CYCLE_COLUMNS":
      const currentColumnIndex = columns.indexOf(state.columns);
      const nextColumnIndex = (currentColumnIndex + 1) % columns.length;
      return { ...state, columns: columns[nextColumnIndex] };
    case "UPDATE_TRANSLATION":
      return { ...state, translation: action.payload };
    default:
      return state;
  }
};
