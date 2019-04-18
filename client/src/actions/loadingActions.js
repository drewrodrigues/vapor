export const SET_LANDING_LOADING = "SET_LANDING_LOADING";
export const CLEAR_LANDING_LOADING = "CLEAR_LANDING_LOADING";

export const clearLandingLoading = () => {
  return {
    type: CLEAR_LANDING_LOADING
  };
};

export const setLandingLoading = () => {
  return {
    type: SET_LANDING_LOADING
  };
};