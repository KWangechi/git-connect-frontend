export function convertToDateString(dateTime: Date) {
  return new Date(dateTime).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formattedDate(dateTime: Date) {
  const date = dateTime.toLocaleString().split("T");

  console.log(date);

  //   return convertToDateString(date);
}

// export function convertToISOString(dateTime: Date) {
//   return new Date(formattedDate(dateTime)).toISOString();
// }

export function formattedTime(dateTime: Date) {
  return new Date(dateTime).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// export function getFormattedCurrentTime() {
//   const currentDate = new Date();
//   const currentDateTime = currentDate
//     .toLocaleTimeString([], {
//       hour12: true,
//       minute: "2-digit",
//       hour: "numeric",
//     })
//     .toLowerCase()
//     .replace(" ", "");

//   return new Date(currentDateTime);
// }

/**
 * Get the number of hours elapsed from date provided till now
 * @returns {number}
 */
export function getHoursElapsed(earlierDateTime: Date) {
  const currentDateTime = new Date();
  const previousDateTime = new Date(earlierDateTime);
  const hoursElapsed = Math.abs(
    currentDateTime.getHours() - previousDateTime.getHours()
  );
  return hoursElapsed;
}
