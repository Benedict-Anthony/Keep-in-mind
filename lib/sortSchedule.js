export function sortByWeekday(arr) {
  const weekdaysOrder = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  arr.sort((a, b) => {
    const dayA = weekdaysOrder.indexOf(a.day);
    const dayB = weekdaysOrder.indexOf(b.day);

    return dayA - dayB;
  });

  return arr;
}
