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

export function deleteCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

/**
 * sets x-auth jwt cooke
 */
export function saveJwtAsCookie() {
  const token = sessionStorage.getItem("jwt");
  document.cookie = `X-Authorization=${token};path=/;domain=capstonechat.herokuapp.com;`;
}

export function rmJwtAsCookie() {
  deleteCookie("X-Authorization");
}

export function getCookie(n) {
  let a = `; ${document.cookie}`.match(`;\\s*${n}=([^;]+)`);
  console.log(`get cookie func called, a =${a} `);
  return a ? a[1] : "";
}

export function blobToBase64(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    // reader.readAsBinaryString(blob);
    reader.readAsDataURL(blob);
  });
}
