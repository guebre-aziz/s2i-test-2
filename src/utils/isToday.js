export function isToday(date, today) {
  if (date instanceof Date && today instanceof Date) {
    const dateYear = date.getFullYear().toString();
    const dateMonth = date.getMonth().toString();
    const dateDay = date.getDate().toString();
    const dateString = dateDay + dateMonth + dateYear;

    const todayYear = today.getFullYear().toString();
    const todayMonth = today.getMonth().toString();
    const todayDay = today.getDate().toString();
    const todayString = todayDay + todayMonth + todayYear;

    if (dateString === todayString) {
      return true;
    } else {
      return false;
    }
  } else {
    return "opps";
  }
}
