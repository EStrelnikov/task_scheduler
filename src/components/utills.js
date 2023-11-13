export function updateFormatDate(date) {
  const value = new Date(date);
  const dateLocal = value.toLocaleDateString();
  const hour = value.getHours() > 9 ? value.getHours() : `0${value.getHours()}`;
  const minutes =
    value.getMinutes() > 9 ? value.getMinutes() : `0${value.getMinutes()}`;
  return `${dateLocal} в ${hour}:${minutes}`;
}

export const sendTaskNotification = (title, body) => {
  if (Notification.permission !== "granted") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(title, body);
      }
    });
  } else {
    new Notification(title, body);
  }
};

export function renderPhrase(number, arrWords = ["день", "дня", "дней"]) {
  const lastOne = Number(number.toString().slice(-1));
  if (number > 4 && number < 15) return arrWords[2];
  if ([2, 3, 4].indexOf(lastOne) >= 0) return arrWords[1];
  if (lastOne === 1) return arrWords[0];
  return arrWords[2];
}
