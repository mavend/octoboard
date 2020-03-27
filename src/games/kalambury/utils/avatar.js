function avatarForName(name) {
  return `https://api.adorable.io/avatars/128/${encodeURI(name)}.png`;
}

export { avatarForName };
