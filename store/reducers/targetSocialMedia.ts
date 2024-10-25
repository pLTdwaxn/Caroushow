const initialState = {
  socialMedia: 'instagram',
};

export const targetSocialMediaReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_SOCIAL_MEDIA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
