export function setLocalStorage(key, value, expiryTime) {
  const expiryDate = new Date().getTime() + expiryTime;
  const data = {
    value: value,
    expiry: expiryDate,
  };
  localStorage.setItem(key, JSON.stringify(data));
}

export function getLocalStorage(key) {
  const data = JSON.parse(localStorage.getItem(key));
  if (data) {
    const currentTime = new Date().getTime();
    if (currentTime > data.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return data.value;
  }
  return null;
}
