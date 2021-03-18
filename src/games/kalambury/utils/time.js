export function timerFormat(remainingSeconds) {
  const minutes = Math.floor(remainingSeconds / 60);
  let seconds = remainingSeconds - minutes * 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
}

export function currentTime() {
  return Math.floor(new Date().getTime() / 1000);
}
