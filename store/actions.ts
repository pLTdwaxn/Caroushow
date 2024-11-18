export const SET_IMAGE = 'SET_IMAGE';

interface Image {
  uri: string | null;
  width: number | null;
  height: number | null;
}

export const setImage = (image: Image) => ({
  type: SET_IMAGE,
  payload: image,
});

export const resetImage = () => ({
  type: SET_IMAGE,
  payload: { uri: null, width: null, height: null },
});
