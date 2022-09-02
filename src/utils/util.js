/**
 * Checks http status and rejects
 * @param {Response} res - fetch response object
 * @returns {Promise} returns .json promise
 */
export function checkStatus(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.statusText);
}

/**
 * sets x-auth jwt cooke
 */
export function saveJwtAsCookie() {
  const token = localStorage.getItem("jwt");
  document.cookie = `X-Authorization=${token};path=/`;
}
