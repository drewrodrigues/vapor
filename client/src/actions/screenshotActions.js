import * as GameApiUtil from '../util/game_api_util';

export const RECEIVE_SCREENSHOT = "RECEIVE_SCREENSHOT";
export const RECEIVE_SCREENSHOT_ERRORS = "RECEIVE_SCREENSHOT_ERRORS";

const receiveScreenshot = screenshot => {
  return {
    type: RECEIVE_SCREENSHOT,
    screenshot
  };
};

const receiveScreenshotErrors = err => {
  return {
    type: RECEIVE_SCREENSHOT_ERRORS,
    err
  };
};

export const getScreenshot = gameId => {
  return dispatch => {
    return GameApiUtil.getScreenshots(gameId).then(
      screenshotData => dispatch(receiveScreenshot(screenshotData)),
      err => dispatch(receiveScreenshotErrors(err.responseJSON))
    );
  };
};

