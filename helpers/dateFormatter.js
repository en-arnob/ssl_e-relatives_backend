// dateFormatter, author:: utsob

function formatDate(inputDateString) {
  if (inputDateString) {
    const dateParts = inputDateString?.split("-");
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  } else {
    return null;
  }
}

module.exports = {
  formatDate: formatDate,
};
