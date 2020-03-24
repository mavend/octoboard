function setUrlParam(key, value) {
  const urlParams = new URLSearchParams(window.location.search);
  if (value === null) {
    urlParams.delete(key);
  } else {
    urlParams.set(key, value);
  }
  window.history.pushState("", "", "?" + urlParams);
}

export { setUrlParam };
