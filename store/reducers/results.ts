import { ImageResult } from "expo-image-manipulator";

const initialState: ImageResult[] = [];

export const resultsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_RESULTS':
      return action.payload;
    default:
      return state;
  }
};
