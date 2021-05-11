import { errorConstants } from './constants.js'

export function hasGetUserMedia() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

export function extractError(err) {
  let error;
  const strErr = err.toString();
  if (strErr.match(/Permission/) || strErr.match(/NotAllowedError/)) {
    error = errorConstants.PERMISSION_DENIED;
  } else if (strErr.match(/notSupported/)) {
    error = errorConstants.NOT_SUPPORTED;
  } else if (strErr.match(/NotReadableError/)) {
    error = errorConstants.NOT_READABLE;
  } else if (strErr.match(/NotFoundError/)) {
    error = errorConstants.NOT_FOUND;
  } else {
    error = errorConstants.DEFAULT_ERROR;
  }

  return error;
}
