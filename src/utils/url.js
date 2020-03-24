function setUrlParam(key, value) {
  const urlParams = new URLSearchParams(window.location.search);
  if (value === null) {
    urlParams.delete(key);
  } else {
    urlParams.set(key, value);
  }
  window.history.pushState("", "", "?" + urlParams);
}

function setUrlHash(value) {
  window.location.hash = value || "";
}

function getUrlHash() {
  return window.location.hash.slice(1);
}

export { setUrlParam, setUrlHash, getUrlHash };
