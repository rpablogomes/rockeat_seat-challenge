//AGE
exports.age = function (birthday) {
  // const parsedBirthday = Date.parse(birthday)
  let newBirthday = new Date(birthday);

  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();

  // teacher's birthday information

  const teacherYear = newBirthday.getFullYear();
  const teacherMonth = newBirthday.getMonth();
  const teacherDate = newBirthday.getDate();

  let age = year - teacherYear;

  if (month < teacherMonth || (month == teacherMonth && date < teacherDate)) {
    age--;
  }

  return age;
};

exports.graduation = function () {};
