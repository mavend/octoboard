function timerFormat(remainingSeconds) {
  let minutes = Math.floor(remainingSeconds / 60);
  let seconds = remainingSeconds - minutes * 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
}

export { timerFormat };
